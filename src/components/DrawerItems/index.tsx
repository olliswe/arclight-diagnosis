import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ReplayIcon from '@material-ui/icons/Replay';
import ArchiveIcon from '@material-ui/icons/Archive';
import {ROUTES} from "../../constants";
import {withRouter, RouteChildrenProps} from 'react-router-dom'

const DrawerItems = (props:RouteChildrenProps) => {
    return (
        <List>
            <ListItem button onClick={()=>{props.history.push(ROUTES.NEW_CASES)}}>
                <ListItemIcon
                    style={props.location.pathname === ROUTES.NEW_CASES ? {color:'#3f51b5'} : {}}
                >
                    <CreateNewFolderIcon />
                </ListItemIcon>
                <ListItemText primary={'New Cases'}
                              style={props.location.pathname === ROUTES.NEW_CASES ? {color:'#3f51b5'} : {}}
                />
            </ListItem>
            <ListItem button onClick={()=>{props.history.push(ROUTES.REOPENED_CASES)}}>
                <ListItemIcon
                    style={props.location.pathname === ROUTES.REOPENED_CASES ? {color:'#3f51b5'} : {}}
                >
                    <ReplayIcon />
                </ListItemIcon>
                <ListItemText primary={'Re-opened Cases'}
                              style={props.location.pathname === ROUTES.REOPENED_CASES ? {color:'#3f51b5'} : {}}
                />
            </ListItem>
            <ListItem button onClick={()=>{props.history.push(ROUTES.ARCHIVED_CASES)}}>
                <ListItemIcon
                    style={props.location.pathname === ROUTES.ARCHIVED_CASES ? {color:'#3f51b5'} : {}}
                >
                    <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Cases'}
                              style={props.location.pathname === ROUTES.ARCHIVED_CASES ? {color:'#3f51b5'} : {}}
                />
            </ListItem>
        </List>
    );
};

export default withRouter(DrawerItems);
