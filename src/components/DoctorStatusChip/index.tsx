import React from "react";
import { Chip } from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import ReplayIcon from "@material-ui/icons/Replay";
import ArchiveIcon from "@material-ui/icons/Archive";

const getChipStyle = (
  status: "NEW" | "REOPENED" | "ARCHIVED",
  classes: ClassNameMap<string>
) => {
  if (status === "NEW") {
    return classes.newChip;
  } else if (status === "REOPENED") {
    return classes.reopenedChip;
  } else if (status === "ARCHIVED") {
    return classes.archivedChip;
  }
};

const getLabel = (status: "NEW" | "REOPENED" | "ARCHIVED") => {
  if (status === "NEW") {
    return "New";
  } else if (status === "REOPENED") {
    return "Reopened";
  } else if (status === "ARCHIVED") {
    return "Archived";
  }
};

const useStyles = makeStyles({
  newChip: {
    backgroundColor: "green",
    color: "white",
  },
  reopenedChip: {
    backgroundColor: "blue",
    color: "white",
  },
  archivedChip: {
    backgroundColor: "gray",
    color: "white",
  },
});

const getIcon = (
  status: "NEW" | "REOPENED" | "ARCHIVED",
  classes: ClassNameMap<string>
) => {
  if (status === "NEW") {
    return <CreateNewFolderIcon className={getChipStyle(status, classes)} />;
  } else if (status === "REOPENED") {
    return <ReplayIcon className={getChipStyle(status, classes)} />;
  } else if (status === "ARCHIVED") {
    return <ArchiveIcon className={getChipStyle(status, classes)} />;
  }
};

interface Props {
  status: "NEW" | "ARCHIVED" | "REOPENED";
}

const DoctorStatusChip: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Chip
      className={getChipStyle(props.status, classes)}
      icon={getIcon(props.status, classes)}
      label={getLabel(props.status)}
    />
  );
};

export default DoctorStatusChip;
