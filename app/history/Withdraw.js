import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, AsyncStorage} from 'react-native'
import {Text} from 'native-base';
import {Card} from 'react-native-elements'
import { getWithdraw } from '../services/Services';

export default class Withdrawal extends Component {

    constructor (props) {
        super(props)
        this.state = {
            'accountid': '',
            withdraws: []
        }
    }

    componentWillMount() {
        this.getAccount()
    }

    getAccount = async () =>{
        const accountid = await AsyncStorage.getItem('accountid')
        console.log('dari getaccount ' + accountid)
        this.setState({accountid: accountid})
        this.handleWithdraw()
    };

    handleWithdraw(){
        let withdraw = {}
        withdraw.accountid = this.state.accountid

        var url = getWithdraw();

        fetch(url,
        {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(withdraw), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then((res) => {
                this.setState({withdraws: res.values})
            }).done()
    }

    render() {
        return (
            <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.withdraws.map((item, index) => (
                                <View style={styles.container} key={index}>
                                    <Card >
                                        <Text style={styles.title}>
                                            Rp. {item.wdamount}
                                        </Text>
                                        <Text style={styles.desc}>
                                            Id withdraw {item.idwd}, withdraw on {item.wddate} referal code {item.referalcode}
                                        </Text>
                                    </Card>
                                </View>
                            ))
                        }
                    </ScrollView>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1'
    },
    title: {
      margin: 5,
      marginHorizontal: 30,
      fontSize: 35,
      fontWeight: '700',
      textAlign: 'left',
      color: '#34495e',
    },
    desc: {
        paddingVertical: 5,
        margin: 5,
        marginHorizontal: 30,
        fontSize: 15,
        textAlign: 'left',
        color: '#34495e',
      },
  });