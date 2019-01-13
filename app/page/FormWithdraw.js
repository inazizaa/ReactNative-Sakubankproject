import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Picker,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ScrollView
} from 'react-native'
import Modal from "react-native-simple-modal";
import { postWithdraw, verifPin } from '../services/Services';
import { Header } from 'react-native-elements';

export default class FormWithdrawal extends Component {

    constructor(props){
        super(props)
        this.state = {
            'wdamount' : '',
            'pin': '',
            'pinconfirm' : ''
        }
    }

    componentWillMount(){
        this.getAccountid()
    }

    getAccountid = async () =>{
        let accountid = await AsyncStorage.getItem('accountid')
        let pin = await AsyncStorage.getItem('pin')
        console.log('form tf akun id' + accountid)
        console.log('pin' + pin)
        this.setState({accountid: accountid})
        this.setState({pin: pin})
    };

    handleInput (value, field) {
        if(field=='wdamount')this.setState({ wdamount: value });
        else if(field=='pin')this.setState({ pin: value });
        else if(field=='pinconfirm')this.setState({ pinconfirm: value });
    }

    handleButton (value, field) {
        if(field=='wdamount'){
            this.setState({ wdamount: value })
            this.openModal()
        }
    }

    handleReferal(){
        let referalcode = Math.floor(100000 + Math.random() * 900000)
        this.setState({referalcode: referalcode})
    }

    signOut = async() => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Login')
    }

    state = { open: false };

    modalDidOpen = () => {
        this.handleReferal()
    console.log('Ask withdrawal');}
    modalDidClose = () => {
        this.setState({ open: false });
        console.log('Close ask');
    };

    openModal = () => this.setState({ open: true });
    closeModal = () => this.setState({ open: false });

    handlePin() {

        console.log('account id handlePin '+this.state.accountid)
        console.log(this.state.pin)
        console.log(this.state.pinconfirm)

        let account = {}
        account.accountid = this.state.accountid,
        account.pin = this.state.pinconfirm

        var url = verifPin()

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((res) => {
            console.log('account id handlePin '+this.state.accountid)
            console.log(this.state.pinconfirm)
            console.log(res.message)
            if(res.message == "Success"){
                this.handleWithdraw()
            }else{
                alert('Pin wrong')
            }
        }).done()
    }

    handleWithdraw(){
        let withdraw = {}
            withdraw.accountid = this.state.accountid,
            withdraw.wdamount = Number.parseInt(this.state.wdamount, 10),
            withdraw.referalcode = this.state.referalcode
            
            var url = postWithdraw();

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(withdraw),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error : ', error))
            .then(response => console.log('Success : ', response))
            this.closeModal()
            this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (
            <View>
            <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>withdraw from your account</Text>
                </View>
                <View style={styles.button}>
                <View >
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(25000, 'wdamount')}><Text style={styles.amount}>25 K</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(50000, 'wdamount')}><Text style={styles.amount}>50 K</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(10000, 'wdamount')}><Text style={styles.amount}>100 K</Text></TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(250000, 'wdamount')}><Text style={styles.amount}>250 K</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(500000, 'wdamount')}><Text style={styles.amount}>500 K</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonrow} onPress={() => this.handleButton(100000, 'wdamount')}><Text style={styles.amount}>1000 K</Text></TouchableOpacity>
                </View>
                </View>
                <View>
                    <Text style={styles.header}>input amount</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Pull amount'
                    keyboardType = 'numeric'
                    onChangeText={(value) => this.handleInput(value, 'wdamount')}
                />
                
                    <TouchableOpacity onPress={this.openModal}>
                        <Text style={styles.saveButtonText}>Pull</Text>
                    </TouchableOpacity>

                
            </View>
            </ScrollView>
            <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={this.modalDidOpen}
                    modalDidClose={this.modalDidClose}
                    style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>
                            Withdrawal Amount
                        </Text>
                        <Text style={{padding: 5, fontWeight: 'bold', fontSize: 25, borderBottomWidth: 1}}>
                            {this.state.wdamount}
                        </Text>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>
                            Referalcode
                        </Text>
                        <Text style={{padding: 5, fontWeight: 'bold', fontSize: 20}}>
                            {this.state.referalcode}
                        </Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Your pin'
                            keyboardType = 'numeric'
                            onChangeText={(value) => this.handleInput(value, 'pinconfirm')}
                        />
                        
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => this.handlePin()}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5 }} onPress={this.closeModal}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonrow: {
        backgroundColor: 'white',
        padding: 50,
        elevation: 1,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#673ab7',
        textAlign: 'center'
    },
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    header: {
        fontSize: 50,
        margin: 10,
    },
    inputContainer: {
        paddingTop: 15
    },
    dropdown: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1
    },
    textInput: {
        borderColor: '#673ab7',
        borderBottomWidth: 2,
        height: 80,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        marginVertical: 10,
        color: '#673ab7'
    },
    textareaInput: {
        borderColor: '#673ab7',
        borderBottomWidth: 1,
        height: 80,
        fontSize: 23,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5
    },
    saveButton: {
        borderColor: '#673ab7',
        borderWidth: 2,
        borderRadius: 20,
        marginRight: 200
    },
    saveButtonText: {
        color: '#673ab7',
        fontSize: 25,
        padding: 30
    }
});