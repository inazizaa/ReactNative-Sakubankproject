import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Picker,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { Header } from 'react-native-elements'
import {createStackNavigator} from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from "react-native-simple-modal";
import { registerCustomer, cekUser } from '../services/Services'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer: {
                // isDateTimePickerVisible: false,
                
                
            },
            gender:  "Male",
            date: "2016-04-25",
            pictures: " "
        }
    }

    handleInput (value, field) {
        if(field=='idcard')this.setState({ idcard: value });
        else if(field=='firstname')this.setState({ firstname: value });
        else if(field=='lastname')this.setState({ lastname: value });
        else if(field=='birthdate')this.setState({ birthdate: value });
        else if(field=='address')this.setState({ address: value });
        else if(field=='phonenumber')this.setState({ phonenumber: value });
        else if(field=='username')this.setState({ username: value });
        else if(field=='password')this.setState({ password: value });
        else if(field=='pictures')this.setState({ pictures: value });
        else if(field=='gender')this.setState({ gender: value });
    }

    state = { open: false };

    modalDidOpen = () => console.log('Ask register');
    modalDidClose = () => {
        this.setState({ open: false });
        console.log('Close ask');
    };

    openModal = () => this.setState({ open: true });
    closeModal = () => this.setState({ open: false });

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({birthdate: date});
        this._hideDateTimePicker();
    };


    validationInput(){
        if((this.state.firstname == null) && (this.state.firstname == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.lastname == null) && (this.state.lastname == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.birthdate == null) && (this.state.birthdate == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.address == null) && (this.state.address == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.idcard == null) && (this.state.idcard == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.phonenumber == null) && (this.state.phonenumber == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.username == null) && (this.state.username == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.password == null) && (this.state.password == undefined)) alert('Form must be fill, cannot empty');
        else if((this.state.gender == null) && (this.state.gender == undefined)) alert('Form must be fill, cannot empty');
        else{
            this.cekUsername()
        }
    }

    cekUsername(){
            let customer = {}
            customer.username = this.state.username
    
            var url = cekUser();
    
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(customer),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then((res) => {
                if(res.status != 0){
                    this.handleSubmit()
                }else{
                    alert("Username sudah ada")
                }
            }).done()
    }


    handleSubmit(){
        console.log(this.state.gender)
        console.log(this.state.firstname)
        let customer = {}
            customer.firstname= this.state.firstname,
            customer.lastname= this.state.lastname,
            customer.birthdate= this.state.birthdate,
            customer.address= this.state.address,
            customer.idcard= this.state.idcard,
            customer.phonenumber= this.state.phonenumber,
            customer.username= this.state.username,
            customer.password= this.state.password,
            customer.gender= this.state.gender

            var url = registerCustomer()

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error : ', error))
            .then(response => console.log('Success : ', response))
            this.openModal()
    }

    render() {
        var radio_props = [
            {label: 'Male', value: "Male" },
            {label: 'Female', value: "Female" },
        ];

        return (
            <View style={styles.container}>
                <ScrollView style={{marginBottom: 10}}>
                    {/* <View>
                        <Text style={styles.header}>Sign up</Text>
                    </View> */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Id card'
                            keyboardType = 'numeric'
                            onChangeText={(value) => this.handleInput(value, 'idcard')}
                            onSubmitEditing={() => this.refs.fname.focus()}
                    
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='First name'
                            onChangeText={(value) => this.handleInput(value, 'firstname')}
                            onSubmitEditing={() => this.refs.lname.focus()}
                            ref={"fname"}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Last name'
                            onChangeText={(value) => this.handleInput(value, 'lastname')}
                            // onSubmitEditing={() => this.refs.bd.focus()}
                            ref={"lname"}
                        />
                        <TouchableOpacity onPress={this._showDateTimePicker} >
                            <Text style={styles.dateInput}>Birthdate</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            onDateChange={(value) => this.handleInput(value, 'birthdate')}
                            onSubmitEditing={() => this.refs.gender.focus()}
                            ref={"bd"}
                        />
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#673AB7'}
                            animation={true}
                            style ={styles.radioButton}
                            buttonSize={20}
                            onSubmitEditing={() => this.refs.address.focus()}
                            ref={"gender"}
                            onPress={(value) => this.handleInput(value, 'gender')}
                        />
                        <TextInput
                            style={styles.textareaInput}
                            placeholder='Address'
                            editable = {true}
                            maxLength = {70}
                            onChangeText={(value) => this.handleInput(value, 'address')}
                            onSubmitEditing={() => this.refs.phone.focus()}
                            ref={"address"}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Phone number'
                            keyboardType = 'numeric'
                            onChangeText={(value) => this.handleInput(value, 'phonenumber')}
                            onSubmitEditing={() => this.refs.username.focus()}
                            ref={"phone"}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Username'
                            onChangeText={(value) => this.handleInput(value, 'username')}
                            onSubmitEditing={() => this.refs.password.focus()}
                            ref={"username"}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(value) => this.handleInput(value, 'password')}
                            ref={"password"}
                        />
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.validationInput()}>
                        <Text style={styles.saveButtonText}>O K E</Text>
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
                            Success
                        </Text>
                        <Text style={{padding: 5}}>
                            Registration success
                        </Text>

                        <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Login now</Text>
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
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingTop: 10
    },
    dropdown: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    radioButton: {
        height: 50,
        fontSize: 25,
        justifyContent: 'space-around',
        paddingLeft: 30,
        marginTop: 10,
        marginRight: 5
    },
    dateInput: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 13,
        color: '#CCCCCC'
    },
    textareaInput: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        height: 80,
        fontSize: 23,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5
    },
    saveButton: {
        backgroundColor: '#673AB7',
        borderRadius: 1,
        padding: 15
    },
    saveButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});