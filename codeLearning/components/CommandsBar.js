import React, { Component } from 'react'
import {
    Header,
    Right,
    Icon,
    Left,
} from 'native-base'
import {
    Picker,
    StyleSheet,
    Button,
    View
} from 'react-native'
import {
    connect
} from 'react-redux'
import {
    addCommand,
    restartPlayerSettings,
    restartSteps
} from '../redux/actions/main'
class CommandsBar extends Component {
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
        const commands = [
            { label: 'Paso', value: 'step' },
            { label: 'Giro', value: 'rotate' },
            { label: 'Bucle', value: 'loop' },
        ]
        if(this.props.appData.activeLoop){
            commands.pop()
        }
        return (
            <Header style={{
                alignItems: 'stretch',
                alignContent: 'space-around',
                justifyContent: 'space-between',
                backgroundColor: '#a5abc4',
                // position: "absolute",
                paddingTop: 35,
                height: 100
            }}>
                <Right style={styles.leftContainer}>
                    <Icon
                        name="menu"
                        onPress={() =>
                            this.props.openControlPanel()}
                        style={{ color: '#000000' }}
                    />
                    <Picker
                        style={{ height: 50, width: 100 }}
                        selectedValue={this.state.command}
                        onValueChange={(itemValue, itemIndex) => this.updateCommand(itemValue, itemIndex)}
                    >
                        {
                            commands.map((command, index) => {
                                return (<Picker.Item key={`command-${index}`} label={command.label} value={command.value} />)
                            })
                        }
                    </Picker>
                    <Picker
                        style={{ height: 50, width: 100 }}
                        selectedValue={this.state.command_value}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ command_value: itemValue })
                        }
                    >
                        {
                            this.state.itemsList
                        }
                    </Picker>
                    <Icon
                        name="md-add-circle"
                        onPress={() => {
                            this.props.addCommand(
                                this.props.appData.steps, {
                                command: this.state.command,
                                command_value: this.state.command_value
                            },
                            this.props.appData.activeLoop)
                            this.props.openControlPanel()
                        }
                        }
                    />
                    {
                        this.props.appData.steps.length > 0 ?
                            <Icon
                                name="md-undo"
                                onPress={() =>{
                                    this.props.restartPlayerSettings(this.props.appData.character_original_position)
                                    this.props.restartSteps()
                                }
                                }
                            /> : null
                    }
                </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})

const mapStateToProps = state => ({
    appData: state.main
})

const mapDispatchToProps = dispatch => ({
    addCommand: (step, command, activeLoop) => dispatch(addCommand(step, command, activeLoop)),
    restartPlayerSettings: (character_original_position) => dispatch(restartPlayerSettings(character_original_position)),
    restartSteps: () => dispatch(restartSteps())
})

export default connect(mapStateToProps, mapDispatchToProps)(CommandsBar);