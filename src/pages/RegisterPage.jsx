import React, {useContext, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import Axios from "axios";
import {BASE_URL} from "../constant";
import {LockOutlined, Visibility, VisibilityOff} from "@material-ui/icons"
import {useSnackbar} from "notistack";
import {GlobalContext} from "../GlobalContext";

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
            backgroundColor: theme.palette.common.white
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
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontWeight: "bold",
        "& input": {
            color: "#404040"
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: "15px",
        fontWeight: "bold",
        fontSize: "17px",
        textTransform: "Capitalize"
    }
}));

export default (props) => {
    const ctx = useContext(GlobalContext)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const classes = useStyles();
    const [showPassword, toggleShowPassword] = useState(true);
    const [registerData, setRegisterData] = useState({
        first_name: "",
        last_name: "",
        mobile: "",
        password: "",
    });
    const [firstNameFieldError, setFirstNameFieldError] = useState(false);
    const [mobileFieldError, setMobileFieldError] = useState(false);
    const [passwordFieldError, setPasswordFieldError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [step, setStep] = useState(1);

    const handleClickShowPassword = () => {
        toggleShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleInput = e => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
        if (!(registerData.first_name.length >= 3)) {
            setFirstNameFieldError(true);
            return;
        } else {
            setFirstNameFieldError(false);
        }
        if (!registerData.mobile_number.match(/^[6-9]{1}[\d]{9}$/)) {
            setMobileFieldError(true);
            return; //required
        } else {
            setMobileFieldError(false);
        }
        if (registerData.password.length < 8) {
            setPasswordFieldError(true);
            return; // don't mess
        } else {
            setPasswordFieldError(false);
        }

        setDisableSubmit(true);
        Axios.post(`${BASE_URL}/users/register/`, {
            ...registerData,
            full_name: registerData.first_name + " " + registerData.last_name
        })
            .then(function (response) {
                setStep(2);
            })
            .catch((error) => {
                enqueueSnackbar(error.data.message, {variant: "error"});
                setDisableSubmit(false);
            });
    };

    if (step === 1) {
        // if already logged in redirect to / or next
        if (ctx.state.token != null) {
            return <Redirect to={{pathname:"/logout", next:"/register"}}> </Redirect>;
        } else
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    error={firstNameFieldError}
                                    helperText={
                                        firstNameFieldError ? "At least 3 character." : null
                                    }
                                    name="first_name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={handleInput}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="last_name"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={mobileFieldError}
                                    helperText={
                                        mobileFieldError ? "Invalid mobile number." : null
                                    }
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile Number"
                                    name="mobile_number"
                                    autoComplete="mobile"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordFieldError}
                                    helperText={
                                        passwordFieldError ? "At least 8 character." : null
                                    }
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary"/>
                                    }
                                    label="I want to receive offers, promotions and updates via SMS." //we don't handle this checkbox anyway
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            disabled={disableSubmit}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/verify",
                    mobile: registerData.mobile_number,
                    next:"/"
                }}
            ></Redirect>
        );
    }
}
