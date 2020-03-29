import React, { useState, Fragment, useContext } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CommentInputModal from "./CommentInputModal";
import DoctorCommentDisplay from "./DoctorCommentDisplay";
import ScreenerCommentDisplay from "./ScreenerCommentDisplay";
import DoctorCommentSkeleton from "./DoctorCommentSkeleton";
import { DoctorCommentData, ScreenerCommentData } from "../../types";
import { AlertContext, AlertContextProps } from "../../context/alertContext";
import { VideoUploadData } from "../../types";

const useStyles = makeStyles({
  button: {},
  margins: {
    marginTop: 20,
    marginBottom: 20,
  },
});

interface Props {
  comments: (DoctorCommentData | ScreenerCommentData)[];
  setComments: (
    value: React.SetStateAction<(DoctorCommentData | ScreenerCommentData)[]>
  ) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  videoUploadId: number;
  setRecord: React.Dispatch<React.SetStateAction<VideoUploadData | null>>;
}

const DoctorComment: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  let alertContext: AlertContextProps = useContext(AlertContext);

  const handleOpen = () => {
    alertContext.dispatch({
      type: "removeAlert",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container justify={"space-between"} className={classes.margins}>
        <Typography variant={"h6"}>Discussion</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          disabled={props.loading}
        >
          {props.loading ? (
            <Fragment>
              <CircularProgress size={15} /> &nbsp; Loading...
            </Fragment>
          ) : (
            "Add Comment"
          )}
        </Button>
      </Grid>
      <CommentInputModal
        open={open}
        handleClose={handleClose}
        loading={props.loading}
        setLoading={props.setLoading}
        setComments={props.setComments}
        videoUploadId={props.videoUploadId}
        setRecord={props.setRecord}
      />
      {props.loading && (
        <Grid container justify={"flex-start"} className={classes.margins}>
          <DoctorCommentSkeleton />
        </Grid>
      )}
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => {
          if (comment.type === "doctor") {
            return (
              <Grid
                container
                justify={"flex-start"}
                className={classes.margins}
              >
                <DoctorCommentDisplay comment={comment} />
              </Grid>
            );
          } else if (comment.type === "screener") {
            return (
              <Grid container justify={"flex-end"} className={classes.margins}>
                <ScreenerCommentDisplay comment={comment} />
              </Grid>
            );
          }
        })
      ) : (
        <Grid className={classes.margins} container>
          No comments have been posted to this case yet.
        </Grid>
      )}
    </div>
  );
};

export default DoctorComment;
