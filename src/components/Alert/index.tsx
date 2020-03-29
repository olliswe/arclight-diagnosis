import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertContext, AlertContextProps } from "../../context/alertContext";
import MuiAlert from "@material-ui/lab/Alert";

const Alert: React.FC = () => {
  let alertContext = React.useContext<AlertContextProps>(AlertContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log(alertContext.state);

  return (
    <React.Fragment>
      {alertContext.state.message &&
        alertContext.state.type &&
        alertContext.state.horizontal &&
        alertContext.state.vertical && (
          <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: alertContext.state.vertical,
              horizontal: alertContext.state.horizontal,
            }}
          >
            <MuiAlert onClose={handleClose} severity={alertContext.state.type}>
              {alertContext.state.message}
            </MuiAlert>
          </Snackbar>
        )}
    </React.Fragment>
  );
};

export default Alert;
