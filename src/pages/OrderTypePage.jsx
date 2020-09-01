import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { KeyboardBackspaceRounded as Back } from "@material-ui/icons";
import { GlobalContext } from "../GlobalContext";
import Footer from "../components/Footer";
import { BASE_URL } from "../constant";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    justifyContent: "space-between"
  },
  inline: {
    display: "inline"
  },
  root: {
    marginTop: theme.spacing(4)
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3)
  }
}));

export default props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const merchandise_id = props.location.merchandise_id || null;
  const ctx = useContext(GlobalContext);
  const history = useHistory();
  const classes = useStyles();

  if (!props.location.merchandise_id) {
    return <Redirect to={"/cart"} />;
  }

  if (ctx.state.accessToken == null) {
    return <Redirect to={{ pathname: "/login", next: "/cart" }} />;
  }
  return (
    <React.Fragment>
      <Container maxWidth={"sm"} className={classes.root}>
        <CssBaseline />
        <div className={classes.title}>
          <Back fontSize={"large"} onClick={history.goBack} />
          <Typography
            variant={"h5"}
            align={"center"}
            style={{ textDecoration: "underline" }}
          >
            {" "}
            Available options
          </Typography>
        </div>
        <Paper className={classes.paper} elevation={3}>
          <List
            subheader={
              <ListSubheader disableSticky>
                {" "}
                Choose one option (required){" "}
              </ListSubheader>
            }
          >
            <ListItem
              button onClick={() => {
                ctx.dispatch({
                  type: "MERCHANDISE_SERVICE_SET",
                  payload: "HOME_DELIVERY"
                });
                history.replace({
                  pathname: "/chooseAddress",
                  from: "/orderType"
                });
              }}
            >
              <ListItemText>
                <b>Home Delivery</b>
              </ListItemText>
            </ListItem>

            <ListItem
              button onClick={() => {
                ctx.dispatch({
                  type: "MERCHANDISE_SERVICE_SET",
                  payload: "SELF_PICKUP"
                });
                history.replace("/checkout");
              }}
            >
              <ListItemText>
                <b>Self Pickup</b>
              </ListItemText>
            </ListItem>

          </List>
        </Paper>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
