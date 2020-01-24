import React, {useContext, useEffect, useState} from "react";
import Axios from "axios";
import {Redirect, useHistory} from "react-router-dom"
import {
    Container,
    CssBaseline,
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
import {KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import {GlobalContext} from "../GlobalContext";
import Footer from "../components/Footer";
import {BASE_URL} from "../constant";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
    },
    inline: {
        display: "inline"
    },
    root: {
        marginTop: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3)
    },
}));


export default (props) => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const merchandiseId = props.location.marchandiseId || null;
    const ctx = useContext(GlobalContext);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        Axios.get(`${BASE_URL}/public/merchandises/${merchandiseId}/`).then(
            response => {
                setServices(response.data.services)
            }
        ).catch(error => {
            enqueueSnackbar("Failed in loading options", {variant: "error"});
            history.goBack()
        })
    });

    const [services, setServices] = useState(["EAT AT SHOP", "SELF PICKUP", "DELIVERY BY VENDOR", "DELIVER BY US"]);
    if (props.location.merchandiseId == null) {
        return <Redirect to={"/"}/>
    } else
        return (
            <React.Fragment>
                <Container maxWidth={"sm"} className={classes.root}>
                    <CssBaseline/>
                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"}
                                    align={"center"} style={{textDecoration: "underline"}}> Available options
                        </Typography>
                    </div>
                    <Paper className={classes.paper} elevation={3}>
                        <List subheader={<ListSubheader disableSticky> Choose one option (required) </ListSubheader>}>
                            {services.map(type => (
                                <ListItem button onClick={() => {
                                    ctx.dispatch({type: "ORDER_TYPE_SET", payload: type});
                                    if (type.addressRequired) {
                                        history.push("/chooseAddress")
                                    } else {
                                        history.push("/checkout")
                                    }
                                }}>
                                    <ListItemText> <b> {type.name} </b> </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Radio/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Container>
                <Footer/>
            </React.Fragment>
        )
}

