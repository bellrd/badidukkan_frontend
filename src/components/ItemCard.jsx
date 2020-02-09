import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import {Add, Remove} from "@material-ui/icons";
import {GlobalContext} from "../GlobalContext";

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        width: 'auto',
        justifyContent: "space-between",
        height: 180
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    content: {},
    cover: {
        margin: theme.spacing(2),
        width: 151,
    },
    controls: {
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    }
}));


export default (props) => {
    const ctx = useContext(GlobalContext);
    const [showOptions, setShowOptions] = useState(false);
    const classes = useStyles();

    const item = props.item;
    const category_id = props.category_id;
    const merchandise_id = props.merchandise_id;

    return (
        <Card className={classes.card} elevation={2} square>

            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h6">
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {item.additionalDetail}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>

                    <ButtonGroup size={"small"} color={"secondary"} variant={"outlined"}>

                        <IconButton onClick={() => {
                            setShowOptions(true)
                        }}> <Remove/> </IconButton>

                        <Button variant={"contained"} color={"primary"}
                                disableElevation={true}>  {
                            ctx.state.cart.filter(
                                temp => temp._id === item._id)
                                .reduce(
                                    (a, b) => (
                                        {quantity: a.quantity + b.quantity}
                                    ),
                                    {quantity: 0})
                                .quantity
                        }  </Button>

                        <IconButton onClick={() => {
                            setShowOptions(true)
                        }}><Add/></IconButton>
                    </ButtonGroup>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={item.photoUrl || "https://source.unsplash.com/random"}
                title="Item photo"
            />


            <Dialog open={showOptions} fullWidth={true} maxWidth={"sm"}>
                <DialogTitle> Modify Size </DialogTitle>
                <DialogContent>
                    <List>
                        {item.sizes.map((size, index) => {
                            const itemIndex = ctx.state.cart.findIndex(cartitem => cartitem._id === item._id && cartitem.size === size.name);
                            return <ListItem key={index}>
                                <ListItemText> {size.name} @ <b>{size.price}</b></ListItemText>
                                <ListItemSecondaryAction>
                                    <ButtonGroup size={"small"} color={"secondary"} variant={"outlined"}>
                                        <IconButton onClick={() => {
                                            ctx.dispatch({
                                                type: "REMOVE_ONE_ITEM",
                                                payload: {
                                                    _id: item._id,
                                                    name: item.name,
                                                    size: size.name,
                                                    category_id: category_id,
                                                    price: size.price,
                                                    merchandise_id: merchandise_id
                                                }
                                            })
                                        }}>
                                            <Remove/>
                                        </IconButton>

                                        <Button variant={"contained"} color={"primary"}
                                                disableElevation={true}> {
                                            itemIndex !== -1 ? ctx.state.cart[itemIndex].quantity : "0"
                                        } </Button>

                                        <IconButton onClick={() => {
                                            ctx.dispatch({
                                                type: "ADD_ONE_ITEM",
                                                payload: {
                                                    _id: item._id,
                                                    name: item.name,
                                                    size: size.name,
                                                    price: size.price,
                                                    category_id: category_id,
                                                    merchandise_id: merchandise_id,
                                                }
                                            })
                                        }}>
                                            <Add/>
                                        </IconButton>
                                    </ButtonGroup>
                                </ListItemSecondaryAction>
                            </ListItem>
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"}
                            onClick={() => setShowOptions(false)}> Done </Button>
                </DialogActions>

            </Dialog>
        </Card>
    );
}