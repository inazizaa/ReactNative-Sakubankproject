import React, {Component} from 'react'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
// import Transfer from '../history/Transfer'
// import Withdraw from '../history/Withdraw'
// import TopUp from '../history/TopUp'
// import Reception from '../history/Reception'
import Dashboard from '../page/Dashboard';
import TopUp from '../page/FormTopUp'
import Withdraw from '../page/FormWithdraw'
import Transfer from '../page/FormTransfer'
import History from '../page/History'
import HTopNavigator from '../component/TopNavigation'

const AppTabNavigator = createMaterialBottomTabNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-home" color={tintColor} size={30} />
            )
        }
    },
    Transfer: {
        screen: Transfer,
        navigationOptions: {
            tabBarLabel: 'Transfer',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-log-out" color={tintColor} size={30} />
            )
        }
    },
    TopUp: {
        screen: TopUp,
        navigationOptions: {
            tabBarLabel: 'Top Up',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-log-in" color={tintColor} size={30} />
            )
        }
    },
    Withdraw: {
        screen: Withdraw,
        navigationOptions: {
            tabBarLabel: 'Withdraw',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-download" color={tintColor} size={30} />
            )
        }
    },
    HTopNavigator: {
        screen: HTopNavigator,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-bookmarks" color={tintColor} size={30} />
            )
        }
    },
})

const BottomNavigation = createAppContainer(AppTabNavigator);

export default BottomNavigation