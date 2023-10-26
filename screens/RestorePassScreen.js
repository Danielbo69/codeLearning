import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, Modal, Alert, TouchableHighlight } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

class RestorePassScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            validated: false,
        }
    };

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
        }
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
                        {/* <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <Text>Se ha enviado con exito el correo de recuperación!</Text>

                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Text>cerrar</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal> */}
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
                                    // leftIcon={
                                    //     <Icon
                                    //         name='user-circle'
                                    //         size={24}
                                    //         color='white'

                                    //     />
                                    // }
                                    inputStyle={{
                                        padding: 10,
                                        color: 'white'
                                    }}
                                    // inputContainerStyle={{
                                    //     padding: 5,
                                    //     height: 50,
                                    //     borderRadius: 20,
                                    //     backgroundColor: '#c3c3c385',
                                    //     borderBottomWidth: 0,
                                    // }}
                                    placeholder="CORREO"
                                    placeholderTextColor="white"
                                    onChangeText={(text) => this.validate(text)}
                                    value={this.state.email}
                                    maxLength={50}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                {/* botones */}
                                <Button
                                    buttonStyle={{
                                        borderColor: '#C0392B',
                                        backgroundColor: '#C0392B',
                                        borderWidth: 2,
                                        borderRadius: 15,
                                        padding: 13
                                    }}
                                    title="ENVIAR"
                                    titleStyle={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 13,
                                        textAlign: 'center',
                                    }}
                                    onPress={this.validate.bind(this)}

                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </LinearGradient>
        )
    }
}
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
        // flex: 1,
        padding: 5
    },
    containercuatro: {
        flex: 1,
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
    }
})

export default RestorePassScreen