import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link, Redirect, useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {BASE_URL} from "../constant";
import Axios from "axios";
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
        padding: "30px",
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontWeight: "bold",
        "& input": {
            color: "#404040",
            letterSpacing: "0.1rem"
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

export default function VerifyPage(props) {
    const ctx = React.useContext(GlobalContext);
    const history = useHistory();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const classes = useStyles();
    const [verifyData, setVerifyData] = useState(
        {mobile_number: "mobile_number" in props.location ? props.location.mobile_number : "", otp: ""}
    );
    const [mobileFieldError, setMobileFieldError] = useState(false);
    const [otpFieldError, setOtpFieldError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

    const handleInput = e => {
        if (e.target.name === "mobile_number") {
            setVerifyData({...verifyData, mobile_number: e.target.value});
        } else if (e.target.name === "otp") {
            setVerifyData({...verifyData, otp: e.target.value});
        } else {
            console.log("wtf level 101");
        }
    };

    const handleSubmit = () => {
        if (!verifyData.mobile_number.match(/^[6-9]{1}[\d]{9}$/)) {
            setMobileFieldError(true);
            return; //required
        } else {
            setMobileFieldError(false);
        }
        if (verifyData.otp.length === 0) {
            setOtpFieldError(true);
            return; // don't mess
        } else {
            setOtpFieldError(false);
        }

        setDisableSubmit(true);
        Axios.post(`${BASE_URL}/verify`, verifyData).then(response => {
                ctx.dispatch({type: "LOGIN", payload: response.data.token});
                enqueueSnackbar("Success", {variant: "success"});
                const nextPage = props.location.next || props.next || "/profile/#updatePasword";
                setTimeout(() => {
                    history.replace(nextPage)
                }, 500)
            }
        ).catch(error => {
                enqueueSnackbar("Verification failed.", {variant: "error"});
                setDisableSubmit(false);
                console.log({error})
            }
        )
    };

    // if already logged in redirect to / or next
    if (ctx.state.token != null) {
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
                    Verify mobile number
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
                        value={props.location.mobile_number}
                        disabled={Boolean(props.location.mobile_number)}
                    />
                    <TextField
                        error={otpFieldError}
                        helperText={otpFieldError ? "Blank otp not allowed" : null}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="otp"
                        label="OTP"
                        id="otp"
                        onChange={handleInput}
                    />
                    <Button
                        fullWidth
                        disabled={disableSubmit}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Verify
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/help" variant="body2">
                                Need Help ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Create an account"}
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
