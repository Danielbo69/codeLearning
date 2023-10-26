import React from 'react';
import AppNavigator from './navigation/AppNavigator'
import { 
  createAppContainer 
} from 'react-navigation';
import {
  Provider
} from 'react-redux'
import store from './redux/store'

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
