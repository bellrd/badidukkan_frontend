import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext";
import {Redirect} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Container, Typography} from "@material-ui/core";

const LogoutPage = () => {
    const TIME_TO_REDIRECT = 2;
    const ctx = useContext(GlobalContext);
    const [timer, setTimer] = useState(TIME_TO_REDIRECT);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        ctx.dispatch({type: "LOGOUT"});
    }, []);

    enqueueSnackbar("Redirecting to Home Page.", {variant: "info"});

    setInterval(()=>{setTimer(timer - 1)}, 1000)

    return timer ? (
        <Container maxWidth={"sm"} >
            <Typography variant={"h5"} align={"center"}> Redirecting to HomePage...</Typography>
        </Container>
    ) : (
        <Redirect to="/"/>
    );
};

export default LogoutPage;
