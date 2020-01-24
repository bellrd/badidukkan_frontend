import React, {useContext, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {
    Container,
    CssBaseline,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fab,
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
import {useHistory} from "react-router-dom"
import Footer from "../components/Footer";
import ScrollTop from "../components/FloatingGoback"
import {GlobalContext} from "../GlobalContext";


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
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    orderid: {
        paddingRight: theme.spacing(2)
    },
    helpText: {
        marginTop: theme.spacing(8)
    },


}));

const demoOrders = [
    {
        id: 1,
        date: "23/01/2020",
        orderItems: [{
            name: "Chicken Butter",
            size: "Full",
            quantity: 5,
            price: 240
        },
            {
                name: "Masala Aloo",
                size: "Half",
                quantity: 6,
                price: 190
            },
            {
                name: "Julab Gamun",
                size: "Good One",
                quantity: 7,
                price: 90
            }
        ]
    },
    {
        id: 2,
        date: "12/01/2020",
        orderItems: [{
            name: "Chicken Butter",
            size: "Full",
            quantity: 5,
            price: 240
        },
            {
                name: "Masala Aloo",
                size: "Half",
                quantity: 6,
                price: 190
            },
            {
                name: "Julab Gamun",
                size: "Good One",
                quantity: 7,
                price: 90
            }
        ]
    },
    {
        id: 3,
        date: "13/01/2020",
        orderItems: [{
            name: "Chicken Butter",
            size: "Full",
            quantity: 5,
            price: 240
        },
            {
                name: "Masala Aloo",
                size: "Half",
                quantity: 6,
                price: 190
            },
            {
                name: "Julab Gamun",
                size: "Good One",
                quantity: 7,
                price: 90
            }
        ]
    },
    {
        id: 4,
        date: "01/01/2020",
        time: "00:8PM",
        merchandise: "STEP IN CAFE",
        currentStatus: "PLACED",
        orderItems: [{
            name: "Veg Mutton",
            size: "Quarter",
            quantity: 5,
            price: 100
        },
            {
                name: "Dahi Water",
                size: "Half",
                quantity: 6,
                price: 190
            },
            {
                name: "Pilli Chotato",
                size: "Good One",
                quantity: 7,
                price: 90
            }
        ]
    },

];


export default (props) => {
    const ctx = useContext(GlobalContext);
    const [orders, setOrders] = useState(demoOrders);
    const history = useHistory();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        Axios.get(`${BASE_URL}/users/orders/`, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                setOrders(orders.data)
            }
        ).catch(
            error => enqueueSnackbar("Failed to load orders.", {variant: "error", key: "orderkey"})
        )
    }, []);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth={"sm"} className={classes.main}>
                <CssBaseline/>

                <div className={classes.title}>
                    <Back fontSize={"large"} onClick={history.goBack}/>
                    <Typography variant={"h5"} align={"center"}> <b> Orders </b></Typography>
                </div>
                {orders.map((order, index) => (
                    <ExpansionPanel key={order.id} elevation={3}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <Typography className={classes.heading}> <b> #{order.id} </b></Typography>
                            <Typography
                                className={classes.heading}> On {order.date} at {order.time} from {order.merchandise}</Typography>
                            <Typography className={classes.heading} color={"primary"}
                                        variant={"subtitle1"}> {order.currentStatus}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} elevation={0} variant={"outlined"}>
                                <Table>
                                    <caption> {order.address || "Orderd at: Mars 456c Crates"}</caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={"center"}> <b> Name </b> </TableCell>
                                            <TableCell align={"right"}><b> Size </b> </TableCell>
                                            <TableCell align={"right"}> <b> Quantity </b></TableCell>
                                            <TableCell align={"left"}> <b>SubTotal </b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.orderItems.map((orderitem, index) => (
                                            <TableRow key={order.id + index}>
                                                <TableCell align={"center"}> {orderitem.name}</TableCell>
                                                <TableCell align={"right"}> {orderitem.size}</TableCell>
                                                <TableCell align={"center"}> {orderitem.quantity}</TableCell>
                                                <TableCell
                                                    align={"left"}> {orderitem.price * orderitem.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
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
