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
    AsyncStorage
} from 'react-native'
import Modal from "react-native-simple-modal";
import { postTopUp, verifPin } from '../services/Services';
import { Header } from 'react-native-elements';

export default class FormTopUp extends Component {

    constructor(props){
        super(props)
        this.state = {
            'accountid' : '',
            'tamount' : '',
            'pin': '',
            'pinconfirm': '',
        }
    }

    componentWillMount(){
        this.getAccount()
    }

    getAccount = async () =>{
        let accountid = await AsyncStorage.getItem('accountid')
        let pin = await AsyncStorage.getItem('pin')

        console.log('dari getaccount '+accountid)
        console.log('dari getaccount '+pin)
        this.setState({accountid: accountid})
        this.setState({pin: pin})
    };

    handleInput (value, field) {
        if(field=='tamount')this.setState({ tamount: value });
        else if(field=='pinconfirm')this.setState({ pinconfirm: value });
    }

    signOut = async() => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('BottomNavigation')
    }

    state = { open: false };

    modalDidOpen = () => console.log('Ask top up');
    modalDidClose = () => {
        this.setState({ open: false });
        console.log('Close ask');
    };

    openModal = () => this.setState({ open: true });
    closeModal = () => this.setState({ open: false });

    handlePin(){
        console.log("dari handlepin: " + this.state.accountid)
        console.log(this.state.pin)
        var account = {}
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
            console.log(res.message)
            console.log(res.status)
            if(res.message == "Success"){
                this.handleTopup()
            }else{
                alert("Pin wrong")
            }
        }).done()
    }

    handleTopup(){
        let topup = {}
            topup.accountid = this.state.accountid,
            topup.tamount = Number.parseInt(this.state.tamount,10)
            
            var url = postTopUp()

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(topup),
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
            <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.header}>top up account</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Amount top up'
                    keyboardType = 'numeric'
                    onChangeText={(value) => this.handleInput(value, 'tamount')}
                />

                    <TouchableOpacity onPress={this.openModal}>
                        <Text style={styles.saveButtonText}>Top Up</Text>
                    </TouchableOpacity>

            </View>

                <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={this.modalDidOpen}
                    modalDidClose={this.modalDidClose}
                    style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 23, marginBottom: 10 }}>
                            Top up confirmation
                        </Text>
                        <Text style={{padding: 5}}>
                            You will top up the amount of money {this.state.tamount} to your account
                        </Text>
                        {/* <TextInput
                            style={styles.textInput}
                            placeholder='Your pin'
                            keyboardType = 'numeric'
                            onChangeText={(value) => this.handleInput(value, 'pinconfirm')}
                        /> */}

                        <TouchableOpacity style={{ margin: 10 }} onPress={() => this.handleTopup()}>
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
    container: {
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