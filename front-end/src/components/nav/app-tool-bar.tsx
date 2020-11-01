import React from "react";
import {createStyles, makeStyles, Theme, withTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import {AppComponent, AppProps, withRouter} from "../core/app-component";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from "@material-ui/icons/Menu";
import {Typography} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


interface AppToolBarProps extends AppProps {
    menuAction: (e: any) => void;
}

class AppToolBar extends AppComponent<AppToolBarProps> {
    goHome = () => {
        this.props.history.push("/home");
    }

    logout = () => {
        localStorage.removeItem("catequese:token");
        sessionStorage.removeItem("catequese:token");
        document.location.reload();
    }

    stylesToUse = () => makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1
            },
            sectionMobile: {
                justifyContent: 'space-between',
            },
        }),
    );
    classes: any;
    justifyContent = {
        display: "flex",
        justifyContent: "space-between"
    }

    constructor(props: AppToolBarProps) {
        super(props);
        this.classes = this.stylesToUse();
    }

    render() {
        return (
            <div className={this.classes.root}>
                <AppBar position="static">
                    <Toolbar classes={this.classes.sectionMobile} style={this.justifyContent}>
                        <Typography className={this.classes.title} variant="h6">
                            <IconButton edge="start" className={this.classes.menuButton}
                                        color="inherit" aria-label="menu"
                                        onClick={this.props.menuAction}>
                                <MenuIcon/>
                            </IconButton>
                            e-Catequese
                        </Typography>
                        <div>
                            <IconButton edge="start"
                                        color="inherit" aria-label="menu">
                                <AccountCircleIcon/>
                            </IconButton>
                            <IconButton edge="start"
                                        color="inherit" aria-label="menu"
                                        onClick={() => this.goHome()}>
                                <HomeIcon/>
                            </IconButton>
                            <IconButton edge="start"
                                        color="inherit" aria-label="menu"
                                        onClick={() => this.logout()}>
                                <ExitToAppIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withTheme(withRouter(AppToolBar));