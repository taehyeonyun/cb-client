import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginForm from './components/LoginForm';

import './App.scss';

injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <LoginForm/>
        </div>
      </MuiThemeProvider>
    );
  }
}