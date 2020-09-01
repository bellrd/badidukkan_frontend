import React, {useContext, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Link, Redirect, useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Axios from "axios";
import {BASE_URL} from "../constant";
import {GlobalContext} from "../GlobalContext";
import {useSnackbar} from "notistack";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link to="/">badidukkan.com</Link> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white,
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        padding: "30px",
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontWeight: "bold",
        "& input": {
            color: "#404040",
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: "12px",
        fontWeight: "bold",
        fontSize: "17px",
        textTransform: "Capitalize"
    }
}));

export default function LoginPage(props) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, toggleShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({mobile_number: "", password: ""});
    const [mobileFieldError, setMobileFieldError] = useState(false);
    const [passwordFieldError, setPasswordFieldError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const ctx = useContext(GlobalContext);

    const handleClickShowPassword = () => {
        toggleShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleInput = e => {
        if (e.target.name === "mobile_number") {
            setLoginData({...loginData, mobile_number: e.target.value});
        } else if (e.target.name === "password") {
            setLoginData({...loginData, password: e.target.value});
        } else {
            console.log("wtf level 101");
        }
    };

    const handleSubmit = () => {
        if (!loginData.mobile_number.match(/^[6-9]{1}[\d]{9}$/)) {
            setMobileFieldError(true);
            return; //required
        } else {
            setMobileFieldError(false);
        }
        if (loginData.password.length === 0) {
            setPasswordFieldError(true);
            return; // don't mess
        } else {
            setPasswordFieldError(false);
        }

        setDisableSubmit(true);

        Axios.post(`${BASE_URL}/get-access-token`, {
            username: loginData.mobile_number,
            password: loginData.password
        })
            .then(function (response) {
                ctx.dispatch({type: "LOGIN", payload: response.data.token});
                enqueueSnackbar("Login successful", {variant: "success"});
                setTimeout(() => {
                    const nextPage = props.location.next || props.next || "/";
                    history.replace(nextPage)
                })
            })
            .catch((error) => {
                // just for you
                enqueueSnackbar("Login failed ", {variant: "error", key: "loginkeyerror"});
                setDisableSubmit(false)
            });
    };

    // if already logged in redirect to / or next
    if (ctx.state.accessToken != null) {
        let next = props.next || props.location.next || "/";
        return <Redirect to={next}> </Redirect>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight="bold">
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={mobileFieldError}
                        helperText={mobileFieldError ? "Invalid mobile number." : null}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile number"
                        name="mobile_number"
                        type="tel"
                        autoComplete="mobile"
                        autoFocus
                        onChange={handleInput}
                    />
                    <TextField
                        error={passwordFieldError}
                        helperText={
                            passwordFieldError ? "Blank password not allowed" : null
                        }
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInput}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            )
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        disabled={disableSubmit}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Log in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgotPassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Create an account ?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
