import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, ThemeColors } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import * as theme from './constats/theme'
import Welcome from './screens/welcome'
import Login from './screens/login'
import Register from './screens/register'
import Dashboard from './screens/dashboard'

const ScreenNavigation = createStackNavigator ({
  Welcome,
  Login,
  Register,
  Dashboard
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: 'white',
      borderBottomColor: 'transparent'
    },
    headerBackImage: <Image style={{height: theme.sizes.base*2, width: theme.sizes.base * 2}} source={require('../assets/images/icons8-back-to-64.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base
    }
  }
})

const Navigation = createAppContainer(ScreenNavigation)

export default Navigation