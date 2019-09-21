import React from 'react'
import { Image, Animated, Easing } from 'react-native'
import { createAppContainer, ThemeColors } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import * as theme from './constats/theme'
import WelcomeScreen from './screens/welcomescreen'
import Register from './screens/register'
import Dashboard from './screens/dashboard'
import Actions from './screens/actions'

let SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [width, 0],
  })

  return { transform: [ { translateX } ] }
};

let SlideFromBottom = (index, position, height) => {
  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [height, 0],
  })

  return { transform: [ { translateY } ] }
};

let CollapseTransition = (index, position) => {
  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  });

  const scaleY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  });

  return {
    opacity,
    transform: [ { scaleY } ]
  }
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      // speed: 1000,
      // easing: Easing.out(Easing.poly(4)),
      timing: Animated.spring,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const { index, route } = scene;
      const params = route.params || {}; 
      const transition = params.transition || 'default'; 
      return {
        default: SlideFromRight(index, position, width),
        bottomTransition: SlideFromBottom(index, position, height),
        collapseTransition: CollapseTransition(index, position)
      }[transition];
    },
  }
}

const ScreenNavigation = createStackNavigator ({
  WelcomeScreen,
  SlideFromBottom: { screen: Register },
  Dashboard,
  Actions
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: 'white',
      borderBottomColor: 'transparent'
    },
    headerBackImage: <Image style={{height: 18, width: 18}} source={require('../assets/images/icons8-back-50.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      paddingLeft: theme.sizes.base * 2.1
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base * 2.2
    },
  },
  transitionConfig: TransitionConfiguration,
})

const Navigation = createAppContainer(ScreenNavigation)

export default Navigation