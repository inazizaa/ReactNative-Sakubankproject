import React from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import Modal from 'react-native-simple-modal';
import { verifPin, postTransfer } from '../services/Services';
import { Header } from 'react-native-elements';

export default class FormTransfer extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            customer: {

            },
            'accountid': '',
            'tramount' : '',
            'accountdest' : '',
            'trdesc': '',
            'pinconfirm' : '',
            'pin': ''
        }
    }

    componentWillMount(){
        this.getAccountid()
    }

    signOut = async() => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Login')
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
        if(field=='tramount')this.setState({ tramount: value });
        // else if(field=='bankdest')this.setState({ bankdest: value });
        else if(field=='accountdest')this.setState({ accountdest: value });
        else if(field=='trdesc')this.setState({ trdesc: value });
        else if(field=='pinconfirm')this.setState({ pinconfirm: value });
        else if(field=='pin')this.setState({ pin: value });
    }

    state = { open: false };

    modalDidOpen = () => console.log('Ask transfer');
    modalDidClose = () => {
        this.setState({ open: false });
        console.log('Close ask');
    };

    openModal = () => this.setState({ open: true });
    closeModal = () => this.setState({ open: false });

    handlePin() {
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
            if(res.message == "Success"){
                this.handleTransaction()
            }else{
                alert('Pin wrong')
            }
        }).done()
    }

    handleTransaction(){
        let transaction = {}
            transaction.accountid = this.state.accountid,
            transaction.bankdest = "Saku Bank",
            transaction.tramount = Number.parseInt(this.state.tramount, 10),
            transaction.accountdest = this.state.accountdest,
            transaction.trdesc = this.state.trdesc
            
            var url = postTransfer()

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            if(res.message == "Success"){
                // .then(response => console.log('Success : ', response))
                this.closeModal()
                this.props.navigation.navigate('Dashboard')
            }else{
                alert(res.values)
            }
            // .catch(error => console.error('Error : ', error))
            
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>transfer to another account</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Amount transfer'
                    keyboardType = 'numeric'
                    onChangeText={(value) => this.handleInput(value, 'tramount')}
                    onSubmitEditing={() => this.refs.accountdest.focus()}
                />
                {/* <TextInput
                    style={styles.textInput}
                    placeholder='Bank destination'
                    onChangeText={(value) => this.handleInput(value, 'bankdest')}
                    onSubmitEditing={() => this.refs.amountTf.focus()}
                    ref={"bankdest"}
                /> */}
                <TextInput
                    style={styles.textInput}
                    placeholder='Account destination'
                    keyboardType = 'numeric'
                    onChangeText={(value) => this.handleInput(value, 'accountdest')}
                    onSubmitEditing={() => this.refs.trdesc.focus()}
                    ref={"accountdest"}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Description transfer'
                    editable = {true}
                    maxLength = {70}
                    onChangeText={(value) => this.handleInput(value, 'trdesc')}
                    ref={"trdesc"}
                />
                
                <TouchableOpacity onPress={this.openModal}>
                    <Text style={styles.saveButtonText} >Transfer</Text>
                </TouchableOpacity>

                <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={this.modalDidOpen}
                    modalDidClose={this.modalDidClose}
                    style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 23, marginBottom: 10 }}>
                            Transfer confirmation
                        </Text>
                        <Text style={{padding: 5}}>
                            You will transfer the amount of money {this.state.tramount} to account {this.state.accountdest}
                        </Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Your pin'
                            keyboardType = 'numeric'
                            onChangeText={(value) => this.handleInput(value, 'pinconfirm')}
                        />

                        <TouchableOpacity style={{ margin: 10 }} onPress={() => this.handlePin()}>
                            <Text>Sure</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5 }} onPress={this.closeModal}>
                            <Text>Close confirmation</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                
            </View>
            
        );
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
        height: 60,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
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