import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {getAccount} from '../services/Services'
import { Icon } from 'react-native-elements'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account : [],
            'customernumber': '',
            'name': ''
        }
    }

    componentWillMount(){
        this.getCustomerNum()
    }

    getCustomerNum = async () =>{
        const customernumber = await AsyncStorage.getItem('customernumber');
        const name = await AsyncStorage.getItem('name');
        this.setState({customernumber: customernumber})
        this.setState({name: name})
        this.getAccount();
    };

    signOut(){
      AsyncStorage.clear()
      this.props.navigation.navigate('Login')
    }

    reload(){
      this.getCustomerNum()
    }

    getAccount(){
        let account = {}
        account.custnumb = this.state.customernumber
        var url = getAccount()
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((res) => {
            this.setState({account: res.values[0]})
            AsyncStorage.setItem('accountid', ''+this.state.account.accountid)
            AsyncStorage.setItem('accountnumber', ''+this.state.account.accountnumber)
            AsyncStorage.setItem('pin', ''+this.state.account.pin)
        })
    }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.top}>
            <View>
            <Text style={styles.hello}>Hello</Text>
            <Text style={styles.name}>{this.state.name}</Text>
            </View>
            
              <View style={styles.iconflex}>
              <Icon
              raised
              name='md-refresh'
              type='ionicon'
              color='#f50'
              onPress={() => this.reload()} />
            <Icon
              raised
              name='md-log-out'
              type='ionicon'
              color='#f50'
              onPress={() => this.signOut()} />
              </View>
          </View>
          
          <View style={styles.containerbody}>
          <View style={styles.body}>
          <Text>Your Balance</Text>
          <Text style={styles.balance}>{this.state.account.balance}</Text>
          </View>
          </View>

          <View style={styles.footer}>
                <View style={styles.bodyContent}>
                <Text style={styles.title}>{this.state.account.type}</Text>
                <Text style={styles.desc}>Type account</Text>
                </View>
                <View style={styles.bodyContent}>
                <Text style={styles.title}>{this.state.account.pin}</Text>
                <Text style={styles.desc}>Pin</Text>
                </View>
                <View style={styles.bodyContent}>
                <Text style={styles.title}>{this.state.account.createaccount}</Text>
                <Text style={styles.desc}>Active since</Text>
                </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  iconflex:{
    justifyContent: 'center'
  },
  top: {
    flex: 2,
    paddingTop: 50,
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row'
  },
  containerbody: {
    flex: 1.5
  },
  bodyContent: {
    paddingVertical: 15
  },
  body: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3
  },
  footer: {
    flex: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    paddingLeft: 20,
    paddingTop: 5
  },
  hello: {
    fontSize: 30
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  balance: {
    fontWeight: '700',
    fontSize: 35
  },
  title: {
    fontWeight: '700',
    fontSize: 30
  }

});
 