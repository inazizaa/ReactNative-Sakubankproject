import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, AsyncStorage} from 'react-native'
import {Text} from 'native-base';
import {Card} from 'react-native-elements'
import { getTopUp } from '../services/Services';

export default class TopUp extends Component {

    constructor (props) {
        super(props)
    }

    state = {
        topups: []
    }

    componentWillMount(){
        this.getAccount()
    }

    getAccount = async () =>{
        const accountid = await AsyncStorage.getItem('accountid')
        console.log('dari getaccount '+accountid)
        this.handleTopUp(accountid)
    };

    handleTopUp = (accountid) => {
        console.log('dari handel top' + accountid)
        let topup = {}
        topup.accountid = accountid

        var url = getTopUp()

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(topup), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then((res) => {
                this.setState({topups: res.values})
            }).done()
    }

    render() {
        return (
            <View style={styles.container}>
                   <ScrollView>
                        {
                            this.state.topups.map((item, index) => (
                                <View style={styles.container} key={index}>
                                    <Card key={item.idtopup}>
                                    <Text style={styles.title}>
                                        Rp. {item.tamount}
                                    </Text>
                                    <Text style={styles.desc}>
                                        Id topup {item.idtopup}, topup on {item.tdate}
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
  