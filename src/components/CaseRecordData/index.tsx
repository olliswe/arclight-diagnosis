import React from "react";
import { Container, Grid } from "@material-ui/core";
import { VideoUploadData } from "../../types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  patientRecord: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const CaseRecordData: React.FC<VideoUploadData> = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.patientRecord}>
      <Grid item xs={3}>
        <strong>Patient ID</strong>
      </Grid>
      <Grid item xs={9}>
        {props.patient.id}
      </Grid>
      <Grid item xs={3}>
        <strong>Patient Name</strong>
      </Grid>
      <Grid item xs={9}>
        {props.patient.full_name}
      </Grid>
      <Grid item xs={3}>
        <strong>Patient Facility</strong>
      </Grid>
      <Grid item xs={9}>
        {props.patient.facility.facility_name} (
        {props.patient.facility.facility_country})
      </Grid>
      <Grid item xs={3}>
        <strong>Patient D.O.B.</strong>
      </Grid>
      <Grid item xs={9}>
        {props.patient.dob} ({props.patient.age} years)
      </Grid>
      <Grid item xs={3}>
        <strong>Screening Date</strong>
      </Grid>
      <Grid item xs={9}>
        {props.date_recorded}
      </Grid>
      <Grid item xs={3}>
        <strong>Initial Comment</strong>
      </Grid>
      <Grid item xs={9}>
        {props.comment}
      </Grid>
    </Grid>
  );
};

export default CaseRecordData;
