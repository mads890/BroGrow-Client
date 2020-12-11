import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...props }) {
    const Component = component
    return(
        <Route
            {...props}
            render={componentProps => (
                auth
                    ? <Component {...componentProps} />
                    : <Redirect to={{ pathname: '/login', state: { from: componentProps.location }}} />
            )}
        />
    )
}