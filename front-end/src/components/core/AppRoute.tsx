import React from 'react';
import {Redirect, Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps} from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const AppRoute: React.FC<RouteProps> = ({
                                            isPrivate = false,
                                            component: Component,
                                            ...rest
                                        }) => {

    const token = localStorage.getItem('catequese:token');

    return (
        <ReactDOMRoute
            {...rest}
            render={({location}) => {
                return isPrivate === !!token ? (
                    <Component/>
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/',
                            state: {from: location},
                        }}
                    />
                );
            }}
        />
    );
};

export default AppRoute;