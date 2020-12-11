import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicOnlyRoute({ component, ...props }) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                auth
                    ? <Redirect to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    )
}