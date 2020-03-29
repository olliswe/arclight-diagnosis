import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { AlertContext, AlertContextProps } from "../../context/alertContext";
import axios from "axios";
import {
  DoctorCommentData,
  ScreenerCommentData,
  VideoUploadData,
} from "../../types";
import { UserContext, UserContextProps } from "../../context/userContext";
import { API_ROUTES, API_URL } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    textAreaContainer: {
      width: "100%",
      marginTop: "15vh",
    },
    textArea: {
      width: "100%",
    },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface Props {
  open: boolean;
  handleClose: () => void;
  setComments: (
    value: React.SetStateAction<(DoctorCommentData | ScreenerCommentData)[]>
  ) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  videoUploadId: number;
  setRecord: React.Dispatch<React.SetStateAction<VideoUploadData | null>>;
}

const ComponentInputModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [comment, setComment] = useState<string>("");

  let alertContext: AlertContextProps = React.useContext(AlertContext);
  let userContext: UserContextProps = React.useContext(UserContext);

  const handleSubmit = () => {
    props.handleClose();
    props.setLoading(true);
    let headers = { Authorization: "Token " + userContext.state.token };
    let body = {
      comment: comment,
      videoupload: props.videoUploadId,
      physician: userContext.state.user?.id,
    };
    axios
      .post(API_URL + API_ROUTES.DOCTOR_COMMENTS, body, { headers: headers })
      .then((res) => {
        props.setComments((comments) => [
          {
            ...res.data,
            type: "doctor",
            physician: { email: userContext.state.user?.email },
          },
          ...comments,
        ]);
        props.setRecord((record) =>
          !!record ? { ...record, doctor_status: "ARCHIVED" } : null
        );
        alertContext.dispatch({
          type: "setAlert",
          payload: {
            message:
              "You comment was added and Case has been marked as Archived",
            type: "success",
            horizontal: "center",
            vertical: "top",
          },
        });
        props.setLoading(false);
      })
      .catch((error) => {
        props.setLoading(false);
        alertContext.dispatch({
          type: "setAlert",
          payload: {
            message: "An error occurred, please try again",
            type: "error",
            horizontal: "center",
            vertical: "top",
          },
        });
      });
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add a Comment
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSubmit}>
            submit
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <div className={classes.textAreaContainer}>
          <TextField
            multiline
            label="Comment"
            rows="20"
            className={classes.textArea}
            placeholder="Please write your comment here. When you are finished, hit Submit!"
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
      </Container>
    </Dialog>
  );
};

export default ComponentInputModal;
