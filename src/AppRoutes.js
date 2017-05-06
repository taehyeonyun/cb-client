import React from 'react';
import { Route } from 'react-router';

import {
    Home,
    LoginForm
} from './components';

import Auth from './services/Auth';

export default (
    <Route>
        <Route path='/' component={Home}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/logout' onEnter={(nextState, replace, callback) => {
            Auth.logout();
            replace('/login');
            callback();
        }}/>
    </Route>
);