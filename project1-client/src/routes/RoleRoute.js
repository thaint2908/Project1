import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {getRole} from '../utils/jwtUtils';
import Cookies from 'js-cookie';

const RoleRoute = ({component: Component, role, ...rest}) => {
    const jwtRole = getRole();
    
    return (
        <Route {...rest} render={props => (
            Cookies.get('token') ? (
                jwtRole === role
                    ? <Component {...props}/>
                    : <Redirect to='/'/>
            ) : <Redirect to='/'/>
        )}/>
    );
};

export default RoleRoute;
