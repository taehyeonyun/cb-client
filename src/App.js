import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppRoutes from './AppRoutes';

import './App.scss';

injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory} routes={AppRoutes}/>
      </MuiThemeProvider>
    );
  }
}