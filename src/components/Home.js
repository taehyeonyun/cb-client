import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Auth from '../services/Auth';

export default class Home extends Component {

    componentWillMount() {
        if (!Auth.isAuthenticated()) {
            browserHistory.push('/login');
        }
    }

    render() {
        return (
            <div>
                <Link to="/logout">Log Out</Link>
                <h1>This is Home!!</h1>
            </div>
            )
    }
}