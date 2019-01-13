import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Profile from '../page/Dashboard';
import Login from '../page/Login';
import Register from '../page/Register';
import FTopUp from '../page/FormTopUp'
import FWithdraw from '../page/FormWithdraw'
import FTransfer from '../page/FormTransfer'
import BottomNavigation from './BottomNavigation'
import History from '../page/History'
import HTopUp from '../history/TopUp'
import HTransfer from '../history/Transfer'
import HWithdraw from '../history/Withdraw'
import HReception from '../history/Reception'

const RootNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            header: null,
            headerLeft: false
        }
    },
    BottomNavigation: {
        screen: BottomNavigation,
        navigationOptions: {
            title: 'Dashboard',
            header: null
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            headerLeft: false
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
            headerLeft: false
        }
    },
    TopUp: {
        screen: FTopUp,
        navigationOptions: {
            title: 'TopUp',
            headerLeft: false
        }
    },
    Withdraw: {
        screen: FWithdraw,
        navigationOptions: {
            title: 'Withdraw',
            headerLeft: false
        }
    },
    Transfer: {
        screen: FTransfer,
        navigationOptions: {
            title: 'Transfer',
            headerLeft: false
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            title: History,
            headerLeft: false
        }
    },
    HTransfer: {
        screen: HTransfer,
        navigationOptions: {
            title: 'Transfer',
            headerLeft: false
        }
    },
    HTopUp: {
        screen: HTopUp,
        navigationOptions: {
            title: 'TopUp',
            headerLeft: false
        }
    },
    HWithdraw: {
        screen: HWithdraw,
        navigationOptions: {
            title: 'Withdraw',
            headerLeft: false
        }
    },
    HReception: {
        screen: HReception,
        navigationOptions: {
            title: 'Reception',
            headerLeft: false
        }
    },
    
});

const Navigator = createAppContainer(RootNavigator);

export default Navigator;