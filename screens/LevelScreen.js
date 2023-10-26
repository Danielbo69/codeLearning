import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {
    connect
} from 'react-redux'
import {
    setLevelInitialState,
    restartPlayerSettings,
    restartSteps
} from '../redux/actions/main'
import Instructions from '../components/Instructions'
import Tips from '../components/Tips'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const levels = [
    {//1
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [{ start: { row: 2, col: 3 }, end: { row: 7, col: 3 } }]
    },
    {//2
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 210, y: 210 },
        danger_zone: [{ start: { row: 5, col: 5 }, end: { row: 7, col: 5 } },
        { start: { row: 4, col: 5 }, end: { row: 4, col: 10 } }]
    },
    {//3
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 210, y: 210 },
        danger_zone: [{ start: { row: 1, col: 3 }, end: { row: 9, col: 3 } },
        { start: { row: 10, col: 3 }, end: { row: 10, col: 7 } }]
    },
    {//4
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 5, col: 5 }, end: { row: 7, col: 5 } },
            { start: { row: 6, col: 5 }, end: { row: 12, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
        ]
    },
    {//5
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 12, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 0, col: 10 }, end: { row: 6, col: 10 } },
        ]
    },
    {//6
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 12, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 1, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 3, col: 0 }, end: { row: 3, col: 1 } },
        ]
    },
    {//7
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 12, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 1, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 9, col: 0 }, end: { row: 9, col: 4 } },
        ]
    },
    {//8
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 12, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 1, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 9, col: 0 }, end: { row: 9, col: 4 } },
            { start: { row: 12, col: 8 }, end: { row: 12, col: 16 } },
        ]
    },
    {//9
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 190, y: 370 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 16, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 0, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 12, col: 8 }, end: { row: 12, col: 16 } },
            { start: { row: 9, col: 1 }, end: { row: 9, col: 4 } },
        ]
    },
    {//10
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 230, y: 30 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 16, col: 5 } },
            { start: { row: 7, col: 6 }, end: { row: 7, col: 13 } },
            { start: { row: 0, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 12, col: 8 }, end: { row: 12, col: 16 } },
            { start: { row: 9, col: 1 }, end: { row: 9, col: 4 } },
        ]
    },
    {//11
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 230, y: 30 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 16, col: 5 } },
            { start: { row: 7, col: 8 }, end: { row: 7, col: 13 } },
            { start: { row: 0, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 12, col: 8 }, end: { row: 12, col: 16 } },
            { start: { row: 9, col: 0 }, end: { row: 9, col: 4 } },
        ]
    },
    {//12
        character_initial_position: { rotation: 0, x: 10, y: 10 },
        target_initial_position: { x: 230, y: 30 },
        danger_zone: [
            { start: { row: 2, col: 2 }, end: { row: 7, col: 2 } },
            { start: { row: 3, col: 3 }, end: { row: 3, col: 7 } },
            { start: { row: 6, col: 5 }, end: { row: 16, col: 5 } },
            { start: { row: 7, col: 8 }, end: { row: 7, col: 13 } },
            { start: { row: 0, col: 10 }, end: { row: 6, col: 10 } },
            { start: { row: 12, col: 8 }, end: { row: 12, col: 14 } },
            { start: { row: 9, col: 0 }, end: { row: 9, col: 4 } },
            { start: { row: 8, col: 8 }, end: { row: 11, col: 8 } },
        ]
    },
]
class LevelScreen extends Component {

    constructor() {
        super()
    }

    static navigationOptions = {
        header: null,
    }

    goToLevel = (character_position, target_position, danger_zone) => {
        this.props.restartPlayerSettings(this.props.appData.character_original_position)
        this.props.restartSteps()
        this.props.setLevelInitialState(character_position, target_position, danger_zone)
        this.props.navigation.navigate('GameScreen', { danger_zone })
    }

    componentDidMount() {
        this.props.restartPlayerSettings()
        this.props.restartSteps()
    }

    render() {
        const a = false
        const {
            appData
        } = this.props
        return (
            <LinearGradient
                colors={['#8693c7', '#10304c', '#10304c', '#8693c7']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    {
                        a ? <Instructions />
                            :
                            <ScrollView>
                                <Text style={styles.tittle}>NIVELES</Text>
                                <View style={{ flexDirection: "row", alignContent: "space-around", flexWrap: "wrap" }}>
                                    {
                                        levels.map((level, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.circle_container, { alignItems: "center" }]}
                                                    onPress={() => {
                                                        this.goToLevel(
                                                            level.character_initial_position,
                                                            level.target_initial_position,
                                                            level.danger_zone
                                                        )
                                                    }}
                                                    disabled={appData.user_data.userLevel >= index ? false : true}
                                                >
                                                    <View style={[styles.circle, { backgroundColor: appData.user_data.userLevel >= index ? 'white' : '#aaa3a3' }]}>
                                                        <Text>{index + 1}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                </View>
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center'
                                }}>
                                    {/* Botón instrucciones */}
                                    <Button
                                        buttonStyle={{
                                            borderColor: '#C0392B',
                                            backgroundColor: '#C0392B',
                                            borderWidth: 2,
                                            borderRadius: 15,
                                            padding: 13
                                        }}
                                        title="INSTRUCCIONES DE JUEGO"
                                        titleStyle={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            textAlign: 'center',
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate('Instructions')
                                            // this.props.navigation.navigate('LevelScreen')
                                            // this.validation.bind(this.state.email + " " + this.state.password)
                                        }}
                                    />

                                    {/* Botón tips */}
                                    <Button
                                        buttonStyle={{
                                            
                                            borderColor: '#d4dd38',
                                            backgroundColor: '#d4dd38',
                                            borderWidth: 2,
                                            borderRadius: 15,
                                            padding: 13,
                                            marginTop: 9
                                        }}
                                        title="CONSEJOS DE PROGRAMACIÓN"
                                        titleStyle={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            textAlign: 'center',
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate('Tips')
                                            // this.props.navigation.navigate('LevelScreen')
                                            // this.validation.bind(this.state.email + " " + this.state.password)
                                        }}
                                    />
                                </View>

                            </ScrollView>
                    }
                </View>
            </LinearGradient >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tittle: {
        margin: 15,
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#FFFFFF",
        padding: 10,
        textAlign: 'center',
    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 100
    },
    circle_container: {
        width: WIDTH / 3
    }
})

const mapStateToProps = state => ({
    appData: state.main
})

const mapDispatchToProps = dispatch => ({
    setLevelInitialState: (character_position, target_position, danger_zone) => dispatch(setLevelInitialState(character_position, target_position, danger_zone)),
    restartPlayerSettings: () => dispatch(restartPlayerSettings()),
    restartSteps: () => dispatch(restartSteps())
})

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen)