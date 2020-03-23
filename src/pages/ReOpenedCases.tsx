import React from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import NewCasesTable from "../components/NewCasesTable";
import ReOpenedCasesTable from "../components/ReOpenedCasesTable";


const useStyles = makeStyles({
    container: {
        marginTop:'2%'
    },
});



const ReopenedCases:React.FC = () => {


    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <ReOpenedCasesTable/>
        </Container>
    );
};

export default ReopenedCases;
