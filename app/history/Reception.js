import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, AsyncStorage} from 'react-native'
import {Text} from 'native-base';
import {Card} from 'react-native-elements'
import { getReception, getTransfer } from '../services/Services';

export default class Reception extends Component {

    constructor (props) {
        super(props)
        this.state = {
            inboxs : [],
            'accountid': '',
            'accountdest': '',
            'accountnumber': ''
        }
    }

    componentWillMount() {
        this.getAccount()
    }

    getAccount = async () =>{
        let accountid = await AsyncStorage.getItem('accountid')
        let accountnumber = await AsyncStorage.getItem('accountnumber');
        console.log('dari getaccount '+accountid)
        console.log('dari getaccount number'+accountnumber)
        this.setState({accountid: accountid})
        this.setState({accountnumber: accountnumber})
        this.handleReception()
    };

    // getAccountDest() {
    //     let account = {}
    //     account.custnumb = this.state.customernumber

    //     var url = this.getAccount()

    //     fetch(url, {
    //         method: 'POST', // or 'PUT'
    //         body: JSON.stringify(account), // data can be `string` or {object}!
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //         .then((res) => {
    //             console.log(res.values[0])
    //             console.log(res.values[0].accountnumber)
    //             console.log(res.values[0].account.accountnumber)
    //             this.setState({accountdest: res.values[0].account.accountnumber})
    //         }).done()
    // }

    handleReception() {
        let inbox = {}
        inbox.accountdest = this.state.accountnumber

        var url = getReception()

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(inbox), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then((res) => {
                this.setState({inboxs: res.values})
            }).done()
    }

    render() {
        return (
            <View style={styles.container}>
                   <ScrollView>
                        {
                            this.state.inboxs.map((item, index) => (
                                <View style={styles.container} key={index}>
                                    <Card >
                                    <Text style={styles.title}>
                                        Rp. {item.inboxamount}
                                    </Text>
                                    <Text style={styles.desc}>
                                        Reception Id {item.idinbox}, Reception on {item.inboxdate}
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