import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import AwesomeAlert from 'react-native-awesome-alerts';
import { signUp, removeErrorUser } from '../stores/actions'
import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Register = (props) => {

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.gray,
      fontSize: theme.sizes.font,
      fontWeight: '500',
      color: theme.colors.black,
      height: theme.sizes.base * 3
    },
    toggle: {
      position: 'absolute',
      alignItems: 'flex-end',
      top: theme.sizes.base + 10,
      right: 0,
    },
    btn: {
      height: theme.sizes.base * 3,
      marginVertical: theme.sizes.padding,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      backgroundColor: theme.colors.accent
    }
  })

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [show, setShow] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    if (isError) {
      console.log(isError);
      
    }
  }, [isError])

  useEffect(() => {
    if (user.isError) {
      // setIsError(user.isError)
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }, [user.isError])

  const handleSignUp = () => {
    dispatch(signUp({ fullname: fullName, email, password }, props.navigation))
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior='padding'>
      <Block style={{ paddingHorizontal: theme.sizes.base * 2}}>
        <Text h1 bold> Register </Text>
        <Block middle>
          <Block flex={false}>
            <Text gray2> FullName </Text> 
            <TextInput 
              style={styles.input}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              keyboardType='email-address'
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </Block>
          <Block flex={false} style={{marginTop: theme.sizes.base * 2}}>
            <Text gray2> Email </Text> 
            <TextInput 
              style={styles.input}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Block>
          <Block flex={false} style={{marginTop: theme.sizes.base * 2}}>
            <Text gray2> Passoword </Text> 
            <TextInput 
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
          </Block>
          <Button style={styles.btn} onPress={() => handleSignUp()}>
            <Text center semibold white style={{width: '100%'}}> Sign Up </Text>
          </Button>
        </Block>
      </Block>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Something Wrong"
        message={user.isError}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        onConfirmPressed={() => {
          setIsError(null)
          dispatch(removeErrorUser())
          setShowAlert(false)
        }}
      />
    </KeyboardAvoidingView>
  )
}

export default Register