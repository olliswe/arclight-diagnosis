import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ScreenerCommentData } from "../../types";

const useStyles = makeStyles({
  paper: {
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    width: "80%",
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
});

interface Props {
  comment: ScreenerCommentData;
}

const ScreenerCommentDisplay: React.FC<Props> = ({ comment }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.header}>
        <strong>
          Comment by <i>{comment.screener.email}</i>, submitted on{" "}
          {comment.date_added.slice(0, 10)}
        </strong>
      </div>
      <div>
        {comment.comment.split("\n").map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
      </div>
    </Paper>
  );
};

export default ScreenerCommentDisplay;
