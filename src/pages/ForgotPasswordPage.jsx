import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link, useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {BASE_URL} from "../constant";
import Axios from "axios";
import {useSnackbar} from "notistack";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link to="/">BadiDukkan.com</Link> {new Date().getFullYear()}
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

export default function ForgotPasswordPage(props) {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const history = useHistory()
    const [mobile, setMobile] = useState("");
    const [mobileFieldError, setMobileFieldError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);


    const handleInput = e => {
        if (e.target.name === "mobile") {
            setMobile({mobile: e.target.value});
        }
    };

    const handleSubmit = () => {
        if (!mobile.match(/^[6-9]{1}[\d]{9}$/)) {
            setMobileFieldError(true);
            return; //required
        } else {
            setMobileFieldError(false);
        }
        setDisableSubmit(true);
        Axios.post(`${BASE_URL}/users/reset_password/`, {mobile}).then(response => {
                enqueueSnackbar(response.data.message, {variant: "success"});
                setTimeout(() => {
                    history.push({pathname: "/verify", next: "/profile/#updatePassword"})
                }, 1000)
            }
        ).catch(error => {
                enqueueSnackbar(error.data.message, {variant: "error"})
            }
        )
    };
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
                        name="mobile"
                        type="tel"
                        autoComplete="mobile"
                        autoFocus
                        onChange={handleInput}
                        value={props.location.mobile}
                        disabled={Boolean(props.location.mobile)}
                    />

                    <Button
                        fullWidth
                        disabled={disableSubmit}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/help" variant="body2">
                                Need Help ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Login"}
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