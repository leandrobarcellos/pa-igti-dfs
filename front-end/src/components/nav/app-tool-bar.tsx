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


interface AppToolBarProps extends AppProps {
    menuAction: (e: any) => void;
}

class AppToolBar extends AppComponent<AppToolBarProps> {
    goHome = () => {
        this.props.history.push("/");
    }

    async go(): Promise<any> {
        return await new Promise<any>((resolve, reject) => {
            reject("quero rejeitar!");
        });
    }

    stylesToUse = () => makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                marginBottom: 100
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
        this.go().then(res => console.log(res)).catch(err => console.log(err));
        return (
            <div className={this.classes.root}>
                <AppBar position="static">
                    <Toolbar classes={this.classes.sectionMobile} style={this.justifyContent}>
                        <div style={{display: "flex", verticalAlign: "middle"}}>
                            <IconButton edge="start" className={this.classes.menuButton}
                                        color="inherit" aria-label="menu"
                                        onClick={this.props.menuAction}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={this.classes.title}>
                                e-Catequese
                            </Typography>
                        </div>
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
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withTheme(withRouter(AppToolBar));