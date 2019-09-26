import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
<<<<<<< HEAD
import { StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
<<<<<<< HEAD
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Snackbar from 'react-native-snackbar'
=======
import { TapGestureHandler } from 'react-native-gesture-handler'
import Toast, {DURATION} from 'react-native-easy-toast'
>>>>>>> 2f0884e2... store connected
=======
import { StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
>>>>>>> 66ad8ffd... i guess is done
=======
import { StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
>>>>>>> dee388e6cd2b657d13dcc4fe6aac03685a05d107

import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated from 'react-native-reanimated'
import Loader from '../components/loader'

import { signIn, checkerLogin, removeErrorUser } from '../stores/actions'
import { Block, Text } from '../components'
import * as theme from '../constats/theme'

const WelcomeScreen = (props) => {

  const { width, height } = Dimensions.get('screen')
  const { interpolate, Extrapolate, concat } = Animated

  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
<<<<<<< HEAD
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false)
  const buttonOpacity = new Value(1)

  const snackbar = () => {
    Snackbar.show({
      title: 'Error',
      duration: Snackbar.LENGTH_SHORT,
    })
  }

  const onStateChange = event([
    {
      nativeEvent: ({state}) => block([
        cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock, 1, 0)))
      ])
    }
  ])
=======
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const [buttonOpacity, setOpacity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
         let resultParsed = JSON.parse(result)
         dispatch(checkerLogin(resultParsed, props.navigation))
      }
    });
  },[])
>>>>>>> dee388e6cd2b657d13dcc4fe6aac03685a05d107

  useEffect(() => {
    if(user.isError) {
      setErrorMessage(user.isError)
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
<<<<<<< HEAD
  ])

  function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 700,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }
=======
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
<<<<<<< HEAD
  const [buttonOpacity, setOpacity] =  useState(1)
>>>>>>> 2f0884e2... store connected
=======
  const [buttonOpacity, setOpacity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
         let resultParsed = JSON.parse(result)
         dispatch(checkerLogin(resultParsed, props.navigation))
      }
    });
  },[])

  useEffect(() => {
    if(user.isError) {
      setErrorMessage(user.isError)
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  },[user.isError])
>>>>>>> 66ad8ffd... i guess is done
=======
  },[user.isError])
>>>>>>> dee388e6cd2b657d13dcc4fe6aac03685a05d107

  const btnY = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [100, 0], extrapolate: Extrapolate.CLAMP }) 
  const bgY = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [-height / 4, 0], extrapolate: Extrapolate.CLAMP }) 
  const zindex = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [1, -1], extrapolate: Extrapolate.CLAMP }) 
  const inputOpacity = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [1, 0], extrapolate: Extrapolate.CLAMP }) 
  const inputY = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [0, 100], extrapolate: Extrapolate.CLAMP }) 
  const rotateClose = interpolate(buttonOpacity, { inputRange: [0, 1], outputRange: [180, 360], extrapolate: Extrapolate.CLAMP }) 

  const styles = StyleSheet.create({
    btn: {
      height: 45,
      borderRadius: theme.sizes.border,
      marginHorizontal: 40,
      marginVertical: 5,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.gray,
      fontSize: theme.sizes.font,
      fontWeight: '500',
      color: theme.colors.black,
      height: 45,
      marginHorizontal: 40,
      marginVertical: 5,
      paddingRight: 15
    },
    toggle: {
      position: 'absolute',
      top: 36 * 2,
      right: 42,
    },
    clsbtn: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width / 2 - 20,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
    }
  })

  handleSignIn = () => {
    dispatch(signIn({ email, password }, props.navigation))
    setOpacity(1)
    setEmail('')
    setPassword('')
  }

  return (
    <Block end style={{backgroundColor: theme.colors.white}}>
      <Loader modalVisible={user.isLoading}/>
      <Animated.View center style={{... StyleSheet.absoluteFill, marginVertical: 100 }}>
        <Text h1 center bold> Magic Livestock </Text>
        <Text body gray center style={{ marginTop: theme.sizes.padding / 2 }}> Monitoring and chill </Text>
        <Image 
          source={require('../../assets/images/farming-01.jpg')}
          style={{width: width, height: height/2, marginVertical: 15}   }
        />
      </Animated.View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Incorrect"
        message={errorMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        onConfirmPressed={() => {
          removeErrorUser()
          setShowAlert(false)
        }}
        cancelButtonStyle={
          color='transparent'
        }
      />
      <Block flex={false} style={{height: height / 4}}> 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <TapGestureHandler onHandlerStateChange={() => snackbar()}>
=======
        <TapGestureHandler onHandlerStateChange={(a) =>  setOpacity(0) }>
>>>>>>> 2f0884e2... store connected
=======
        <TouchableOpacity onPress={(a) =>  setOpacity(0) }>
>>>>>>> 55b17af1... so closeeee
=======
        <TouchableOpacity onPress={(a) =>  setOpacity(0) }>
>>>>>>> dee388e6cd2b657d13dcc4fe6aac03685a05d107
          <Animated.View 
            style={{ ...styles.btn, backgroundColor: theme.colors.accent, opacity: buttonOpacity, transform: [{translateY: btnY}] }}
          >
            <Text semibold> Sign In </Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('SlideFromBottom')}>
          <Animated.View 
            style={{ ...styles.btn, backgroundColor: 'whitesmoke', opacity: buttonOpacity, transform: [{translateY: btnY}] }}
          >
            <Text semibold> Sign Up </Text>
          </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={{
            zIndex: zindex,
            opacity: inputOpacity,
            // transform: [{translateY: inputY}],
            ...StyleSheet.absoluteFill, 
            height: height / 4,
            top: null,
            backgroundColor: theme.colors.accent,
            borderRadius: 40
          }}
        >

          <TapGestureHandler onHandlerStateChange={() => setOpacity(1)}>
            <Animated.View style={styles.clsbtn}>
              <Animated.Text style={{fontWeight: 'bold', transform: [{rotate: concat(rotateClose, 'deg')}] }}> X </Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <TextInput 
            placeholder='Email'
            style={styles.input}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => {
              setEmail(text)
            }}
          />
          <TextInput 
            placeholder='Password'
            style={styles.input}
            secureTextEntry={show}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.toggle} onPress={() => setShow(!show)}>
            { show ? <Icon name="md-eye-off" size={18} color={theme.colors.gray} /> : <Icon name="md-eye" size={18} color={theme.colors.gray} /> }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignIn()}>
            <Animated.View 
              style={{ ...styles.btn, backgroundColor: '#f6f6f6' }}
            >
              <Text semibold> Sign In </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Block>
    </Block>
  )
}

WelcomeScreen.navigationOptions = () => ({
  header: null
})

export default WelcomeScreen
