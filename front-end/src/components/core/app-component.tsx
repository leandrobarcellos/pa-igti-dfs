import {PureComponent} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Theme} from "@material-ui/core/styles";


export interface AppProps extends RouteComponentProps {
    children?: any
}

export interface AppPageProps extends AppProps {
    theme?: Theme
}

abstract class AppComponent<T extends AppPageProps> extends PureComponent {
    props: T;
    // eslint-disable-next-line
    protected constructor(props: T) {
        super(props);
        this.props = props;
    }

    protected navigateTo(route: string) {
        this.props.history.push(route);
    }
}

abstract class AppPageComponent<T extends AppPageProps> extends AppComponent<T> {
    // eslint-disable-next-line
    protected constructor(props: T) {
        super(props);
    }
}

export {AppComponent, AppPageComponent, withRouter};