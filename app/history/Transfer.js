import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, AsyncStorage} from 'react-native'
import {Text} from 'native-base';
import {Card} from 'react-native-elements'
import { getTransfer } from '../services/Services';

export default class Transfer extends Component {

    constructor (props) {
        super(props)
        this.state = {
            transactions: []
        }
    }

    componentWillMount() {
        this.getAccount()
    }

    getAccount = async () =>{
        const accountid = await AsyncStorage.getItem('accountid')
        console.log('dari getaccount '+accountid)
        this.handleTransfer(accountid)
    };

    handleTransfer = (accountid) => {
        let transaction = {}
        transaction.accountid = accountid

        var url = getTransfer();

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(transaction), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then((res) => {
                this.setState({transactions: res.values})
            }).done()
    }

    render() {
        return (
            <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.transactions.map((item, index) => (
                                <View style={styles.container} key={index}>
                                    <Card >
                                        <Text style={styles.title}>
                                            Rp. {item.tramount}
                                        </Text>
                                        <Text style={styles.desc}>
                                            Id transaction {item.idtrans}, transaction on {item.trdate}
                                            Sent to {item.accountdest} {item.bankdest}, for {item.trdesc}
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