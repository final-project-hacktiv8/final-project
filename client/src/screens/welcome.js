import React from 'react'
import { Dimensions, StyleSheet, Image } from 'react-native'
import { Button } from 'native-base'

import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Welcome = (props) => {

  const { width, height } = Dimensions.get('screen')
  
  const styles = StyleSheet.create({
    btn: {
      height: theme.sizes.base * 3,
      width: width - 90,
      marginVertical: theme.sizes.padding / 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10
    }
  })


  return (
    <Block>
      <Block center end flex={0.4}>
        <Text h1 bold center> Magic Livestock </Text>
        <Text body gray style={{ marginTop: theme.sizes.padding / 2 }}> Monitoring and chill </Text>
      </Block>
      <Block center middle>
        <Image 
          style={{width: width-50, height: height/2}}
          source={require('../../assets/images/farming-01.jpg')}
        />
      </Block>
      <Block center flex={0.5}>
        <Button style={[styles.btn, {backgroundColor: theme.colors.accent}]} onPress={() => props.navigation.navigate('Login')}>
          <Text body semibold center white style={{width: '100%'}}> Sign In </Text>
        </Button>
        <Button style={[styles.btn, {backgroundColor: 'white'}]} onPress={() => props.navigation.navigate('Register')}>
          <Text body semibold center style={{width: '100%'}}> Sign Up </Text>
        </Button>
        <Button style={[styles.btn]} transparent light>
          <Text body semibold center gray style={{width: '100%'}}> Terms of services </Text>
        </Button>
      </Block>
    </Block>
  )
}

Welcome.navigationOptions = () => ({
  header: null
})

export default Welcome
