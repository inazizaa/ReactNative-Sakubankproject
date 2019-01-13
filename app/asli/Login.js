import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux'
import { loginCustomer } from './actions'

class Login extends Component {

    constructor(){
        super()
        this.state = {
                username: '',
                password: ''
        }
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.values)
    //     if(nextProps.error == 'Success'){
            
    //     }
    // }

    _onLoginPressed(){
        // console.log(`Username ${this.state.username} and Password ${this.state.password}`)
        const {username, password} = this.state
        this.props.loginCustomer({username, password})
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/musulton.jpg')}
                    />
                    <Text style={styles.title}>S A K U</Text>
                </View>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='username'
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                />

                <Text>{this.props.error}</Text>

                <TouchableOpacity style={styles.button} onPress={this._onLoginPressed.bind(this)}>
                    <Text style={styles.textButton} >Login</Text>
                </TouchableOpacity>
                    <View style={styles.regisContainer}>
                        <Text style={styles.regisText}>Masa depanmu tergantung pada tabunganmu</Text>
                    </View>
                </View>
                </KeyboardAvoidingView>

                <View style={styles.infoContainer}>
                    <Text>Simple bank digital from group 2</Text>
                    <Text style={{fontWeight: 'bold'}}>Agung, Anwar, Denis, Inas, Sulton</Text>
                </View>

                <View style={styles.regisContainer}>
                    <Text style={styles.regisText} onPress={() => this.props.navigation.navigate('Register')}>Don't have an account?</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        values: state.auth.values
    }
}

export default connect(mapStateToProps, {loginCustomer})(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        backgroundColor: 'blue',
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
        borderTopWidth: 1
    },
    infoContainer: {
        alignItems: 'center',
        paddingVertical: 25
    },
    regisText: {
        fontWeight: '400',
        color: 'black'
    }
});
