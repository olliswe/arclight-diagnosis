import React from "react";
import { CircularProgress } from "@material-ui/core";

interface Props {
  height: string;
}

const LoadingDiv: React.FC<Props> = ({ height }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: height,
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingDiv;
