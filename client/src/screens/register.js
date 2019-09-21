import React, { useState } from 'react'
import { KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Register = () => {

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

  const [show, setShow] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
              autoFocus={true}
              autoCorrect={false}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.toggle} onPress={() => setShow(!show)}>
              { show ? <Icon name="md-eye-off" size={18} color={theme.colors.gray} /> : <Icon name="md-eye" size={18} color={theme.colors.gray} /> }
            </TouchableOpacity>
          </Block>
          <Button style={styles.btn} onPress={() => setIsLoading(!isLoading)}>
            <Text center semibold white style={{width: '100%'}}> Sign Up </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  )
}

export default Register