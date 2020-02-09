import React from "react";
import Loader from "react-loader-spinner";

export default props => {
  return (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader
        type={props.type || "Grid"}
        color="#381040"
        height={props.height || "30"}
        width="100"
      />
    </div>
  );
};
