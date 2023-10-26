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
import { Button, Icon } from 'react-native-elements'
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
                        <Text style={[styles.text, { fontSize: 30, marginTop: 30 }]}>CONSEJOS DE PROGRAMACIÓN</Text>
                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>1.VARIABLES:</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>
                                Honestamente es preferible que los nombres sean claros y precisos, de esta forma se facilitaría la comprensión y el código será más fácil de comprender a la hora de buscar un error, o si otro programador debe darle mantenimiento.
                            </Text>

                            <Text style={styles.text}>
                                También el respeto de las mayúsculas y minúsculas. Y en algunos lenguajes trate de evitar usar la “ñ” ya que por problema de codificación regional suele haber inconvenientes, en vez de declarar la variable “contraseña” podría usar una llamada “clave”.
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                alignContent: "center",
                                padding: 5,
                            }}><Text style={styles.text}>Forma correcta: </Text></View>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "center",

                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}>
                                <Text style={styles.text}>Variable_1 </Text>

                                <Icon
                                    raised
                                    name='check-circle'
                                    type='font-awesome'
                                    color='#12b51d'
                                // style={{
                                //     backgroundColor: '#f50'
                                // }}
                                />
                            </View>
                        </View>


                        <View style={styles.row}>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                alignContent: "center",
                                padding: 5,
                            }}><Text style={styles.text}>Forma incorrecta: </Text></View>
                            <View style={{
                                width: "50%",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "center",

                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}>
                                <Text style={styles.text}>%$Variable_1 </Text>

                                <Icon
                                    raised
                                    name='times'
                                    type='font-awesome'
                                    color='red'
                                // style={{
                                //     backgroundColor: '#f50'
                                // }}
                                />
                            </View>
                        </View>


                        {/* Comentarios */}
                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>2. COMENTARIOS:</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>
                                Es fundamental comentar ya que facilitaría la compresión a la hora de utilizar algoritmos complejos. Sobre todo si se trabaja en equipo.
                            </Text>

                            <Text style={{
                                color: '#9aa0af',
                                textAlign: "justify",
                                paddingTop: 5,
                            }}>
                            //Es importate comentar el código para no perderse
                            </Text>
                        </View>

                        {/* Documentar el código */}
                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>3. DOCUMENTAR EL CÓDIGO</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>
                                Cuando se trata de proyectos grandes y trabajando entre varias personas, es recomendable tener documentado el código, para su posterior consulta o si en caso que algún integrante ingrese al equipo tenga un camino por donde orientarse.
                            </Text>

                            <Image
                                source={require('../assets/orentation.jpg')}
                                style={{ marginTop: 10 }}
                            >
                            </Image>
                        </View>


                        {/* Alcance de variables */}
                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>4. ALCANCE DE VARIABLES</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>
                                Hay que tener mucho cuidado a la hora de declarar las variables si son de alcance público, privada (no sale de la clase) o si es protegida (puede verse en otra clase únicamente si es heredada). De esta forma le da calidad a su proyecto y evitará problemas en el futuro, tales como que vulneren su sistema
                            </Text>
                        </View>


                        {/* Lea mucho y practique */}
                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>5. LEA MUCHO Y PRACTIQUE</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>

                                Es fundamental para el enriquecimiento personal y profesional leer y estar constantemente actualizado, recuerda que la tecnología avanza y todos los días hay algo nuevo para aprender.
                            </Text>
                            <Image
                                source={require('../assets/leer.png')}
                                style={{ marginTop: 10 }}
                            >
                            </Image>
                        </View>

                        {/* Tenga la mente abierta */}

                        <View style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "flex-end",
                            // alignContent: "center",
                            paddingTop: 10,
                            paddingBottom: 20
                        }}><Text style={styles.text}>6. TENGA LA MENTE ABIERTA</Text></View>

                        <View style={{
                            marginLeft: 20,
                            marginRight: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-start",

                        }}>
                            <Text style={styles.text}>

                                Hay una frase que dice “la cabeza es como paracaídas, si no se abre no funciona” no se encierre en un solo pensamiento por ejemplo el fanatismo del software libre vs software privativo, el cual es un constante debate. Incluso hay algunas implementaciones que combinadas funcionan en forma fantástica. Ningún lenguaje de programación es mejor que otro, utilice el que crea que mejor funcione y se adapte a tus necesidades.
                            </Text>
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
                            title="Regresar"
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
        width: "50%",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: "10%"
    },
    text: {
        color: "white",
        textAlign: "justify",
        paddingTop: 5
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