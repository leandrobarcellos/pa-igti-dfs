import React, {ReactNode, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DrawerItem from "./drawer-item";
import AppToolBar from "./app-tool-bar";
import {SessionUtil} from "../core/session.util";

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
    children?: ReactNode,
    isLoggedIn?: boolean
}

function AppDrawer(props: AppDrawerProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    useEffect(() => {

    }, [props.isLoggedIn]);
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

    const drawerItemCatequistas = () => {
        if (SessionUtil.isAdmin() || SessionUtil.isCatequista())
            return (<DrawerItem pKey="catequistas" route="/catequistas" text="Catequistas">
                <SupervisorAccountIcon/>
            </DrawerItem>);
        return (<></>);
    }

    const drawerItemResponsaveis = () => {
        return (<DrawerItem pKey="responsaveis" route="/responsaveis" text="Responsáveis">
            <PersonAddIcon/>
        </DrawerItem>);
    }

    const drawerItemTurmas = () => {
        console.log("drawerItemTurmas", SessionUtil.getUser());
        if (SessionUtil.isAdmin() || SessionUtil.isCatequista())
            return (<DrawerItem pKey="turmas" route="/turmas" text="Turmas">
                <GroupAddIcon/>
            </DrawerItem>);
        return (<></>);
    }

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })} role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List>
                {drawerItemCatequistas()}
                {drawerItemResponsaveis()}
                <DrawerItem pKey="catequizandos" route="/catequizandos" text="Catequizandos">
                    <PersonAddIcon/>
                </DrawerItem>
                {drawerItemTurmas()}
            </List>
        </div>
    );

    if (!props.isLoggedIn)
        return (<></>);
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
