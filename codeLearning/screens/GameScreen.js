import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  AppRegistry,
  Image
} from 'react-native'
import {
  connect
} from 'react-redux'
import Drawer from 'react-native-drawer'
import CommandsBar from '../components/CommandsBar'
import DrawerContent from '../components/DrawerContent'
import GameLogic from '../components/GameLogic'

import {
  setForbiddenCoords,
} from '../redux/actions/main'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")
const RADIUS = 10
let dots_coord = []

class GameScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    dots_coord = []
    this.state = {
      drawer: false
    }
  }

  checkDangerZone = (col_number, row_number, danger_zone) => {
    const coincidence = danger_zone.filter(item => {
      return (
        (
          item.start.col === col_number
          &&
          (
            item.start.row <= row_number
            &&
            item.end.row >= row_number)
        )
        ||
        (
          item.start.row === row_number
          &&
          (
            item.start.col <= col_number
            &&
            item.end.col >= col_number
          )
        )
      )
    })
    return coincidence.length > 0 ? true : false
  }

  createDottedBackground = (danger_zone) => {
    dots_coord = []
    const horizontal_dots = WIDTH / 22
    const vertical_dots = HEIGHT / 25
    let vertical_coord = 120
    let horizontal_coord = 20
    let forbidden_coords = []
    console.log('vertical_dots: ', vertical_dots)
    // const { appData } = this.props
    // const { danger_zone } = appData.danger_zone

    for (let row_index = 0; row_index <= Math.floor(vertical_dots); row_index++) {

      for (let col_index = 0; col_index <= Math.floor(horizontal_dots); col_index++) {

        const coords = {
          x: horizontal_coord,
          y: vertical_coord,
          danger_zone: this.checkDangerZone(col_index, row_index, danger_zone)
        }
        dots_coord.push(coords)

        if (coords.danger_zone) {
          forbidden_coords.push(coords)
        }
        if (row_index === Math.floor(vertical_dots)) {
          console.log('vertical limit!!!')
          forbidden_coords.push({
            x: horizontal_coord,
            y: vertical_coord + 20,
            danger_zone: true
          })
        }
        horizontal_coord += 20

      }
      forbidden_coords.push({
        x: horizontal_coord,
        y: vertical_coord,
        danger_zone: true
      })

      vertical_coord += 20
      horizontal_coord = 20
    }
    this.props.setForbiddenCoords(forbidden_coords)

  }

  updateHandler = ({ touches, screen, time }) => {
    let move = touches.find(x => x.type === "move");
    if (move) {
      this.setState({
        x: this.state.x + move.delta.pageX,
        y: this.state.y + move.delta.pageY,
      });
    }
  };

  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
  };
  goBack = () => {
    this.props.navigation.navigate('LevelScreen')
  }

  render() {
    const { navigation } = this.props;
    const danger_zone = navigation.getParam('danger_zone', [])
    this.createDottedBackground(danger_zone)

    return (
      // <GameLoop style={styles.container} onUpdate={this.updateHandler}>
      <Drawer
        type="static"
        ref={(ref) => this._drawer = ref}
        content={<DrawerContent closeControlPanel={this.closeControlPanel} goBack={this.goBack} />}
        openDrawerOffset={50}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.container}>
          <CommandsBar openControlPanel={this.openControlPanel} />
          <GameLogic style={{ zIndex: 999 }} />
          {
            dots_coord.map((dot, index) => {
              if (dot.danger_zone) {
                return (
                  <View
                    style={
                      [styles.bad_dot,
                      {
                        left: dot.x - 7,
                        top: dot.y - 7,
                      }
                      ]}
                    key={index}
                  >
                    <Image
                      source={require('../assets/death_mine.png')}
                      style={styles.imageSize}
                    >
                    </Image>
                  </View>
                )
              } else {
                return (
                  <View
                    style={
                      [styles.dot,
                      {
                        left: dot.x,
                        top: dot.y,
                        backgroundColor: '#e6ae0cc2'
                      }
                      ]}
                    key={index}>
                  </View>)

              }
            })
          }
        </View>
      </Drawer >


      // </GameLoop>
    )
  }
}

AppRegistry.registerComponent("GameScreen", () => GameScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFDBE5",
    width: "100%",
    height: "100%"
  },
  // backgroundImage: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f55d11' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 100 / 2,
    position: "absolute"
  },
  bad_dot: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    position: "absolute"
  },
  target: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    backgroundColor: 'yellow',
    // position: "absolute"
  },
  imageSize: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
})

const mapDispatchToProps = dispatch => ({
  setForbiddenCoords: (forbidden_coords) => dispatch(setForbiddenCoords(forbidden_coords)),
})

export default connect(null, mapDispatchToProps)(GameScreen);