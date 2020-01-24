import React from "react"
import {useHistory} from "react-router-dom";
import {Link, Typography, CssBaseline, Grid, makeStyles} from "@material-ui/core";
import {Facebook, Instagram, WhatsApp,} from "@material-ui/icons";
import {Link as dLink} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        paddingBottom:theme.spacing(2),
        textAlign: "center",
        background: "#24292e",
        color: "#808080",
        zIndex:99,
        position:"relative"
    },
    item: {
        justifyContent: "center",
        padding: theme.spacing(8, 1, 1, 1)
    },
    icons:{
        padding:theme.spacing(.3)
    }
}));


export default (props) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <CssBaseline>
            <div className={classes.root}>
                <Grid container>

                    <Grid item xs={6} md={4} className={classes.item}>
                        <Typography variant={"h5"} style={{textDecoration:"underline", fontWeight:"bolder"}}> Quick Links</Typography>
                        <h4 onClick={()=>{history.push("/profile")}}>Profile </h4>
                        <h4 onClick={()=>{history.push("/cart")}}> Cart </h4>
                        <h4 onClick={()=>{history.push("/orderHistory")}}> OrderHistory</h4>

                    </Grid>

                    <Grid item xs={6} md={4} className={classes.item}>
                        <Typography variant={"h5"} style={{textDecoration:"underline", fontWeight:"bolder"}}> Disclaimer </Typography>
                        <h4> Terms & Condition</h4>
                        <h4> Refund Policy</h4>
                        <h4> About </h4>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.item}>
                        <Typography> Connect with us+</Typography>
                        <Facebook fontSize={"large"} className={classes.icons}/>
                        <Instagram fontSize={"large"} className={classes.icons}/>
                        <WhatsApp fontSize={"large"} className={classes.icons}/>
                    </Grid>
                </Grid>
                 <Link to={"/"}> Badidukkan.com</Link>
            </div>
        </CssBaseline>
    )
}