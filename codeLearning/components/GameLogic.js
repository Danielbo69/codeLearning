import React, { PureComponent } from 'react'
import * as Animatable from 'react-native-animatable'
import {
    View,
    StyleSheet,
    AppRegistry,
    Image
} from 'react-native'
import {
    connect
} from 'react-redux'

const RADIUS = 10

class GameLogic extends PureComponent {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super()
    }

    render() {
        const {
            appData
        } = this.props
        const {
            rotation,
            x,
            y
        } = appData.character_position

        return (
            <View style={styles.container}>
                <View
                    style={
                        [styles.player,
                        {
                            left: x,
                            top: y,
                            transform: [{ rotate: `${rotation}deg` }]
                        }
                        ]}
                >
                    <Image
                        source={require('../assets/character2.png')}
                        style={styles.imageSize}
                    >
                    </Image>

                </View>

                <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style={
                        [
                            styles.target,
                            {
                                left: appData.target_position.x,
                                top: appData.target_position.y
                            }
                        ]
                    }
                >

                </Animatable.View>
            </View>
        )
    }
}

AppRegistry.registerComponent("GameScreen", () => GameScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#425087",
        width: "100%",
        height: "100%"
    },
    // backgroundImage: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f55d11' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")  },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 100 / 2,
        position: "absolute"
    },
    target: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: 100 / 2,
        backgroundColor: 'yellow',
        // position: "absolute"
    },
    imageSize: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    player: {
        position: "absolute",
        width: RADIUS * 3,
        height: RADIUS * 3,
        borderRadius: RADIUS * 2,
        zIndex: 999
    }
})


const mapStateToProps = state => ({
    appData: state.main
})

export default connect(mapStateToProps, null)(GameLogic);