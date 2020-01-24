import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext";
import {Redirect} from "react-router-dom";
import {useSnackbar} from "notistack";

const LogoutPage = () => {
    const TIME_TO_REDIRECT = 5;
    const ctx = useContext(GlobalContext);
    const [timer, setTimer] = useState(TIME_TO_REDIRECT);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        ctx.dispatch({type: "LOGOUT"});
    }, []);

    enqueueSnackbar("Redirecting to Home Page.", {variant: "info"});
    const decrementTimer = () => {
        setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
    };

    if (timer !== 0) {
        decrementTimer();
    }

    return timer ? (
        <>
            <h1> Redirecting to Home Page in {timer}</h1>
        </>
    ) : (
        <Redirect to="/"/>
    );
};

export default LogoutPage;
