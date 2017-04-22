import React, { Component } from 'react';

import { TextField, RaisedButton } from 'material-ui';

const formStyle = {
    input: {
        display: 'block',
        margin: '0 auto'
    },

    button: {
        display: 'block',
        margin: '0 auto',
        width: '88px',
        marginTop: '25px'
    }
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            wasFailed: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.wasFailed !== nextState.wasFailed) {
            return true;
        }

        if ((this.state.username !== nextState.username) &&
           !(this.state.username && nextState.username)) 
        {
            return true;
        }

        if ((this.state.password !== nextState.password) &&
           !(this.state.password && nextState.password))
        {
            return true;
        }

        return false;
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            // TODO: Auth
        } else {
            this.setState({ wasFailed: true });
        }
    }

    render() {
        let requireUsername;
        if (this.state.wasFailed && !this.state.username) {
            requireUsername = 'Username is required!';
        }

        let requirePassword;
        if (this.state.wasFailed && !this.state.password) {
            requirePassword = 'Password is required!';
        }

        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <TextField
                    style={formStyle.input}
                    label="Username"
                    floatingLabelText="Username"
                    floatingLabelFixed={true}
                    errorText={requireUsername}
                    onChange={this.handleUsernameChange}
                />

                <TextField
                    style={formStyle.input}
                    type="password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    errorText={requirePassword}
                    onChange={this.handlePasswordChange}
                />

                <RaisedButton
                    style={formStyle.button}
                    type="submit"
                    label="Sign in" 
                    primary={true} 
                />
            </form>
        );
    }
}