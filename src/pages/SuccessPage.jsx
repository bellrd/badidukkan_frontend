import React, { useContext, useEffect } from "react";
import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import success from "../assests/success.svg";

export default props => {
  const ctx = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.replace("/");
    }, 4000);
  }, []);
  if (props.match.params.action === "simsim") {
    history.replace("/success");
    ctx.dispatch({ type: "ORDER_PLACED", payload: "" });
  }
  return (
    <div>
      <Container maxWidth={"sm"}>
        <CssBaseline>
          <Grid
            container
            spacing={0}
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <img src={success} height={150} width={150} alt={"success"} />
            </Grid>
            <Grid item xs={12}>
              <Typography align={"center"} color={"primary"}>
                {" "}
                Your order is placed.
              </Typography>
            </Grid>
          </Grid>
        </CssBaseline>
      </Container>
    </div>
  );
};
