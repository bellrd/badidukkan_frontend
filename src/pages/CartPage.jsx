import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    CardContent,
    Divider,
    Fab,
    IconButton,
    List,
    ListSubheader,
    Paper,
    Typography,
} from "@material-ui/core/";
import {
    Add,
    ArrowRightAltRounded as Proceed,
    Delete,
    KeyboardBackspaceRounded as Back,
    Remove
} from '@material-ui/icons';
import {Container, CssBaseline, Hidden, makeStyles} from "@material-ui/core";
import {GlobalContext} from "../GlobalContext";
import {useSnackbar} from "notistack";


const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        justifyContent: "space-between",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "row"
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        fontWeight: "bolder"
    },

    controls: {
        padding: theme.spacing(0, 0, 1, 2),
    },
    main: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing(3),
    },
    checkoutDesktop: {
        position: "fixed",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        bottom: 25,
    },
    checkoutMobile: {
        position: "fixed",
        right: 20,
        bottom: 15,
    }


}));

const CartItem = (props) => {
    const ctx = useContext(GlobalContext);

    const item = props.item;
    const classes = useStyles();
    console.log({item});

    return (
        <Box className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography style={{fontWeight: "bolder"}}>
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {item.size}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <ButtonGroup size={"small"} color={"secondary"} variant={"outlined"}>

                        <IconButton onClick={() => {
                            ctx.dispatch({
                                type: "REMOVE_ONE_ITEM",
                                payload: {item: {id: item.id}, size: item.size}
                            })

                        }}>
                            <Remove/>
                        </IconButton>

                        <Button variant={"contained"} color={"primary"}
                                disableElevation={true}> {item.quantity} </Button>

                        <IconButton onClick={() => {
                            ctx.dispatch({
                                type: "ADD_ONE_ITEM",
                                payload: {item: item, size: item.size, price: item.price}
                            })

                        }}><Add/></IconButton>
                    </ButtonGroup>
                </div>
            </div>
            <div className={classes.info}>
                <IconButton size={"small"} onClick={() => {
                    ctx.dispatch({type: "DELETE_ITEM", payload: {item: item, size: item.size}})
                }}>
                    <Delete color={"secondary"}/>
                </IconButton>
                <Typography>
                    {item.price * item.quantity}
                </Typography>
            </div>
        </Box>
    )
};

export default (props) => {
    const ctx = useContext(GlobalContext);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <Box style={{display: "none"}}> {enqueueSnackbar("Click on checkout to buy.", {variant: "info"})} </Box>
            <Container maxWidth={"sm"}>
                <CssBaseline/>
                <div className={classes.main}>
                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"} align={"center"}><b> Cart </b> </Typography>
                    </div>
                    <Paper elevation={3}>
                        <List subheader={<ListSubheader disableSticky><b> {ctx.state.cart.length} Items </b>
                        </ListSubheader>}>
                            {ctx.state.cart.map(item => (<CartItem key={item.key} item={item}/>))}
                        </List>
                    </Paper>
                </div>
                <Hidden smDown>
                    <Fab variant={"extended"} className={classes.checkoutDesktop} color={"primary"}
                         onClick={
                             () => {
                                 history.push({pathname: "/selectOrderType", merchandiseId: " id"})
                             }
                         }
                    >
                        <Proceed/> <small> Checkout </small>
                    </Fab>
                </Hidden>
                <Hidden mdUp>
                    <Fab variant={"extended"} className={classes.checkoutMobile} color={"primary"}
                         onClick={
                             () => {
                                 history.push({pathname: "/selectOrderType", merchandiseId: " id"})
                             }
                         }>
                        <Proceed/> <small> Checkout </small>
                    </Fab>
                </Hidden>
            </Container>

        </div>
    )
}