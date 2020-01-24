import {Button, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {ContactSupport, Create, Help, History, Lock, Person, ShoppingCart, VpnKey} from "@material-ui/icons";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {GlobalContext} from "../../GlobalContext";

const useStyle = makeStyles(theme => ({
    list: {
        width: "auto",
    },
    logo: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        fontFamily: "Pacifico"
    }
}));

export default (props) => {
    const ctx = useContext(GlobalContext);
    const classes = useStyle();
    if (props.accessToken === null || props.accessToken === "") {
        return <div className={classes.list} role="presentation">
            <Typography variant={"h4"} className={classes.logo}>
                {props.title}
            </Typography>
            <List>
                <Button component={Link} to={"/login"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><Lock/></ListItemIcon>
                        <ListItemText>Login to account.</ListItemText>
                    </ListItem>
                </Button>
                <Button component={Link} to={"/register"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><Create/></ListItemIcon>
                        <ListItemText>Create an account.</ListItemText>
                    </ListItem>
                </Button>

                <Button component={Link} to={"/forgotPassword"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><Help/></ListItemIcon>
                        <ListItemText>Forgot Password</ListItemText>
                    </ListItem>
                </Button>
            </List>

            <Divider/>
            <List>
                <Button component={Link} to={"/help"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><ContactSupport/></ListItemIcon>
                        <ListItemText>Contact us</ListItemText>
                    </ListItem>
                </Button>
            </List>
        </div>
    } else {
        return <div className={classes.list} role="presentation">
            <Typography variant={"h4"} className={classes.logo}>
                {props.title}
            </Typography>

            <Divider/>
            <List>
                <Button component={Link} to={"/profile"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><Person/></ListItemIcon>
                        <ListItemText> Profile </ListItemText>
                    </ListItem>
                </Button>

                <Button fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem component={Link} to={"/cart"}>
                        <ListItemIcon><ShoppingCart/></ListItemIcon>
                        <ListItemText> Cart </ListItemText>
                    </ListItem>
                </Button>

                <Button component={Link} to={"/orderHistory"} fullWidth={true} size={"small"}
                        style={{textTransform: "none"}}>
                    <ListItem>
                        <ListItemIcon><History/></ListItemIcon>
                        <ListItemText> Manage orders </ListItemText>
                    </ListItem>
                </Button>
                <Divider/>
                <List>
                    <Button component={Link} to={"/profile/#udpatePassword"} fullWidth={true} size={"small"}
                            style={{textTransform: "none"}}>
                        <ListItem>
                            <ListItemIcon><VpnKey/></ListItemIcon>
                            <ListItemText>Change password.</ListItemText>
                        </ListItem>
                    </Button>
                    <ListItem>
                        <Button component={Link} to={"/help"} fullWidth={true} size={"small"}
                                style={{textTransform: "none"}}>
                            <ListItemIcon><Help/></ListItemIcon>
                            <ListItemText>Contact us</ListItemText>
                        </Button>
                    </ListItem>
                </List>
            </List>
        </div>
    }
};

