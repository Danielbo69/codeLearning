import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Input, Button, TextInput } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import * as axios from 'axios'
import { REQUESTS_URL } from '../constants/index'


class RegisterScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userName: '',
            confirmPass: '',
            disableButton: true,
            // validated: false,
            hidden: true,
            showAlert: false,
            loading: false
        }
    };

    validate = async (value, field) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        await this.setState({ [`${field}`]: value })

        console.log(field, value, reg.test(value))
        const email = reg.test(this.state.email)
        const password = !this.state.password || this.state.password === '' || this.state.password !== this.state.confirmPass ? false : true
        const disable = !email || !password ? true : false

        await this.setState({ disableButton: disable })
    }

    register = async () => {
        await this.setState({ loading: true })
        axios.post(`${REQUESTS_URL}/register`, {
            userName: this.state.userName,
            userEmail: this.state.email,
            password: this.state.password
        }).then(response => {
            const data = response.data
            this.setState({ loading: false })
            if (data.status === 200) {
                Alert.alert(
                    'Aviso',
                    'Se ha registrado con exito!',
                    // [
                    //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                    //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                    // ],
                    // { cancelable: false }
                )
                this.props.navigation.goBack()
            } else if (data.status === 400) {
                Alert.alert(
                    'Aviso',
                    'El correo ya existe.',
                    // [
                    //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                    //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                    // ],
                    // { cancelable: false }
                )
            }
        }).catch(error => {
            console.log('error: ', error)

            Alert.alert(
                'Aviso',
                'Hay error de conexión',
                // [
                //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                // ],
                // { cancelable: false }
            )
        })
    }

    onInputLabelPressed = () => {
        this.setState({ hidden: !this.state.hidden });
    };

    render() {
        const { showAlert } = this.state;
        return (
            <LinearGradient
                colors={['#2649A8', '#2649A8', '#203C87', '#142553']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.containerOne}>
                        <Image
                            source={require('../assets/images/icon2.png')}
                            style={styles.imgStyle}
                        >
                        </Image>
                    </View>
                    <View style={styles.containerTwo}>
                        <Text style={styles.tittle}>REGISTRO</Text>
                        <View style={styles.containerInput}>
                            <Input
                                inputStyle={{
                                    paddingTop: 20,
                                    paddingLeft: 10,
                                    paddingBottom: 5,
                                    color: 'white'
                                }}
                                // inputContainerStyle={{
                                //     padding: 5,
                                //     margin: 10,
                                //     height: 50,
                                //     borderRadius: 20,
                                //     backgroundColor: 'rgba(192, 192, 192,0.1)',
                                //     borderBottomWidth: 0,
                                //     borderColor: "rgba(192, 192, 192,0.1)",
                                // }}
                                onChangeText={(value) => this.validate(value, 'userName')}
                                placeholder="NOMBRE Y APELLIDO"
                                maxLength={50}
                                disabled={this.state.loading}
                            />
                            <Input
                                inputStyle={{
                                    paddingTop: 20,
                                    paddingLeft: 10,
                                    paddingBottom: 5,
                                    color: 'white'
                                }}
                                // inputContainerStyle={{
                                //     padding: 5,
                                //     margin: 10,
                                //     height: 50,
                                //     borderRadius: 20,
                                //     backgroundColor: 'rgba(192, 192, 192,0.1)',
                                //     borderBottomWidth: 0,
                                //     borderColor: "rgba(192, 192, 192,0.1)",
                                // }}
                                onChangeText={(value) => this.validate(value, 'email')}
                                placeholder="CORREO"
                                value={this.state.email}
                                maxLength={50}
                                disabled={this.state.loading}
                            />

                            <Input
                                inputStyle={{
                                    paddingTop: 20,
                                    paddingLeft: 10,
                                    paddingBottom: 5,
                                    color: 'white'
                                }}
                                // inputContainerStyle={{
                                //     padding: 5,
                                //     margin: 10,
                                //     height: 50,
                                //     borderRadius: 20,
                                //     backgroundColor: 'rgba(192, 192, 192,0.1)',
                                //     borderBottomWidth: 0,
                                //     borderColor: "rgba(192, 192, 192,0.1)",
                                // }}
                                placeholder="CONTRASEÑA"
                                onChangeText={(value) => this.validate(value, 'password')}
                                value={this.state.password}
                                maxLength={20}
                                secureTextEntry={this.state.hidden}
                                {...this.props}
                                autoCapitalize='none'
                                disabled={this.state.loading}
                            />

                            <Input
                                inputStyle={{
                                    paddingTop: 20,
                                    paddingLeft: 10,
                                    paddingBottom: 5,
                                    color: 'white'
                                }}
                                // inputContainerStyle={{
                                //     padding: 5,
                                //     margin: 10,
                                //     height: 50,
                                //     borderRadius: 20,
                                //     backgroundColor: 'rgba(192, 192, 192,0.1)',
                                //     borderBottomWidth: 0,
                                //     borderColor: "rgba(192, 192, 192,0.1)",
                                // }}
                                placeholder="CONFIRMAR CONTRASEÑA"
                                onChangeText={(value) => this.validate(value, 'confirmPass')}
                                value={this.state.confirmPass}
                                maxLength={20}
                                secureTextEntry={this.state.hidden}
                                {...this.props}
                                autoCapitalize='none'
                                disabled={this.state.loading}

                            />
                            <TouchableOpacity onPress={this.onInputLabelPressed}>
                                <Text style={{ color: 'white', marginTop: 15, marginBottom: 10 }}>
                                    {this.state.hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}
                                </Text>
                            </TouchableOpacity>


                            <View style={styles.buttonContainer}>
                                {
                                    this.state.loading
                                        ?
                                        <View style={[styles.charger]}>
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
                                                    borderColor: '#FFFFFF',
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 1,
                                                    borderRadius: 15,
                                                    width: 300,
                                                    padding: 13,
                                                    margin: 10
                                                }}
                                                title="CREAR CUENTA"
                                                titleStyle={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: 13,
                                                    textAlign: 'center',
                                                }}
                                                disabled={this.state.disableButton}
                                                onPress={() => {
                                                    this.register()
                                                    // this.props.navigation.navigate('LevelScreen')
                                                    // this.validation.bind(this.state.email + " " + this.state.password)
                                                }}
                                            />
                                        </View>
                                }
                            </View>







                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    containerTwo: {
        flex: 2,
    },
    tittle: {
        color: "#FFFFFF",
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 25,
        fontWeight: "bold"
    },
    containerInput: {
        flex: 1,
        alignItems: "center"
    },
    imgStyle: {
        width: 150,
        height: 150
    },
    // loading  
    charger: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // padding: 10
    }
    // containerButton: {
    //     flex: 1
    // }
})

export default RegisterScreen