import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

export default class History extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTouch}>
                    <View style={styles.containerTouchLeft}>
                        <TouchableOpacity style={styles.containerTouch1} onPress={() => this.props.navigation.navigate('HTopUp')}>
                            <View style={styles.icon}>
                                <Image style={styles.imageIcon1} source={require('../../assets/transfer2.png')}/>
                            </View>
                            <View style={styles.textIcon}>
                                <Text style={styles.myTextStyle}>Transfer</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.containerTouch2} onPress={() => this.props.navigation.navigate('HWithdraw')}>
                            <View style={styles.icon}>
                                <Image style={styles.imageIcon2} source={require('../../assets/balance.png')}/>
                                </View>
                            <View style={styles.textIcon}>
                                <Text style={styles.myTextStyle}>Top Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTouchRight}>
                        <TouchableOpacity style={styles.containerTouch4} onPress={() => this.props.navigation.navigate('HTransfer')}>
                            <View style={styles.icon}>
                                <Image style={styles.imageIcon3} source={require('../../assets/withdraw2.png')}/>
                            </View>
                            <View style={styles.textIcon}>
                                <Text style={styles.myTextStyle}>Withdraw</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerTouch5} onPress={() => this.props.navigation.navigate('HReception')}>
                            <View style={styles.icon}>
                                <Image style={styles.imageIcon4} source={require('../../assets/history.png')}/>
                            </View>
                            <View style={styles.textIcon}>
                                <Text style={styles.myTextStyle}>History</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userInfoText: {
        color: 'black',
        fontSize: 45,
        fontWeight: 'bold'
    },
    containerTouch: {
        flex: 3,
        flexDirection: 'row',
    },
    containerTouchLeft : {
        flex: 2,
        flexDirection: 'column',
    },
    containerTouchRight : {
        flex: 2,
        flexDirection: 'column',
    },
    containerTouch1: {
        flex: 1,
        backgroundColor: '#FF5722',
    },
    containerTouch2: {
        flex: 1,
        backgroundColor: '#FFC107',
    },
    containerTouch3: {
        flex: 1,
        backgroundColor: '#673AB7',
    },
    containerTouch4: {
        flex: 1,
        backgroundColor: '#E91E63',
    },
    containerTouch5: {
        flex: 1,
        backgroundColor: '#CDDC39',
    },
    icon: {
        flex: 3,
        alignItems:'center',
        justifyContent:'center',
    },
    imageIcon1: {
        width:100,
        height:100,
        backgroundColor:'#dbff76',
        borderRadius:100,
    },
    imageIcon2: {
        width:100,
        height:100,
        backgroundColor:'green',
        borderRadius:100,
    },
    imageIcon3: {
        width:100,
        height:100,
        backgroundColor:'white',
        borderRadius:100,
    },
    imageIcon4: {
        width:100,
        height:100,
        backgroundColor:'red',
        borderRadius:100,
    },
    textIcon: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    myTextStyle: {
        color: 'black',
        fontSize: 15,
        // fontWeight: 'bold'
    }
});
