import React, {useContext, useEffect, useState} from "react";
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
    Switch,
    Typography,
} from "@material-ui/core";
import {KeyboardBackspaceRounded as Back} from "@material-ui/icons"
import {useHistory} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";
import Axios from "axios";
import {BASE_URL} from "../constant";
import {GlobalContext} from "../GlobalContext";


const useStyles = makeStyles(theme => ({
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
    info: {
        padding: theme.spacing(4)
    },
    update: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(8)
    },
    form: {},
    submit: {
        marginTop: theme.spacing(8),
        borderRadius: 0
    }
}));

const demoProfile = {
    mobile:"6393457611",
    full_name: "Neetu yadav",
    email: "iamsmartgirl@gmail.com",
    dob: "13/01/1999",
    notification: true,
    invoiceUpdate: false,
};


export default (props) => {

    const ctx = useContext(GlobalContext);
    const [profile, setProfile] = useState(demoProfile);
    const [showPassword, toggleShowPassword] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const classes = useStyles();

    useEffect(() => {
        Axios.get(`${BASE_URL}/users/profile/`, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => setProfile(response.data)
        ).catch(error => {
            enqueueSnackbar("Failed to load Profile", {variant: "error"})
        });
        return () => {
            Axios.put(`${BASE_URL}/users/profile/`, profile, {headers: {Authorization: ctx.state.accessToken}}).then(
                response => {
                    enqueueSnackbar("Profile Saved", {variant: "success"})
                }
            ).catch(error => {
                    enqueueSnackbar("Failed to update Profile", {variant: "error"})
                }
            )
        }
    }, []);

    const handleInput = e => {
        if (e.target.name === "password1") {
            setPassword1(e.target.value)
        } else if (e.target.name === "password2") {
            setPassword2(e.target.value)
        } else {
            console.log("wtf level 101");
        }
    };

    const handleSubmit = () => {
        if (password1 !== password2) {
            enqueueSnackbar("Password does not match.", {variant: "error", key: "passwordMatch"});
            return
        }

        if (password2.length < 5) {
            enqueueSnackbar("Try longer password", {variant: "error", key: "passwordShort"});
            return
        }
        Axios.put(`${BASE_URL}/users/change_password/`, {
            mobile: profile.mobile,
            password: password2
        }, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                enqueueSnackbar("Password Updated", {variant: "success"})
            })
            .catch(error => {
                enqueueSnackbar("Failed to update password", {variant: "error"})
            });
    };


    return (
        <div>
            <Container maxWidth={"sm"}>
                <CssBaseline/>

                <div className={classes.main}>
                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"} align={"center"}> <b> Profile </b></Typography>
                    </div>

                    <Paper className={classes.info} elevation={3}>
                        <List subheader={<ListSubheader disableSticky> {profile.full_name}</ListSubheader>}>
                            <ListItem>
                                <ListItemText> Email: </ListItemText>
                                <ListItemSecondaryAction onClick={() => {
                                    const newEmail = prompt("Enter Email");
                                    enqueueSnackbar("Email Added", {variant: "success"});
                                    setProfile({...profile, email: newEmail})
                                }}>
                                    {profile.email || "example@somthing.com"}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText> Dob </ListItemText>
                                <ListItemSecondaryAction onClick={() => {
                                    enqueueSnackbar("Working on it.", {variant: "info"})
                                }}>
                                    {profile.dob || "Not provided."}

                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText> Notification </ListItemText>
                                <ListItemSecondaryAction>
                                    <Switch checked={profile.notification} onChange={() => {
                                        setProfile({...profile, notification: !profile.notification})
                                    }}/>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemText> Email Invoice </ListItemText>
                                <ListItemSecondaryAction>
                                    {profile.email ? (

                                        <Switch checked={profile.invoiceUpdate} onChange={() => {
                                            setProfile({...profile, invoiceUpdate: !profile.invoiceUpdate})
                                        }}/>
                                    ) : "Add email"}
                                </ListItemSecondaryAction>
                            </ListItem>

                        </List>
                    </Paper>

                    <section id="updatePassword">
                        <Paper elevation={3} className={classes.update}>
                            <form noValidate className={classes.form}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password1"
                                    label="New Password"
                                    name="password1"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    autoFocus
                                    onChange={handleInput}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    toggleShowPassword(!showPassword)
                                                }}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        )
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Confirm"
                                    type={"password"}
                                    id="password2"
                                    onChange={handleInput}
                                />
                                <Button classes={classes.submit}
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        disabled={password2 !== password1}
                                        className={classes.submit}
                                        onClick={handleSubmit}
                                >
                                    Update Password
                                </Button>
                            </form>
                        </Paper>
                    </section>
                </div>
            </Container>
        </div>
    );
}






