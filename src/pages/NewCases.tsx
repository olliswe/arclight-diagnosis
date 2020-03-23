import React from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import NewCasesTable from "../components/NewCasesTable";


const useStyles = makeStyles({
    container: {
        marginTop:'2%'
    },
});



const NewCases:React.FC = (props) => {


    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <NewCasesTable/>
        </Container>
    );
};

export default NewCases;
