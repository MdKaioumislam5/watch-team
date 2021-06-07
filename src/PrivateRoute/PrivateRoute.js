import React from 'react';
import { Redirect, Route } from 'react-router';
import UserContext from '../UserContext';
import { useContext } from 'react';

const PrivateRoute = ({children, ...rest}) => {
    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);

    return <>
        <Route
            {...rest}
            render={({ location }) =>
                userLoggedIn.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/profile",
                            state: { from: location }
                        }}
                    />
                )
            }

        />

    </>
}

export default PrivateRoute;