import React from "react"
import {
    AppBar,
    Badge,
    CssBaseline,
    Drawer,
    Fab,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@material-ui/core";
import {Close, Menu, ShoppingCart} from "@material-ui/icons";
import {GlobalContext} from "../../GlobalContext";
import Axios from "axios";
import {BASE_URL} from "../../constant";
import SideList from "./sidelist"
import {Link} from "react-router-dom"

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2)

    },
    title: {
        flexGrow: 1,
        fontFamily: "Pacifico"
    },
    close: {
        margin: "0 auto",
        marginBottom: theme.spacing(2)
    }

}));



export default (props) => {

    const ctx = React.useContext(GlobalContext);
    const [profile, setProfile] = React.useState({full_name: "Hi !"});
    const [drawer, setDrawer] = React.useState(false);
    React.useEffect(() => {
        if (!(ctx.state.accessToken)) return;
        if (ctx.state.profile) {
            setProfile(ctx.state.profile);
            return;
        }
        Axios.get(`${BASE_URL}/user/profile/`, {headers: {Authorization: ctx.state.accessToken}}).then(response =>
            setProfile(response.data)
        ).catch(err =>
            console.log({error: err})
        )
    }, []);


    const classes = useStyle();


    return (

        <React.Fragment>
            <CssBaseline/>
            <AppBar position={"fixed"} className={classes.root} color={"#fff"} elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={() => {
                        setDrawer(!drawer)
                    }}>
                        <Menu/>
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        BadiDukkan
                    </Typography>
                    <IconButton component={Link} to={"/cart"}
                    >
                        <Badge badgeContent={ctx.state.cart.length} color="secondary">
                            <ShoppingCart color={"primary"}/>
                        </Badge></IconButton>
                    <Drawer open={drawer} anchor="bottom">
                        <SideList accessToken={ctx.state.accessToken}
                                  title={ctx.state.accessToken ? profile.full_name : "Hello,"}/>
                        <Fab variant={"extended"} className={classes.close} color={"secondary"}
                             onClick={() => setDrawer(false)}>
                            <Close/>
                            Close
                        </Fab>
                    </Drawer>

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};