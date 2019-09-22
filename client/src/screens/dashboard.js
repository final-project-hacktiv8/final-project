import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';
import { Bar } from 'react-native-progress';

import db from '../services/firebase'
import * as theme from '../constats/theme'
import { Block, Text } from '../components'


const Dashboard = (props) => {

  const { width, height } = Dimensions.get('screen')
  const [food, setFood] = useState(10)
  const [foodInt, setFoodInt] = useState(false)
  const [widthFood, setWidthFood] = useState(0)
  const [light, setLight] = useState(1)
  const [checked, setChecked] = useState(false)
  const [motor, setMotor] = useState(null)
  const widthh = 140
  const heightt = 8

  useEffect(() => {
    db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
      setLight(querySnapshot.data().led)
      setFood(querySnapshot.data().height)
      setMotor(querySnapshot.data().state)
      if (querySnapshot.data().led == 1) {
        setChecked(true)
      }
      else setChecked(false)
    })
  },[])

  const styles = StyleSheet.create({
    header: {
      justifyContent: 'space-between',
      paddingHorizontal: theme.sizes.base * 2,
      paddingTop: theme.sizes.base
    },
    avatar: {
      width: theme.sizes.base * 2.8,
      height: theme.sizes.base * 2.8,
      borderRadius: 20
    },
    progressBar: {
      marginHorizontal: 5,
    },
    card: {
      width: 130,
      backgroundColor: theme.colors.tertiary,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10
    },
    container: {
      paddingHorizontal: theme.sizes.base * 2,
    },
    cardAct: {
      width: 140,
      height: 110,
      backgroundColor: 'whitesmoke',
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.tertiary,
      borderBottomEndRadius: 5,
      borderTopRightRadius: 5,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  useEffect(() => {
    animate()
  }, [])

  const animate = () => {
    setTimeout(() => {
      setFoodInt(false)
    }, 1500);
  }

  useEffect(() => {
    setWidthFood(1-(food/30))
  },[food])

  useEffect(() => {
    animate();
  },[widthFood])


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

  return (
    <Block style={{ backgroundColor: '#f9f6ea' }}>
      <Block flex={false} row center style={styles.header}>
        <Text h1 bold> Dashboard </Text>
        <Animatable.Image animation='tada' delay={600} style={styles.avatar} source={require('../../assets/images/avatar_1x.jpg')}/> 
      </Block>
      <Block flex={false} row center style={{justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: theme.sizes.base}}>
        <Block>
          { widthFood < 0.3 ? (
            <Animatable.Image 
            source={require('../../assets/images/chicken.png')}
            style={{width: width/2.2, height: height/2.2}}
            animation='tada'
            delay={1000}
            iterationCount='infinite'
          />
          ) : (
            <Image 
              source={require('../../assets/images/chicken.png')}
              style={{width: width/2.2, height: height/2.2}}
            />
          ) }
        </Block>
        <Block column center  style={{height: height / 4, justifyContent: 'space-around'}}>
          <Block row center>
            <Image 
              source={require('../../assets/images/icons8-mayonnaise-50.png')}
              style={{width: 22, height: 22}}
            />
            <Block flex={false}>
              <Text center small> {((1-food/30) * 100).toFixed(2)}% </Text>
              <Bar 
                style={styles.progressBar}
                width= {widthh}
                height= {heightt}
                progress={widthFood}
                indeterminate={foodInt}
                borderColor='#648F5B'
                color='#648F5B'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block> 
          <Block row center>
            { light == 0 ? (
              <Image 
                source={require('../../assets/images/icons8-light-off-50.png')}
                style={{width: 25, height: 25}}
              />
            ) : (
              <Image 
                source={require('../../assets/images/icons8-light-on-50.png')}
                style={{width: 25, height: 25}}
              />
            ) }
            <Block flex={false}>
              <Text center small> { light == 0 ? 'OFF' : 'ON' } </Text>
              <Bar 
                style={styles.progressBar}
                width= {widthh}
                height= {heightt}
                progress={light}
                borderColor='#648F5B'
                color='#648F5B'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block>  
          <Block row center>
            <Image 
              source={require('../../assets/images/icons8-thermometer-50.png')}
              style={{width: 25, height: 25}}
            />
            <Block flex={false}>
              <Text center small> 20°C </Text>
              <Bar 
                style={styles.progressBar}
                progress={4}
                width= {widthh}
                height= {heightt}
                indeterminate={false}
                borderColor='#648F5B'
                color='#648F5B'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block>
        </Block>
      </Block>
      <Block flex={0.5} style={styles.container}>
        <Block row style={{justifyContent: 'space-between'}} >
          <Block flex={false}>
            <TouchableOpacity onPress={() => turn()} style={styles.cardAct}>
              <Image 
                source={require('../../assets/images/icons8-light-50.png')}
                style={{width: 22, height: 22}}
              />
              <Text body semibold> Light </Text>
            </TouchableOpacity>
            </Block>
          <Block flex={false}>
            <TouchableOpacity onPress={() => open()} style={styles.cardAct}>
              <Image 
                source={require('../../assets/images/icons8-man-feeding-duck-50.png')}
                style={{width: 25, height: 25}}
              />
              <Text body semibold> Feed </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>  
      <Block flex={0.25} style={{alignItems: 'flex-end', marginTop: 10}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Logs')}> 
          <Block center middle style={styles.card}>
            <Block row style={{justifyContent: 'space-around'}}>
              <Block middle style={{alignItems:'flex-end'}}>
                <Text semibold> View </Text>
                <Text semibold> Logs </Text>
              </Block>
              <Block middle center>
                <Image source={require('../../assets/images/icons8-forward-50.png')} style={{width: 28, height: 28}} />
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  )
}

Dashboard.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: '#f9f6ea',
      borderBottomColor: 'transparent'
    },
    headerLeft: null,
    headerRight: (
      <TouchableOpacity>
        <Image 
          source={require('../../assets/images/icons8-ellipsis-50.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>
    )
  }
}
export default Dashboard
