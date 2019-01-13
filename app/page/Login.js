import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { loginCustomer } from '../services/Services'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer: [{
                username: '',
                password: ''
        }]
        }
    }

    componentDidMount(){
        this._loadInitialState().done()
    }

    _loadInitialState = async () => {
        const customernumber = await AsyncStorage.getItem('customernumber');
        if(customernumber != null){
            this.props.navigation.navigate('Dashboard')
        }
    }

    login = () => {
        let customer = {}
        customer.username = this.state.username,
        customer.password = this.state.password

        var url = loginCustomer()

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
            
        }).then(res => res.json())
        .then((res) => {
            if(res.message == 'Success'){
                AsyncStorage.setItem('customernumber', ''+res.values.customernumber)
                AsyncStorage.setItem('name', res.values.firstname)
                this.props.navigation.navigate('BottomNavigation')
            }else{
                alert("Wrong username or password")
            }
        }).done()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.jpg')}
                    />
                    <Text style={styles.title}>S A K U</Text>
                </View>
                
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    onSubmitEditing={() => this.refs.password.focus()}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    ref={"password"}
                />

                <TouchableOpacity style={styles.button} onPress={this.login} >
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                    <View style={styles.regisContainer}>
                        <Text style={styles.regisText}>Masa depanmu tergantung tabunganmu</Text>
                    </View>
                </View>
                </KeyboardAvoidingView>
                </View>
                <View style={styles.regisContainer}>
                    <Text style={styles.regisText} onPress={() => this.props.navigation.navigate('Register')}>Don't have an account?</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content:{
        elevation: 10,
        flex: 1,
        margin: 30,
        marginTop: 70,
        backgroundColor: 'white',
        borderRadius: 10
    },
    logoContainer:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    logo:{
        height:120,
        width: 120,
        borderRadius: 100
    },
    title:{
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputContainer:{
        paddingHorizontal: 40
    },
    textInput: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    button: {
        paddingVertical: 20,
        backgroundColor: '#673AB7',
        borderRadius: 3
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    regisContainer: {
        alignItems: 'center',
        paddingVertical: 15,
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
    },
    infoContainer: {
        alignItems: 'center',
        paddingVertical: 25
    },
    regisText: {
        fontWeight: '400',
        color: 'black',
        textAlign: 'center'
    }
});
