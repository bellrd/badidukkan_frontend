import React, { useEffect, useState } from "react";
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
  Typography
} from "@material-ui/core";
import AppBar from "../components/AppBar";
import { GlobalContext } from "../GlobalContext";
import Footer from "../components/Footer";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../constant";
import Axios from "axios";
import { useSnackbar } from "notistack";
import ItemCard from "../components/ItemCard";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(10)
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },

  main: {
    padding: theme.spacing(2),
    justifyContent: "space-between"
  },
  categoryroot: {
    padding: theme.spacing(2),
    position: "fixed",
    right: 20,
    top: 70,
    background: theme.palette.background.paper,
    zIndex: 0
  },
  checkout: {
    marginTop: theme.spacing(2),
    width: 200,
    borderRadius: 0
  },
  cart: {
    position: "fixed",
    right: 30,
    bottom: 20
  },

  category: {
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  itemgrid: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100%"
  }
}));

export default props => {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const merchandise_id = props.match.params.merchandise_id;
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  useEffect(() => {
    Axios.get(`${BASE_URL}/merchandises/${merchandise_id}`)
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        enqueueSnackbar("Failed to load Menu.", { variant: "error" });
        setTimeout(history.goBack, 1000);
      });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar />
      <Container maxWidth={"lg"}>
        <div className={classes.filterBar}>
          <Typography variant={"h5"}>
            {" "}
            <b>{props.location.merchandise_name}</b>
          </Typography>
          <Hidden mdUp>
            <Button
              variant={"outlined"}
              size={"large"}
              color={"primary"}
              onClick={() => {
                setShowFilterDialog(true);
              }}
            >
              {" "}
              Filter{" "}
            </Button>
          </Hidden>
        </div>

        <Grid container spacing={3} className={classes.main}>
          <Grid item xs={12} md={9}>
            {categories.map(category => (
              <section
                key={category.id}
                id={category.id}
                className={classes.category}
              >
                <Grid item xs={12}>
                  <Typography
                    variant={"h5"}
                    className={classes.title}
                    color={"primary"}
                  >
                    {" "}
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}{" "}
                  </Typography>
                  <Grid container spacing={2} className={classes.itemgrid}>
                    {category.items
                      .filter(z => z.is_available)
                      .map(item => (
                        <Grid item key={item.id} xs={12} md={4}>
                          <ItemCard
                            item={item}
                            category_id={category.id}
                            merchandise_id={merchandise_id}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </section>
            ))}
          </Grid>
          <Hidden smDown>
            <Grid item xs={3}>
              <Paper className={classes.categoryroot} elevation={0} square>
                <List
                  subheader={
                    <ListSubheader>
                      <b> Filter </b>{" "}
                    </ListSubheader>
                  }
                >
                  {categories.map(category => (
                    <ListItem
                      button
                      component={"a"}
                      key={category.id}
                      href={`#${category.id}`}
                      selected={category.id === selectedCategory}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <ListItemText> {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}</ListItemText>
                      <ListItemSecondaryAction>
                        {" "}
                        {category.items.length}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Button
                  className={classes.checkout}
                  size={"large"}
                  variant={"contained"}
                  color={"primary"}
                  component={Link}
                  to={"/cart"}
                >
                  View Cart{" "}
                </Button>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </Container>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        aria-labelledby="simple-dialog-title"
        open={showFilterDialog}
      >
        <DialogTitle id="simple-dialog-title"> Filter </DialogTitle>
        <List>
          {categories.map(category => (
            <ListItem
              key={category.id}
              button
              component={"a"}
              href={`#${category.id}`}
              onClick={() => setShowFilterDialog(false)}
            >
              <ListItemText> {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}</ListItemText>
              <ListItemSecondaryAction>
                {" "}
                {category.items.length}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Footer />
    </div>
  );
};
