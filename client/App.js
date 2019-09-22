import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux';

import store from './src/stores'
import Navigation from './src/navigation'
import WelcomeScreen from './src/screens/welcomescreen'

const images = [
  require('./assets/images/avatar_1x.jpg'),
  require('./assets/images/farming-01.jpg'),
  require('./assets/images/icons8-back-50.png'),
  require('./assets/images/icons8-light-on-50.png'),
  require('./assets/images/icons8-mayonnaise-50.png'),
  require('./assets/images/icons8-thermometer-50.png'),
  require('./assets/images/farm_kit8-net.jpg'),
  require('./assets/images/chicken.png'),
  require('./assets/images/icons8-ellipsis-50.png'),
  require('./assets/images/icons8-sort-right-26.png'),
  require('./assets/images/icons8-light-off-50.png'),
  require('./assets/images/icons8-light-50.png'),
  require('./assets/images/icons8-man-feeding-duck-50.png'),
  require('./assets/images/icons8-forward-50.png'),
  require('./assets/images/icons8-add-image-96.png')
]

class App extends Component {

  state = {
    isLoading: false
  }

  handleResources = async () => {
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  render() {

    if (!this.state.isLoading && !this.props.skipLoadingScreen) {
      return (
        <AppLoading 
          startAsync={this.handleResources}
          onError={console.ward}
          onFinish={() => this.setState({ isLoading: true })}
        />
      )
    }

    return (
      <Provider store={store}>
       <Navigation/> 
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({

});
