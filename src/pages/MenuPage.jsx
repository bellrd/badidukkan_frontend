import React, {useEffect, useState} from "react"
import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import AppBar from "../components/AppBar"
import {GlobalContext} from "../GlobalContext";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import {data} from "./demoCategoryList"
import {Link, useHistory} from "react-router-dom"
import {BASE_URL} from "../constant";
import Axios from "axios";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(10)
    },
    filterBar: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },

    main: {
        padding: theme.spacing(2),
        justifyContent: "space-between",
    },
    categoryroot: {
        padding: theme.spacing(2),
        position: "fixed",
        right: 20,
        top: 70,
        background: theme.palette.background.paper,
        zIndex: 0,
    },
    checkout: {
        marginTop: theme.spacing(2),
        width: 200,
        borderRadius: 0,
    },
    cart: {
        position: "fixed",
        right: 30,
        bottom: 20,
    }

}));


export default (props) => {
    const ctx = React.useContext(GlobalContext);
    const history = useHistory();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const {merchandise_id: merchandiseId} = props.match.params;
    const classes = useStyles();
    const [categories, setCategories] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState();
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    useEffect(() => {
        Axios.get(`${BASE_URL}/public/category_wise/menu/${merchandiseId}/`,).then(response => {
            setCategories(response.data.categories)
        }).catch(error => {
            enqueueSnackbar("Faild to load Menu.", {variant: "error"});
            setTimeout(history.goBack, 5)
        })
    });

    return (
        <div className={classes.root}>
            <AppBar/>
            <Container maxWidth={"lg"}>
                <div className={classes.filterBar}>
                    <Typography variant={"h5"}> <b>Step In cafe </b></Typography>
                    <Hidden mdUp>
                        <Button variant={"outlined"} size={"large"} color={"primary"} onClick={() => {
                            setShowFilterDialog(true)
                        }}> Filter </Button>
                    </Hidden>
                </div>

                <Grid container spacing={3} className={classes.main}>
                    <Grid item xs={12} md={9}>
                        <CategoryList categories={categories}/>
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={3}>
                            <Paper className={classes.categoryroot} elevation={0} square>
                                <List subheader={<ListSubheader><b> Filter </b> </ListSubheader>}>
                                    {categories.map(category => (
                                        <ListItem button component={"a"} key={category.id} href={`#${category.id}`}
                                                  selected={category.id === selectedCategory}
                                                  onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <ListItemText> {category.name}</ListItemText>
                                            <ListItemSecondaryAction> {category.count}</ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                                <Button className={classes.checkout} size={"large"} variant={"contained"}
                                        color={"primary"} component={Link} to={"/cart"}>View Cart </Button>
                            </Paper>

                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
            <Footer/>


            <Dialog fullWidth maxWidth={"lg"} aria-labelledby="simple-dialog-title" open={showFilterDialog}>
                <DialogTitle id="simple-dialog-title"> Filter </DialogTitle>
                <List>
                    {categories.map(category => (
                        <ListItem key={category.id} button component={"a"} href={`#${category.id}`}
                                  onClick={() => setShowFilterDialog(false)}>
                            <ListItemText> {category.name}</ListItemText>
                            <ListItemSecondaryAction> {category.count}</ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    )
}

