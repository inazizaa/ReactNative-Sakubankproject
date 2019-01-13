import React, {Component} from 'react'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Transfer from '../history/Transfer'
import Withdraw from '../history/Withdraw'
import TopUp from '../history/TopUp'
import Reception from '../history/Reception'

const AppTabNavigator = createMaterialTopTabNavigator({
    Transfer: {
        screen: Transfer,
        navigationOptions: {
            tabBarLabel: 'Trans',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-home" color={tintColor} size={30} />
            )
        }
    },
    Withdraw: {
        screen: Withdraw,
        navigationOptions: {
            tabBarLabel: 'Pull',
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
    Reception: {
        screen: Reception,
        navigationOptions: {
            tabBarLabel: 'Recept',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-download" color={tintColor} size={30} />
            )
        }
    },
})

const TopNavigation = createAppContainer(AppTabNavigator);

export default TopNavigation