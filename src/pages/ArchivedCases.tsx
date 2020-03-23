import React from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import ArchivedCasesTable from "../components/ArchivedCasesTable";


const useStyles = makeStyles({
    container: {
        marginTop:'2%'
    },
});



const ArchivedCases:React.FC = () => {


    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <ArchivedCasesTable/>
        </Container>
    );
};

export default ArchivedCases;
