import React, {useContext, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {
    Box,
    Container,
    CssBaseline,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fab,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import Axios from "axios";
import {ExpandMore, KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import {BASE_URL} from "../constant";
import {Redirect, useHistory} from "react-router-dom"
import Footer from "../components/Footer";
import ScrollTop from "../components/FloatingGoback"
import {GlobalContext} from "../GlobalContext";
import {Rating} from "@material-ui/lab";


const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(.5),
        paddingRight: theme.spacing(.5)
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing(3),
    },
    heading: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
    },
    orderid: {
        paddingRight: theme.spacing(2)
    },
    helpText: {
        marginTop: theme.spacing(8)
    },


}));

const Orating = (props) => {
    const ctx = useContext(GlobalContext)
    const [rate, setRate] = useState(props.order.rating || 0)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const rateOrder = (id, value) => {
        Axios.put(`${BASE_URL}/users/orders/${id}/`, {rating: value}, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                enqueueSnackbar("Thanks for your feedback")
                setRate(value)
            }
        ).catch(error => {
            enqueueSnackbar("Rating not allowed.", {variant: "error"})
        })
    };
    return <Rating value={rate} precision={1} onChange={(e, newValue) => {
        rateOrder(props.order._id, newValue);
        props.order.rating = newValue;
    }}>
    </Rating>
};


export default (props) => {
    const ctx = useContext(GlobalContext);
    const [orders, setOrders] = useState();
    const history = useHistory();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        Axios.get(`${BASE_URL}/users/orders/`, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                setOrders(response.data)
            }
        ).catch(
            error => enqueueSnackbar("Failed to load orders.", {variant: "error", key: "orderkey"})
        )
    }, []);



    const getDateString = (raw_date) => {
        const arr = Date(raw_date).split(" ");
        return `${arr[1]}-${arr[2]}-${arr[3]}  ${arr[4]}`
    };

    const classes = useStyles();

    if (!ctx.state.accessToken) {
        return <Redirect to={{pathname: "/login", next: "/orderHistory"}}/>
    }

    if (!orders || orders.length === 0) {
        return (
            <h1> No order found </h1>
        )
    } else
        return (
            <React.Fragment>
                <Container maxWidth={"sm"} className={classes.main}>
                    <CssBaseline/>

                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"} align={"center"}> <b> Orders </b></Typography>
                    </div>
                    {orders.map((order, index) => (
                        <Box m={4}>
                        <ExpansionPanel key={order.id} elevation={3}>

                            <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography> <b> #{order._id.substr(0, 5)} </b></Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant={"body2"}> On {getDateString(order.date)} from {order.merchandise_name}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography color={"primary"}
                                                    variant={"subtitle1"}> {order.current_status}</Typography>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TableContainer component={Paper} elevation={0} variant={"outlined"}>
                                    <Table>
                                        <caption> {order.address.detail + " " + order.address.landmark} </caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align={"center"}> <b> Name </b> </TableCell>
                                                <TableCell align={"right"}><b> Size </b> </TableCell>
                                                <TableCell align={"right"}> <b> Quantity </b></TableCell>
                                                <TableCell align={"left"}> <b>SubTotal </b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.order_items.map((order_item, index) => (
                                                <TableRow key={order.id + index}>
                                                    <TableCell align={"center"}> {order_item.name}</TableCell>
                                                    <TableCell align={"right"}> {order_item.size}</TableCell>
                                                    <TableCell align={"center"}> {order_item.quantity}</TableCell>
                                                    <TableCell
                                                        align={"left"}> {order_item.price * order_item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </ExpansionPanelDetails>
                            <Box m={2}>
                            <Orating order={order}/>
                            </Box>
                        </ExpansionPanel>
                        </Box>
                    ))}

                    <div className={classes.main}>
                        <Typography variant={"subtitle2"} align={"center"}> Click on item to Know more...</Typography>
                    </div>
                </Container>
                <Footer/>
                <ScrollTop {...props}>
                    <Fab color="secondary">
                        <Back/>
                    </Fab>
                </ScrollTop>

            </React.Fragment>
        )
}
