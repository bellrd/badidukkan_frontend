import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {GlobalContext} from "../../GlobalContext";
import {AppBar, Badge, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core"
import {Link} from "react-router-dom";
import {ShoppingCart} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "bolder",
        fontFamily: "Pacifico"
    },
    cart: {
        marginRight: theme.spacing(2)
    },
    buttons: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        textTransform: "capitalize"
    }

}));

export default function MenuAppBar(props) {
    const ctx = React.useContext(GlobalContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position={props.position || "sticky"} color={"secondary"} elevation={3}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        BadiDukkan
                    </Typography>
                    {ctx.state.accessToken ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={"/profile"}> Account </MenuItem>
                                <MenuItem component={Link} to={"/orderHistory"}> Manage Orders</MenuItem>
                                <MenuItem component={Link} to={{pathname:"/chooseAddress", from:"/homePage"}}> Manage Addresses</MenuItem>
                                <MenuItem component={Link} to={"/contact"}> Contact Us </MenuItem>
                                <MenuItem component={Link} to={"/logout"}> Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className={classes.buttons}>
                            <Button color="inherit" component={Link} to={"/login"}> Login </Button>
                            <Button color="inherit" component={Link} to={"/register"}> Register </Button>
                            <Button color="inherit" component={Link} to={"/about"}> About </Button>
                        </div>
                    )}
                    <Button component={Link} to={"/cart"}>
                        <Badge badgeContent={ctx.state.cart.length} color="primary">
                            <ShoppingCart style={{color: "white"}}/>
                        </Badge>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
