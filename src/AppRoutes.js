import React from 'react';
import { Route } from 'react-router';

import {
    Home,
    LoginForm
} from './components';

export default (
    <Route>
        <Route path='/' component={Home}/>
        <Route path='/login' component={LoginForm}/>
    </Route>
);