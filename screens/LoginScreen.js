import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import * as axios from 'axios'
import { REQUESTS_URL } from '../constants/index'
import { logIn } from '../redux/actions/main'
import {
    connect
} from 'react-redux'

class LoginScreen extends Component { 
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            disableButton: true,
            loading: false
        };
    }

    validate = async (value, field) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        await this.setState({ [`${field}`]: value })

        console.log(field, value, reg.test(value))
        const email = reg.test(this.state.email)
        const password = !this.state.password || this.state.password === '' ? false : true
        const disable = !email || !password ? true : false

        await this.setState({ disableButton: disable })
    }

    handleLogin = async () => {
        await this.setState({ loading: true })
        console.log('LOGIN')
        axios.post(`${REQUESTS_URL}/login`, {
            userEmail: this.state.email,
            password: this.state.password
        }).then(response => {
            const data = response.data
            this.setState({ loading: false })
            if (data.status === 200) {
                this.props.logIn({ userEmail: this.state.email, uid: data.user_data.uid, userName: data.user_data.userName, userLevel: data.user_data.level })
                this.props.navigation.goBack()
            } else if (data.status === 400) {
                Alert.alert(
                    'Aviso',
                    'El usuario es incorrecto o la contraseña esta errada',
                    // [
                    //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                    //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                    // ],
                    // { cancelable: false }
                )
            }
        }).catch(error => {
            this.setState({ loading: false })
            console.log('error: ', error)
            Alert.alert(
                'Aviso',
                'El usuario es incorrecto o la contraseña esta errada',
                // [
                //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                // ],
                // { cancelable: false }
            )
        })

    }

    render() {
        return (
            <LinearGradient
                colors={['#142553', '#203C87', '#2649A8', '#2649A8']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.containercuatro}>
                        <View style={styles.containerOne}>
                            <Image
                                source={require('../assets/images/icon2.png')}
                                style={styles.imgStyle}
                            >
                            </Image>
                        </View>
                        <View style={styles.containerTwo}>
                            <View style={styles.input}>
                                {/* input */}
                                <Input
                                    inputStyle={{
                                        padding: 10,
                                        color: 'white'
                                    }}
                                    placeholder="CORREO"
                                    placeholderTextColor="white"
                                    onChangeText={(value) => this.validate(value, 'email')}
                                    value={this.state.email}
                                    disabled={this.state.loading}
                                    maxLength={50}
                                />
                            </View>
                            <View style={styles.input}>
                                {/* input */}
                                <Input
                                    inputStyle={{
                                        padding: 10,
                                        color: 'white'
                                    }}
                                    secureTextEntry
                                    placeholder="CONTRASEÑA"
                                    placeholderTextColor="white"
                                    onChangeText={(value) => this.validate(value, 'password')}
                                    value={this.state.password}
                                    autoCapitalize="none"
                                    disabled={this.state.loading}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonContainer}>
                        {
                            this.state.loading
                                ?
                                <View style={[styles.charger, styles.horizontal]}>
                                    <ActivityIndicator size="large" color="#ffffff" />
                                    {/* <ActivityIndicator size="small" color="#00ff00" />
                            <ActivityIndicator size="large" color="#0000ff" />
                            <ActivityIndicator size="small" color="#00ff00" /> */}
                                </View>
                                :
                                <View style={styles.button}>
                                    {/* botones */}
                                    <Button
                                        buttonStyle={{
                                            borderColor: 'transparent',
                                            backgroundColor: '#C0392B',
                                            borderWidth: 2,
                                            borderRadius: 15,
                                            padding: 13
                                        }}
                                        title="INICIAR SESIÓN"
                                        titleStyle={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            textAlign: 'center',
                                        }}
                                        disabled={this.state.disableButton}
                                        onPress={() => {
                                            this.handleLogin()
                                            // this.props.navigation.navigate('LevelScreen')
                                            // this.validation.bind(this.state.email + " " + this.state.password)
                                        }}
                                    />
                                    <Button
                                        buttonStyle={{
                                            padding: 10,
                                            backgroundColor: 'transparent',
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginTop: 10
                                        }}
                                        title="Recuperar contraseña"
                                        titleStyle={{
                                            color: '#FFFFFF',
                                            fontWeight: '300',
                                            fontSize: 15,
                                            textAlign: 'right',
                                            letterSpacing: 0,
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate('RestorePassScreen')
                                        }}
                                    />
                                </View>
                        }
                    </View>
                </View>
            </LinearGradient>

        )
    }
} REQUESTS_URL

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        // backgroundColor: "#258B8B"
    },
    containerOne: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
    },
    containerTwo: {
        flex: 1,
        padding: 5
    },
    containercuatro: {
        flex: 2,
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
    },
    button: {
        flex: 1,
    },
    keyboard: {
        flex: 2,
    },
    imgStyle: {
        width: 150,
        height: 150
    },
    fondo: {
        flex: 1
    },
    // loading  
    charger: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})


const mapStateToProps = state => ({
    appData: state.main
})

const mapDispatchToProps = dispatch => ({
    logIn: (user_data) => dispatch(logIn(user_data)),
    setLevelInitialState: (character_position, target_position, danger_zone) => dispatch(setLevelInitialState(character_position, target_position, danger_zone)),
    restartPlayerSettings: () => dispatch(restartPlayerSettings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
