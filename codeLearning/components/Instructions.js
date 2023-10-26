import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker,
    Image
} from 'react-native'
import {
    Icon,
} from 'native-base'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

class Instructions extends Component {
    constructor() {
        super()
        const itemsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
            return (<Picker.Item label={value.toString()} key={index} value={value} />)
        })
        this.state = {
            command: 'step',
            command_value: 1,
            itemsList: itemsList
        }
    }

    updateCommand(itemValue, itemIndex) {
        this.setState({ command: itemValue })
        const steps_qtt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const loop_qtt = [2, 3, 4, 5, 6]
        const rotate_direction = [{ label: 'Derecha', value: 90 }, { label: 'Izquierda', value: -90 }]

        const list = itemValue === "step" ? steps_qtt : itemValue === "loop" ? loop_qtt : rotate_direction

        const itemsList = list.map((value, index) => {
            return (<Picker.Item label={
                itemValue === "step" || itemValue === "loop"
                    ? value.toString()
                    : value.label.toString()
            } key={index} value={
                itemValue === "step" || itemValue === "loop"
                    ? value.toString()
                    : value.value
            } />)
        })
        this.setState({ itemsList })
    }

    render() {
        return (

            <LinearGradient
                colors={['#8693c7', '#10304c', '#10304c', '#8693c7']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={[styles.text, { fontSize: 30, marginTop: 30 }]}>INSTRUCCIONES DE JUEGOS</Text>
                        <View style={styles.row}>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                alignContent: "center",
                                padding: "10%",
                            }}><Text style={styles.text}>¡Este es Richard!</Text></View>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "center"
                            }}>
                                <View
                                    style={styles.player}
                                >
                                    <Image
                                        source={require('../assets/character2.png')}
                                        style={styles.imageSize}
                                    >
                                    </Image>

                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                alignContent: "center",
                                padding: "10%",
                            }}><Text style={styles.text}>¡Este es tu objetivo!</Text></View>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "center"
                            }}>
                                <Animatable.View
                                    animation="pulse"
                                    easing="ease-out"
                                    iterationCount="infinite"
                                    style={styles.target}
                                >
                                </Animatable.View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                alignContent: "center",
                                padding: "10%",
                            }}><Text style={styles.text}>Y esto es... ¡Peligro!</Text></View>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "center"
                            }}>
                                <View
                                    style={styles.player}
                                >
                                    <Image
                                        source={require('../assets/death_mine.png')}
                                        style={styles.imageSize}
                                    >
                                    </Image>

                                </View>
                            </View>
                        </View>
                        <Text style={[styles.text, { margin: 15 }]}>La idea es sencilla, debes llevar a Richard desde el punto de partida hasta
                        tu objetivo, evitando las minas peligrosas que hay en todo el mapa. Para lograr esto, deberás darles instrucciones de cada
                    movimiento que él hará. Él confía en ti, te hará caso.</Text>
                        <Text style={[styles.text, { margin: 15 }]}>Pero... ¿Cómo le darás las instrucciones a Richard? Sencillo,
                    para eso está la <Text style={[styles.text, { fontSize: 17 }]}>BARRA DE COMANDOS</Text>. Y ¿Qué contiene? Pues... </Text>
                        {/* <Text style={styles.text}>En esta barra encontrarás algunas opciones para interactuar, listadas a continuación:</Text> */}
                        <View style={styles.miniContainer}>
                            <View style={styles.microContainer}>
                                <Text style={styles.text}>1. Selección de comando: aquí le puedes indicar a Richard si debe caminar (Paso), cambiar
                                de dirección (Giro) o repetir los comandos (Bucle).
                            </Text>
                            </View>
                            <View style={styles.microContainer}>
                                <Picker
                                    style={styles.text}
                                    selectedValue={this.state.command}
                                    onValueChange={(itemValue, itemIndex) => this.updateCommand(itemValue, itemIndex)}>
                                    <Picker.Item label="Paso" value="step" />
                                    <Picker.Item label="Giro" value="rotate" />
                                    <Picker.Item label="Bucle" value="loop" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.miniContainer}>
                            <View style={styles.microContainer}>
                                <Text style={styles.text}>2. Selección de valor para el comando: Tras decirle a nuestro querido Richard lo que debe
                                hacer, tendrás que ser más específico con la cantidad de casillas (Paso), la dirección exacta (Giro) o cuántas veces deberá hacerlo (Bucle).
                            </Text>
                            </View>
                            <View style={styles.microContainer}>
                                <Picker
                                    style={styles.text}
                                    selectedValue={this.state.command_value}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ command_value: itemValue })
                                    }>
                                    {
                                        this.state.itemsList
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.miniContainer}>
                            <View style={styles.microContainer}>
                                <Text style={styles.text}>3. Una vez seleccionada la acción que quieres ejecutar debes presionar el símbolo:
                            </Text>
                            </View>
                            <View style={styles.microContainer}>
                                <Icon
                                    name="md-add-circle"
                                // onPress={() =>
                                //     this.props.addCommand(
                                //         this.props.appData.steps, {
                                //         command: this.state.command,
                                //         command_value: this.state.command_value
                                //     },
                                //         this.props.appData.activeLoop)
                                // }
                                />
                            </View>
                        </View>

                        <View style={styles.miniContainer}>
                            <View style={styles.microContainer}>
                                <Text style={styles.text}>4. Si deseas revertir el proceso debes presionar el símbolo:
                            </Text>
                            </View>
                            <View style={styles.microContainer}>
                                <Icon
                                    name="md-undo"
                                />
                            </View>
                        </View>
                        <Button
                            buttonStyle={{
                                borderColor: '#C0392B',
                                backgroundColor: '#C0392B',
                                borderWidth: 2,
                                borderRadius: 15,
                                padding: 13,
                                marginBottom: 10,
                                marginTop: 10
                            }}
                            title="REGRESAR"
                            titleStyle={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                                textAlign: 'center',
                            }}
                            disabled={this.state.disableButton}
                            onPress={() => {
                                this.props.navigation.goBack()
                                // this.props.navigation.navigate('LevelScreen')
                                // this.validation.bind(this.state.email + " " + this.state.password)
                            }}
                        />
                    </View>
                </ScrollView >

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        color: "white",
        height: "100%",
        width: "100%"
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    miniContainer: {
        flexDirection: "row",
        color: "white"
    },
    microContainer: {
        width: "40%",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: "8%"
    },
    text: {
        color: "white",
        textAlign: "justify"
    },
    imageSize: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    player: {
        // position: "absolute",
        width: 30,
        height: 30,
        borderRadius: 30,
        zIndex: 999
    },
    target: {
        width: 30,
        height: 30,
        borderRadius: 100 / 2,
        backgroundColor: 'yellow',
        // position: "absolute"
    },
})

export default Instructions;