import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Auth from '../services/Auth';

//import Url from './Loginform/Url'

//import Dialog from './Dialog/Dialog'

import { TextField, RaisedButton, MenuItem, DropDownMenu } from 'material-ui';

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
    },

    error: {
        margin: '0 auto',
    }
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            wasFailed: false,
            errorMessage: null,
            protocol: 1,
            address: null,
            url: "http://0.0.0.0"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    componentWillMount() {
        if (Auth.isAuthenticated()) {
            browserHistory.push('/');
        }
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

        if ((this.state.address !== nextState.address) &&
           !(this.state.address && nextState.address))
        {
            return true;
        }


        if (this.state.protocol !== nextState.protocol){
            return true;
        }

        return true;
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

    handleUrlChange = () => {
        let cburl = null;
        if (this.state.protocol === 1) {
            cburl = 'http://';
        } else {
            cburl = 'https://';
        }
        cburl += this.state.address;

        this.setState({
            url: cburl
        }, function () {
                console.log(this.state.url);
            });
    }

    handleAdressChange = (e) => {
        this.setState({ address: e.target.value }, function () {
            this.handleUrlChange();
        });

    }

    handleProtocolChange = (event, index, value) => {
        this.setState({protocol : value}, function () {
            this.handleUrlChange();
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            Auth.login(this.state.username, this.state.password, this.state.url).then((data) => {
                browserHistory.push('/');
            }).catch((err) => {
                console.log("request error:"+err)
                this.setState({ wasFailed: true, errorMessage: 'Wrong Username or Password or Url'});
            });

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
        
        let requireAddress;
        if (this.state.wasFailed && !this.state.address) {
            requireAddress = 'Address is required!';
        }

        let errorMessage;
        if (this.state.wasFailed && this.state.errorMessage) {
            errorMessage = <div style={formStyle.error}>{this.state.errorMessage}</div>;
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

                 <DropDownMenu value={this.state.protocol} onChange={this.handleProtocolChange}>
                    <MenuItem value={1} primaryText="http://" />
                    <MenuItem value={2} primaryText="https://" />
                </DropDownMenu>
        
                <TextField
                    label="url"
                    floatingLabelText="url"
                    floatingLabelFixed={true}
                    errorText={requireAddress}
                    onChange={this.handleAdressChange}
                />

                <RaisedButton
                    style={formStyle.button}
                    type="submit"
                    label="Sign in" 
                    primary={true} 
                />

                {errorMessage}
            </form>
        );
    }
}