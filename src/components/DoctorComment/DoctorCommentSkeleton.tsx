import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  paper: {
    borderRadius: 40,
    backgroundColor: "#cfffcf",
    width: "80%",
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
});

const DoctorCommentSkeleton = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.header}>
        <Skeleton animation="wave" />
      </div>
      <div>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    </Paper>
  );
};

export default DoctorCommentSkeleton;
