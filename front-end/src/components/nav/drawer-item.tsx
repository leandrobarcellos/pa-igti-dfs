import React, {Key} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {AppComponent, AppProps, withRouter} from "../core/app-component";

export interface DrawerItemProps extends AppProps {
    pKey: Key,
    text: string,
    route: string,
}

class DrawerItem extends AppComponent<DrawerItemProps> {

    // eslint-disable-next-line
    constructor(props: DrawerItemProps) {
        super(props);
    }

    render() {
        let route = this.props.route;
        return (
            <ListItem button key={this.props.pKey} onClick={() => this.navigateTo(route)}>
                <ListItemIcon>{this.props.children}</ListItemIcon>
                <ListItemText primary={this.props.text}/>
            </ListItem>
        );
    }

}

export default withRouter(DrawerItem);