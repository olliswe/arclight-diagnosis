import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Chip,
  Grid,
  Divider,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  CircularProgress,
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import { VideoUploadData, VideoUploadQueryObject } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Player } from "video-react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoctorComment from "../components/DoctorComment";
import CaseRecordData from "../components/CaseRecordData";
import { AlertContext, AlertContextProps } from "../context/alertContext";
import { DoctorCommentData, ScreenerCommentData } from "../types";
import { orderComments } from "../helpers";
import DoctorStatusChip from "../components/DoctorStatusChip";
import LoadingDiv from "../components/LoadingDiv";

interface params {
  id: string;
}

type matchWithParams = RouteComponentProps["match"] & { params: params };

type Props = RouteComponentProps & { match: matchWithParams };

const QUERY_CASE = gql`
  query video_upload($id: String) {
    video_upload(video_upload_id: $id) {
      id
      signed_url
      signed_signature_url
      date_recorded
      patient {
        id
        full_name
        age
        dob
        facility {
          facility_name
          facility_country
        }
      }
      comment
      doctor_status
      doctor_comments {
        comment
        date_added
        physician {
          id
          email
        }
      }
      screener_comments {
        comment
        date_added
        screener {
          email
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  paper: {
    paddingTop: "20px",
    paddingBottom: "40px",
  },
  videoBackground: {
    backgroundColor: "black",
    borderRadius: "10px",
  },
  videoContainer: {
    width: "40%",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const ViewCase: React.FC<Props> = (props) => {
  const [record, setRecord] = useState<VideoUploadData | null>(null);
  const [comments, setComments] = useState<
    (DoctorCommentData | ScreenerCommentData)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const client = useApolloClient();

  let alertContext: AlertContextProps = useContext(AlertContext);
  useEffect(() => {
    client
      .query<VideoUploadQueryObject>({
        query: QUERY_CASE,
        variables: { id: props.match.params.id },
      })
      .then((res) => {
        setComments(
          orderComments(
            res.data.video_upload.doctor_comments,
            res.data.video_upload.screener_comments
          )
        );
        setRecord(res.data.video_upload);
      });
    return () => {
      alertContext.dispatch({ type: "removeAlert" });
    };
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <React.Fragment>
        <Paper className={classes.paper}>
          {!record ? (
            <LoadingDiv height={"65vh"} />
          ) : (
            <Container>
              <Grid container justify={"space-between"}>
                <Typography variant={"h5"}>Case ID: {record.id}</Typography>
                {loading ? (
                  <Chip
                    label="Loading..."
                    icon={<CircularProgress size={15} />}
                  />
                ) : (
                  <DoctorStatusChip status={record.doctor_status} />
                )}
              </Grid>
              <CaseRecordData {...record} />
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <strong>Show Video Recording</strong>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid
                    container
                    justify={"center"}
                    className={classes.videoBackground}
                  >
                    <div className={classes.videoContainer}>
                      <Player src={record.signed_url} />
                    </div>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <strong>Show Patient Approval Signature</strong>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container justify={"center"}>
                    <img
                      src={record.signed_signature_url}
                      style={{ maxWidth: "100%" }}
                    />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Divider className={classes.divider} />
              <DoctorComment
                comments={comments}
                setComments={setComments}
                loading={loading}
                setLoading={setLoading}
                videoUploadId={record.id}
                setRecord={setRecord}
              />
            </Container>
          )}
        </Paper>
      </React.Fragment>
    </Container>
  );
};

export default withRouter(ViewCase);
