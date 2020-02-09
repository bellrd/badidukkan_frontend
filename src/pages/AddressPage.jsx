import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory, Redirect} from "react-router-dom"
import {
    Button,
    Container,
    CssBaseline,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    Radio,
    Typography
} from "@material-ui/core";
import {Add, KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import {GlobalContext} from "../GlobalContext";
import Axios from "axios";
import {BASE_URL} from "../constant";
import {useSnackbar} from "notistack";


const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
    },
    root: {
        marginTop: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3)
    },
    addNew: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0)
    },
    addNewFab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));




export default (props) => {

    const ctx = useContext(GlobalContext);
    const [addresses, setAddresses] = useState([]);
    const history = useHistory();
    // eslint-disable-next-line no-unused-vars
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const classes = useStyles();
    const from = props.location.from
    useEffect(() => {
        Axios.get(`${BASE_URL}/users/addresses/`, {headers: {Authorization: ctx.state.accessToken}}).then(response => {
            console.log(response)
            setAddresses(response.data)
        }).catch(error => {
            enqueueSnackbar("Unable to retrieve address.", {variant: "error"})
        })
    }, []);
    if(!ctx.state.accessToken){
       return <Redirect to={{pathname:"/login", next:"/chooseAddress"}} />
    }else
    return (
        <React.Fragment>
            <Container maxWidth={"sm"} className={classes.root}>
                <CssBaseline/>
                <div className={classes.title}>
                    <Back fontSize={"large"} onClick={history.goBack}/>
                    <Typography variant={"h5"} align={"center"}><b> Choose Address </b> </Typography>
                </div>
                <Paper className={classes.paper} elevation={3}>
                    <List subheader={<ListSubheader disableSticky> Addresses </ListSubheader>}>
                        {
                            addresses.map((address, index) => (
                                <React.Fragment>
                                    <ListItem key={index}>
                                        <ListItemText primary={address.landmark || "No landmark"} secondary={
                                            <React.Fragment>

                                                <Typography variant={"subtitle1"}> {address.detail}</Typography>
                                                <Button variant={"text"} component={Link} size={"small"}
                                                        color={"secondary"}
                                                        to={{
                                                            pathname: "/editAddress",
                                                            address: address,
                                                            from:from
                                                        }}> Edit </Button>
                                            </React.Fragment>

                                        }>
                                        </ListItemText>

                                        <ListItemSecondaryAction hidden= {from === "/homePage"}>
                                            <Radio edge={"end"} onChange={() => {
                                                ctx.dispatch(
                                                    {
                                                        type: "ADDRESS_SELECTED",
                                                        payload: address
                                                    });
                                                if (props.location.next === "/") {
                                                    history.replace("/")
                                                } else {
                                                    history.replace("/checkout")
                                                }
                                            }
                                            }/>

                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider/>
                                </React.Fragment>
                            ))
                        }

                        <Button color={"primary"} className={classes.addNew} onClick={() => {
                            history.push({pathname:"/editAddress", from:from})
                        }}> Add new </Button>
                    </List>
                </Paper>
            </Container>
            <Fab onClick={() => {
                history.push({pathname:"/editAddress", from:from})
            }} color={"primary"} className={classes.addNewFab}>
                <Add/>
            </Fab>
        </React.Fragment>
    )
}