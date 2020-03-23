import React from 'react';
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import {gql} from 'apollo-boost'
import { useQuery } from 'react-apollo';
import {VideoUploadsQueryObject} from "../types";
import {withRouter, RouteComponentProps} from 'react-router-dom'


const useStyles = makeStyles({
    container: {
        marginTop:'5%'
    },
});

const QUERY_UNDIAGNOSED_SCREENINGS= gql`
        query all_video_uploads($doctor_status:String){
          all_video_uploads(doctor_status:$doctor_status){
                id,
                signed_url,
                date_recorded,
                patient{
                  full_name,
                  age,
                  facility{
                    facility_name,
                    facility_country
                  }
                },
            comment
  }
}
`;


const NewCasesTable:React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();



    const { data } = useQuery<VideoUploadsQueryObject>(QUERY_UNDIAGNOSED_SCREENINGS,
        {
                pollInterval: 500,
                variables:{doctor_status:'new'},
        });


    return (
        <Container className={classes.container}>
            {!data ?
                "Loading"
                :
                <MaterialTable
                    columns={[
                        {title: 'Case ID', field: 'id'},
                        {
                            title: 'Facility', field: 'facility',
                            render: rowData => rowData.patient.facility.facility_name
                                + ' (' + rowData.patient.facility.facility_country + ') '
                        },
                        {title: 'Date Recorded', field: 'date_recorded', type: 'numeric'},
                        {title: 'Patient Name', field: 'patientName', render: rowData => rowData.patient.full_name},
                        {title: 'Patient Age', field: 'patientAge', render: rowData => rowData.patient.age + ' years'}
                    ]}
                    data={data.all_video_uploads}
                    title="New Cases"
                    onRowClick={(event, rowData) => {
                        rowData && props.history.push('/case/'+rowData.id)
                    }}
                />
            }
        </Container>
    );
};

export default withRouter(NewCasesTable);
