import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import failed from "../assests/failed.svg"

export default props => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.replace("/cart");
    }, 10000);
  });
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
              <img src={failed} height={150} width={150} alt={"failed"} />
            </Grid>
            <Grid item xs={12}>
              <Typography align={"center"} color={"primary"}>
                {" "}
                {props.match.params.message || "Order can't be placed."}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box m={2}>
                <Button
                  onClick={() => {
                    history.replace("/cart");
                  }}
                  color={"primary"}
                >
                  {" "}
                  Try Again
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CssBaseline>
      </Container>
    </div>
  );
};
