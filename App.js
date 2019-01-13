import React, {Component} from 'react';
import RootNavigation from './app/component/RootNavigator';
import BottomNavigation from './app/component/BottomNavigation';
import Profile from './app/page/Dashboard';
import Login from './app/page/Login';

export default class App extends Component {
  render() {
    return (
        <RootNavigation />
    );
  }
}