import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext";
import {
    CircularProgress,
    Container,
    CssBaseline,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fab,
    Grid,
    makeStyles,
    MenuItem,
    Box,
    Button,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import {Redirect, useHistory} from "react-router-dom"
import {BASE_URL} from "../constant";
import {useSnackbar} from "notistack";
import Axios from "axios";


const useStyles = makeStyles(theme => ({
    spinner: {
        margin: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
    },
    container: {
        position: "relative",
    },
    root: {
        marginTop: theme.spacing(4),
    },
    detail: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-evenly"
    },
    payment: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    },
    orderitems: {
        marginTop: theme.spacing(4),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
}));

export default (props) => {


    const [payment, setPayment] = useState();
    const history = useHistory();
    const ctx = useContext(GlobalContext);
    const [order, setOrder] = useState(null);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [payment_method, setPayment_method] = useState(null);
    const classes = useStyles();

    useEffect(() => {
       // if (!ctx.state.order_type) return;
        const data = {
            cart: ctx.state.cart,
            merchandise_id: ctx.state.merchandise_id,
            address: ctx.state.address,
            order_type: ctx.state.order_type,
        };
        console.log({data});
        // Axios.post(`${BASE_URL}/make_order/`, data, {headers: {Authorization: ctx.state.accessToken}}).then(
        //     response => {
        //         console.log(response.data);
        //         setOrder(response.data)
        //     }
        // ).catch(error => {
        //     try {
        //         enqueueSnackbar(error.response.data.message, {variant: "error"})
        //     } catch (e) {
        //         enqueueSnackbar("Something went wrong.", {variant: "error"})
        //     }
        // })
    }, []);


    const handleSubmit = () => {
        if (payment_method === null || order === null) {
            enqueueSnackbar("Select payment method", {variant: "info"});
            return
        }

        if (payment_method === 'COD') {
            Axios.post(`${BASE_URL}/place_order_cod/`, {
                id: order._id,
                payment_method: 'COD'
            }, {headers: {Authorization: ctx.state.accessToken}}).then(
                response => {
                    enqueueSnackbar("Your Order is placed.", {variant: "success"});
                    ctx.dispatch({type: "ORDER_PLACED"});
                    history.replace("/success")
                }
            ).catch(error => {
                    enqueueSnackbar("Failed to place order.", {variant: "error"});
                    setTimeout(() => {
                        history.replace("/cart")
                    }, 1000)
                }
            )
        } else if (payment_method === 'ONLINE') {
            Axios.post(`${BASE_URL}/place_order_online/`, {
                id: order._id,
                payment_method: "ONLINE"
            }, {headers: {Authorization: ctx.state.accessToken}}).then(
                response => {
                    history.replace({pathname:"/payOnline", payload:response.data})
                }
            ).catch(error => {
                enqueueSnackbar("Failed to place order online.", {variant: "error"});
                console.log({error})
                //   setTimeout(() => {
                //      history.replace("/cart")
                // }, 2000)
            })
        } else {
        }
    };

    if (!ctx.state.accessToken && !ctx.state.service) {
        return <Redirect to={{pathname: "/login", next: "/cart"}}/>
    }

    if (!order) {
        return (
            <div>
                <Container maxWidth={"sm"}>
                    <CssBaseline>
                        <Grid container spacing={0} direction={"column"} alignItems={"center"} justify={"center"}
                              style={{minHeight: '100vh'}}>
                            <Grid item xs={12}>
                                <CircularProgress variant={"indeterminate"} color={"primary"}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Button variant={"text"} color={"secondary"} onClick={()=>{history.replace("/cart")}}> Try again </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CssBaseline>
                </Container>
            </div>
        )
    } else {
        return (
            <Container maxWidth={"sm"} className={classes.root}>

                <Paper className={classes.detail}>
                    <div>
                        <Typography variant={"h5"}> Address {order.address.landmark}</Typography>
                        <Typography variant={"subtitle1"}> {order.address.pincode}</Typography>
                        <Typography> <em> {order.address.detail} </em></Typography>
                    </div>
                    <div className={classes.detailType}>
                        <Typography variant={"subtitle1"}> <small> {order.order_type} </small></Typography>
                    </div>
                </Paper>


                <Paper className={classes.payment} square>
                    <Typography variant={"subtitle1"}> <b> Choose Payment option </b></Typography>
                    <Select fullWidth variant={"filled"} autofocus value={payment} name="payment" onChange={(e) => {
                        setPayment_method(e.target.value)
                    }}>
                        {
                            order.payment_options.map((option, index) => (
                                <MenuItem key={index} value={option.toString().toUpperCase()}> {option}</MenuItem>
                            ))
                        }
                    </Select>
                </Paper>

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={
                        <ExpandMore/>
                    }>
                        <Typography variant={"subtitle1"} className={classes.heading}> <b> Details </b>
                        </Typography>
                        <Typography> <b> Total: {order.total} </b> </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TableContainer component={Paper} elevation={0} variant={"outlined"}
                                        className={classes.orderitems}>
                            <Table>
                                <caption> From {order.merchandise_name}</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={"center"}> <b> Name </b> </TableCell>
                                        <TableCell align={"right"}><b> Size </b> </TableCell>
                                        <TableCell align={"right"}> <b> Quantity </b></TableCell>
                                        <TableCell align={"left"}> <b>SubTotal </b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order_items.map((orderitem, index) => (
                                        <TableRow key={order._id + index}>
                                            <TableCell align={"center"}> {orderitem.name}</TableCell>
                                            <TableCell align={"right"}> {orderitem.size}</TableCell>
                                            <TableCell align={"center"}> {orderitem.quantity}</TableCell>
                                            <TableCell
                                                align={"left"}> {orderitem.price * orderitem.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell rowSpan={4}/>
                                        <TableCell colSpan={2}> <b> Sub Total</b></TableCell>
                                        <TableCell> {order.sub_total}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2}> <b> Delivery </b></TableCell>
                                        <TableCell> {order.delivery_charge} </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}> <b> From wallet </b></TableCell>
                                        <TableCell> {order.from_wallet}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}> <b> Total </b></TableCell>
                                        <TableCell> {order.total}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Fab variant={"extended"} size={"large"} className={classes.fab} color={"primary"}
                     onClick={handleSubmit}>
                    Place Order
                </Fab>

            </Container>
        )
    }

}

