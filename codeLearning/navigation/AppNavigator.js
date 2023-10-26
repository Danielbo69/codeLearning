import GameScreen from '../screens/GameScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LevelScreen from '../screens/LevelScreen'
import RestorePassScreen from '../screens/RestorePassScreen'
import DrawerContent from '../components/DrawerContent'
import Instructions from '../components/Instructions'
import Tips from '../components/Tips'
import { createStackNavigator } from 'react-navigation'

const AppNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    GameScreen: { screen: GameScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    LevelScreen: { screen: LevelScreen },
    Instructions: { screen: Instructions },
    Tips: { screen: Tips },
    RestorePassScreen: { screen: RestorePassScreen },
    DrawerContent: { screen: DrawerContent }
})

export default AppNavigator
