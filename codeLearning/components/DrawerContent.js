import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native'
import { Button } from 'react-native-elements'
import {
    Icon
} from 'native-base'
import {
    connect
} from 'react-redux'
import {
    runCommands,
    restartPlayerSettings,
    restartSteps,
    changeButtonsState,
    addCommand,
    newLevel
} from '../redux/actions/main'
import { MonoText } from '../components/MonoText'
import * as axios from 'axios'
import { REQUESTS_URL } from '../constants/index'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

class DrawerContent extends Component {

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    check_forbidden_coords = (character_position, forbidden_coords) => {
        // console.log('character_position: ', character_position.x, character_position.y)
        return forbidden_coords.filter(
            item =>
                (
                    (
                        item.x === (character_position.x + 10)
                        &&
                        item.y === (character_position.y + 110)
                    )
                    ||
                    (
                        character_position.x < 10
                        ||
                        character_position.y < 10
                    )
                )
        )
    }
    check_target_coords = (character_position, target_position) => {
        return character_position.x === target_position.x && character_position.y === target_position.y
    }

    dispathToRunCommands = async () => {
        this.props.closeControlPanel()
        this.props.changeButtonsState(true)
        // this.props.restartPlayerSettings(this.props.appData.character_original_position)

        for (let index = 0; index < this.props.appData.steps.length; index++) {
            await this.sleep(500)

            let loopIterations = 1
            let loopStarts = false
            console.log('index1: ', index)
            if (this.props.appData.steps[index].command === 'loop' || this.props.appData.steps[index].command === 'loop_end') {
                loopIterations = this.props.appData.steps[index].command_value
                loopStarts = index + 1
                index++
            }
            console.log('index2: ', index)
            let startingPoint = index
            let innerLoopControlIndex = index
            console.log('loopIterations: ', loopIterations)
            for (let x = 0; x < loopIterations; x++) {
                console.log('index: ', index, 'startingPoint: ', startingPoint)
                // let inside_loop = true
                console.log(x, 'innerLoopControlIndex: ', innerLoopControlIndex, this.props.appData.steps[innerLoopControlIndex].command)
                if (this.props.appData.steps[innerLoopControlIndex].command === 'rotate') {
                    if(loopIterations > 1){
                        x--
                    }
                    this
                        .props
                        .runCommands(
                            this.props.appData.character_position,
                            this.props.appData.steps[innerLoopControlIndex]
                        )
                    innerLoopControlIndex++
                } else if (this.props.appData.steps[innerLoopControlIndex].command === 'step') {
                    if(loopIterations > 1){
                        x--
                    }
                    const steps_qtt = this.props.appData.steps[innerLoopControlIndex].command_value

                    for (let index2 = 0; index2 < steps_qtt; index2++) {
                        await this.sleep(250)
                        const {
                            appData
                        } = this.props
                        this
                            .props
                            .runCommands(
                                appData.character_position,
                                {
                                    command: 'step',
                                    command_value: 1
                                }
                            )
                        const is_in_forbidden_zone = this.check_forbidden_coords(this.props.appData.character_position, appData.forbidden_coords)

                        if (is_in_forbidden_zone.length > 0) {//pierde

                            Alert.alert(
                                'Aviso',
                                'Has Perdido!, Vuelve a intentarlo.',
                                // [
                                //   {text: 'Ask me later', onPress: () => alert('Ask me later pressed')},
                                //   {text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                                // ],
                                // { cancelable: false }
                            )
                            index = this.props.appData.steps.length
                            this.props.restartPlayerSettings(this.props.appData.character_original_position)
                            this.props.changeButtonsState(false)
                            break
                        }
                        const is_in_target_zone = this.check_target_coords(this.props.appData.character_position, this.props.appData.target_position)
                        if (is_in_target_zone) {//gana
                            Alert.alert(
                                'Aviso',
                                'Has Ganado!, Pasa al siguiente nivel.',
                                [
                                    {
                                        text: 'Ok', onPress: async () => {

                                            index = this.props.appData.steps.length
                                            if (appData.user_data.uid) {
                                                axios.post(`${REQUESTS_URL}/winLevel`, { uid: appData.user_data.uid, level: appData.user_data.userLevel })
                                                let temp = appData.user_data
                                                let level = parseInt(appData.user_data.userLevel) + 1
                                                temp.userLevel = level
                                                console.log('temp: ', temp)
                                                this.props.newLevel(temp)
                                            }

                                            this.props.restartPlayerSettings(this.props.appData.character_original_position)
                                            this.props.restartSteps()
                                            this.props.changeButtonsState(false)
                                            this.props.goBack()
                                        }
                                    },
                                ],
                                // { cancelable: false }

                            )
                            break
                        }
                    }
                    innerLoopControlIndex++
                } else {
                    console.log('startingPoint: ', startingPoint)
                    innerLoopControlIndex++
                    innerLoopControlIndex = (x + 1) < loopIterations ? startingPoint : innerLoopControlIndex
                }
            }
            if (loopIterations > 1) {
                console.log('Going in')
                index = innerLoopControlIndex
            }
        }
        this.props.changeButtonsState(false)
        this.props.restartPlayerSettings(this.props.appData.character_original_position)

    }

