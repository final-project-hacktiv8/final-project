import React, { useState, useEffect } from 'react'
import { StyleSheet, Switch, TouchableOpacity } from 'react-native'

import db from '../services/firebase'
import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Actions = () => {
  
  useEffect(() => {
    db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
      setMotor(querySnapshot.data().state)
      if (querySnapshot.data().led == 1) {
        setChecked(true)
      }
      else setChecked(false)
    })
  },[])

  const turn = () => {
    if (checked) {
      db.collection('machines').doc('machine-1').update({
        led: 0 
      })
    } else {
      db.collection('machines').doc('machine-1').update({
        led: 1 
      })
    }
  }

  const open = () => {
    db.collection('machines').doc('machine-1').update({
      state: !motor
    })
  }

  const [checked, setChecked] = useState(null)
  const [motor, setMotor] = useState(null)

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: theme.sizes.base * 2,
      paddingTop: theme.sizes.base
    },
    card: {
      width: 150,
      height: 150,
      backgroundColor: 'pink',
      borderRadius: theme.sizes.border,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  return (
    <Block style={styles.container}>
      <Block flex={false}>
        <Text h1 bold> Actions </Text>
      </Block>
      <Block row center style={{justifyContent: 'space-between'}} >
        <Block flex={false} center middle style={styles.card}>
          <Text> Light </Text>
          <Switch 
            ios_backgroundColor='whitesmoke'
            thumbColor='pink'
            onChange={() => turn()} 
            value={checked}
          />
        </Block>
        <Block flex={false} center middle>
          <TouchableOpacity onPress={() => open()} style={styles.card}>
            <Text> Food </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  )
}

export default Actions
