import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FaceIcon from '@material-ui/icons/Face';
import DrawerItem from "./drawer-item";
import AppToolBar from "./app-tool-bar";

const ANCHOR = "left";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

type Anchor = typeof ANCHOR;

interface AppDrawerProps {
    children?: ReactNode
}

function AppDrawer(props: AppDrawerProps) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({...state, [ANCHOR]: open});
    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })} role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List>
                <DrawerItem pKey="catequistas" route="/catequistas" text="Catequistas">
                    <SupervisorAccountIcon/>
                </DrawerItem>
                <DrawerItem pKey="catequizandos" route="/catequizandos" text="Catequisandos">
                    <PersonAddIcon/>
                </DrawerItem>
                <DrawerItem pKey="turmas" route="/turmas" text="Turmas">
                    <GroupAddIcon/>
                </DrawerItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppToolBar menuAction={toggleDrawer(true)}/>
            <React.Fragment key="left">
                <SwipeableDrawer
                    anchor={ANCHOR}
                    open={state[ANCHOR]}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                    {list(ANCHOR)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default AppDrawer;
