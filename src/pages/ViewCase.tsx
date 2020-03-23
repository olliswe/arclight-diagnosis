import React from 'react';
import {Container, Paper, Typography, Chip, Grid, Divider} from "@material-ui/core";
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import { VideoUploadQueryObject} from "../types";
import {makeStyles} from "@material-ui/core/styles";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {Player} from "video-react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface params {
    id:string
}

type matchWithParams = RouteComponentProps['match'] & {params:params}

type Props = RouteComponentProps & {match:matchWithParams}


const QUERY_CASE = gql`
        query video_upload($id:String){
              video_upload(video_upload_id:$id){
                    id,
                    signed_url,
                    date_recorded,
                    patient{
                      id,
                      full_name,
                      age,
                      dob,
                      facility{
                        facility_name,
                        facility_country
                      }
                    },
                    comment,
                    doctor_status
              }
            }
`;


const useStyles = makeStyles({
    paper: {
        paddingTop:'20px',
        paddingBottom:'40px'
    },
    newChip:{
        backgroundColor:'green',
        color:'white'
    },
    reopenedChip:{
        backgroundColor:'blue',
        color:'white'
    },
    patientRecord:{
        marginTop:'20px',
        marginBottom:'20px'
    },
    videoBackground:{
        backgroundColor:'black',
        borderRadius:'10px'
    },
    videoContainer:{
        width:'40%',
    }

});

const getChipStyle = (status:'NEW' | 'REOPENED' | 'ARCHIVED', classes:ClassNameMap<string> ) => {
    if (status === 'NEW') {
        return classes.newChip
    } else if (status==='REOPENED'){
        return classes.reopenedChip
    } else if (status==='ARCHIVED'){
        return classes.archivedChip
    }
}



const ViewCase:React.FC<Props> = (props) => {

    const {data} = useQuery<VideoUploadQueryObject>(QUERY_CASE, {
        variables:{id:props.match.params.id}
    })

    const classes = useStyles();





    return (
        <Container>
            <React.Fragment>
                <Paper className={classes.paper}>
                    {!data ?
                    'Loading...'
                    :
                    <Container>
                        <Grid container justify={'space-between'}>
                            <Typography variant={'h5'}>
                            Case ID: {data.video_upload.id}
                            </Typography>
                            <Chip
                                className={getChipStyle(data.video_upload.doctor_status, classes)}
                                icon={<CreateNewFolderIcon className={getChipStyle(data.video_upload.doctor_status, classes)}/>}
                                label="New"
                            />
                        </Grid>
                        <Grid container spacing={3} className={classes.patientRecord}>
                            <Grid item xs={3}>
                                <strong>Patient ID</strong>
                            </Grid>
                            <Grid item xs={9}>
                                {data.video_upload.patient.id}
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Patient Name</strong>
                            </Grid>
                            <Grid item xs={9}>
                                {data.video_upload.patient.full_name}
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Patient Facility</strong>
                            </Grid>
                            <Grid item xs={9}>
                                {data.video_upload.patient.facility.facility_name} ({data.video_upload.patient.facility.facility_country})
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Patient D.O.B.</strong>
                            </Grid>
                            <Grid item xs={9}>
                                {data.video_upload.patient.dob} ({data.video_upload.patient.age} years)
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Screening Date</strong>
                            </Grid>
                            <Grid item xs={9}>
                                {data.video_upload.date_recorded}
                            </Grid>
                        </Grid>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <strong>Show Video Recording</strong>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container justify={'center'} className={classes.videoBackground}>
                                    <div className={classes.videoContainer}>
                                        <Player src={data.video_upload.signed_url}/>
                                    </div>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Container>
                    }
                <Divider/>
                </Paper>
            </React.Fragment>
        </Container>
    );
};

export default withRouter(ViewCase);
