import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { logIn } from '../redux/actions/main'
import * as Animatable from 'react-native-animatable'
import {
  connect
} from 'react-redux'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }


  render() {
    const {
      appData
    } = this.props

    // console.log('HOME user_data: ', appData.user_data)
    return (
      // imagen de fondo 
      <ImageBackground style={styles.imgStyle} source={require('../assets/images/fondo-prueba-1.png')}>
        <View style={styles.titulo}>
          {/* <Text style={styles.texto}> */}
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center', color: 'white', fontSize: 25 }}
          >
            Bienvenidos a CodeLearning
                </Animatable.Text>
          {/* </Text> */}
        </View>
        <View style={styles.container}>

        </View>
        <View style={styles.buttons}>
          {/* boton para Invitado */}
          <View style={styles.buttonInvitado}>
            <Button onPress={() => {
              this.props.navigation.navigate('LevelScreen')
            }}
              buttonStyle={{
                borderColor: 'rgba(137, 141, 145, 0.58)',
                backgroundColor: 'rgba(137, 141, 145, 0.58)',
                borderWidth: 2,
                borderRadius: 20,
                padding: 13,
                // width: 320,
                height: 50
              }}
              title={appData.user_data.uid ? "¡JUGAR!" : "¡JUEGA COMO INVITADO!"}
              titleStyle={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 13,
                textAlign: 'center',
              }}
            />
          </View>
          {/* boton para iniciar sesion */}
          {
            !appData.user_data.uid
              ? <View style={styles.button}>
                <Button onPress={() => {
                  this.props.navigation.navigate('LoginScreen')
                }}
                  buttonStyle={{
                    borderColor: 'rgba(244, 67, 54, 0.83)',
                    backgroundColor: 'rgba(244, 67, 54, 0.83)',
                    borderWidth: 2,
                    borderRadius: 20,
                    padding: 13,
                    width: 150,
                    height: 50
                  }}
                  title="INICIAR SESIÓN"
                  titleStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 13,
                    textAlign: 'center',
                  }}
                />
                {/* boton para registrarse */}
                <Button onPress={() => {
                  this.props.navigation.navigate('RegisterScreen')
                }}
                  buttonStyle={{
                    borderColor: 'rgba(20, 182, 182, 0.61)',
                    backgroundColor: 'rgba(20, 182, 182, 0.61)',
                    borderWidth: 2,
                    borderRadius: 20,
                    padding: 13,
                    width: 150,
                    height: 50
                  }}
                  title="REGISTRATE"
                  titleStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 13,
                    textAlign: 'center',
                  }}
                />
              </View>
              : <View style={styles.Invitado}>
                {/* <Button onPress={() => {
                  this.props.logIn({ userEmail: null, uid: null, userName: null })
              : <View style={styles.buttonInvitado}>
                <Button onPress={() => {
                  this.props.logIn({ userEmail: null, uid: null, userName: null, userLevel: 5 })
                }}
                  buttonStyle={{
                    borderColor: '#C0392B',
                    backgroundColor: '#C0392B',
                    borderWidth: 2,
                    borderRadius: 20,
                    padding: 13,
                    width: '10%',
                    height: 50
                  }}
                  title="close"
                  titleStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 13,
                    textAlign: 'center',
                  }}
                /> */}
                <Icon
                  raised
                  name='sign-out'
                  type='font-awesome'
                  color='#f50'
                  style={{
                    backgroundColor:'#f50'
                  }}
                  onPress={() =>  this.props.logIn({ userEmail: null, uid: null, userName: null, userLevel: 5 })} />
              </View>
          }


        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  imgStyle: {
    flex: 1,
  },
  titulo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttons: {
    flex: 1,
    margin: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonInvitado: {
    flex: 1,
    justifyContent: "center",
  },
  Invitado:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});


const mapStateToProps = state => ({
  appData: state.main
})

const mapDispatchToProps = dispatch => ({
  logIn: (user_data) => dispatch(logIn(user_data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
