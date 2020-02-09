import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";

export default props => {
  const ctx = useContext(GlobalContext);
  const history = useHistory();
  const payload = props.location.payload;
  useEffect(() => {
    setTimeout(() => {
      document.paytm.submit();
    }, 1000);
  }, []);

  if (ctx.state.accessToken == null) {
    return history.replace({ pathname: "/login", next: "/cart" });
  }

  if (props.location.payload == null) {
    alert("Only meant for online payment.");
    history.replace("/cart");
    return null;
  }
  return (
    <React.Fragment>
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
              <Grid item xs={3}>
                <Loader type={"Watch"} height={80} />
              </Grid>
            </Grid>
          </CssBaseline>
        </Container>
      </div>
      <Container maxWidth={"sm"}>
        <form
          action={"https://securegw-stage.paytm.in/order/process"}
          name={"paytm"}
          id={"paytm"}
        >
          <input type={"hidden"} name={"MID"} value={payload.MID} />
          <input type={"hidden"} name={"ORDER_ID"} value={payload.ORDER_ID} />
          <input
            type={"hidden"}
            name={"CHANNEL_ID"}
            value={payload.CHANNEL_ID}
          />
          <input type={"hidden"} name={"CUST_ID"} value={payload.CUST_ID} />
          <input
            type={"hidden"}
            name={"TXN_AMOUNT"}
            value={payload.TXN_AMOUNT}
          />
          <input
            type={"hidden"}
            name={"INDUSTRY_TYPE_ID"}
            value={payload.INDUSTRY_TYPE_ID}
          />
          <input type={"hidden"} name={"WEBSITE"} value={payload.WEBSITE} />
          <input
            type={"hidden"}
            name={"CALLBACK_URL"}
            value={payload.CALLBACK_URL}
          />
          <input
            type={"hidden"}
            name={"CHECKSUMHASH"}
            value={payload.CHECKSUMHASH}
          />
          <button type={"submit"}>Submit</button>
        </form>
      </Container>
    </React.Fragment>
  );
};