    addCommand

    render() {
        const {
            appData
        } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.Containerspace}>
                    <Icon name="play"
                        disabled={appData.activeLoop}
                        onPress={() =>
                            this.dispathToRunCommands()} />
                </View>
                <ScrollView>
                    <View style={styles.ContainerContent}>
                        {
                            appData.steps ? appData.steps.map((step, index) => {
                                return (
                                    <View key={`view_${index}`}
                                        style={{
                                            width: "100%"
                                        }}>
                                        <MonoText key={index}>
                                            {
                                                step.command === 'step'
                                                    ? 'Paso'
                                                    : step.command === 'loop' || step.command === 'loop_end'
                                                        ? 'Bucle'
                                                        : 'Giro'
                                            }:
                                    {
                                                step.command === 'step' || step.command === 'loop' || step.command === 'loop_end'
                                                    ? step.command_value
                                                    : step.command_value === 90
                                                        ? 'Derecha'
                                                        : 'Izquierda'
                                            }
                                        </MonoText>
                                    </View>
                                )
                            }) : null
                        }
                    </View>
                    {
                        appData.activeLoop
                            ? <View style={styles.ContainerContent}>
                                <Button
                                    buttonStyle={{
                                        borderColor: '#C0392B',
                                        backgroundColor: '#C0392B',
                                        borderWidth: 2,
                                        borderRadius: 15,
                                        padding: 13
                                    }}
                                    title="CERRAR BUCLE"
                                    titleStyle={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 13,
                                        textAlign: 'center',
                                    }}
                                    // disabled={this.state.disableButton}
                                    onPress={() => {
                                        this.props.addCommand(
                                            this.props.appData.steps, {
                                            command: 'loop_end',
                                            command_value: 'fin'
                                        },
                                            false)
                                    }}
                                />
                            </View>
                            : null
                    }

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#203C87"
    },
    Containerspace: {
        backgroundColor: "#a5abc4",
        alignItems: "center",
        justifyContent: "center",
        height: HEIGHT / 4
    },
    ContainerContent: {
        flex: 4,
        padding: "10%"
    },
    text: {
        padding: 10,
        color: "#FFFFFF",
        borderBottomColor: "#FFFFFF",
        backgroundColor: "#CCCCCC",
        borderBottomWidth: 1,
        fontSize: 15,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center"
    }
})
const mapStateToProps = state => {
    return {
        appData: state.main
    }
}
const mapDispatchToProps = dispatch => ({
    runCommands: (character_position, command) => dispatch(runCommands(character_position, command)),
    restartPlayerSettings: (character_original_position) => dispatch(restartPlayerSettings(character_original_position)),
    restartSteps: () => dispatch(restartSteps()),
    changeButtonsState: (disabled_buttons) => dispatch(changeButtonsState(disabled_buttons)),
    addCommand: (step, command, activeLoop) => dispatch(addCommand(step, command, activeLoop)),
    newLevel: (level) => dispatch(newLevel(level)),
})
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
