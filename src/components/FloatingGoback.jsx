import {useHistory} from "react-router-dom";
import {makeStyles, useScrollTrigger, Zoom} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
    backButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default (props) => {
    const history = useHistory();
    const {children, window} = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Zoom in={trigger}>
            <div onClick={history.goBack} className={classes.backButton}>
                {children}
            </div>
        </Zoom>
    );
}