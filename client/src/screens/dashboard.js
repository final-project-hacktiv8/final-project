import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import { Bar } from 'react-native-progress';

import db from '../services/firebase'
import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Dashboard = (props) => {

  const { width, height } = Dimensions.get('screen')
  const [food, setFood] = useState(1)
  const [foodInt, setFoodInt] = useState(false)
  const [widthFood, setWidthFood] = useState(0)
  const [light, setLight] = useState(null)
  const [suhu, setSuhu] =useState(null)
  const [checked, setChecked] = useState(false)
  const [motor, setMotor] = useState(null)
  const [notif, setNotif] = useState('');
  const widthh = 120
  const heightt = 6

  useEffect(() => {
    db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
      setLight(querySnapshot.data().led)
      setFood(querySnapshot.data().height)
      setMotor(querySnapshot.data().state)
      setSuhu(querySnapshot.data().temperature)
      if (querySnapshot.data().led == 1) {
        setChecked(true)
      }
      else setChecked(false)
    })
  },[])

  useEffect(() => {
    registerForPushNotifications()
  },[])

  const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status;
    }
    console.log(finalStatus)
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      console.log('ui');
      return;
    }
    const listener =  Notifications.addListener(handleNotif)
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
  }

  const handleNotif = (({origin , data}) => {
    console.log(origin, data)
  })

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
      width: width / 2 - theme.sizes.base,
      backgroundColor: theme.colors.tertiary,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      backgroundColor: '#f7ed83',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    container: {
      paddingHorizontal: theme.sizes.base * 2,
    },
    cardAct: {
      width: 130,
      height: 100,
      backgroundColor: 'whitesmoke',
      borderRadius: 20,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      padding: 25,
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })

  const animate = () => {
    setTimeout(() => {
      setFoodInt(false)
    }, 1500);
  }

  useEffect(() => {
    setWidthFood(1-(food/16))
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
        <Text h1 bold> Magic Livestock </Text>
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
              style={{width: width/2.2, height: height/2.2, }}
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
              <Text center small> {((1-food/16) * 100).toFixed()}% </Text>
              <Bar 
                style={styles.progressBar}
                width= {widthh}
                height= {heightt}
                progress={widthFood}
                indeterminate={foodInt}
                borderColor='#06967A'
                color='#06967A'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block> 
          <Block row center>
            { light == 0 ? (
              <Image 
                source={require('../../assets/images/icons8-light-off-50.png')}
                style={{width: 27, height: 27}}
              />
            ) : (
              <Image 
                source={require('../../assets/images/icons8-light-on-50.png')}
                style={{width: 27, height: 27}}
              />
            ) }
            <Block flex={false}>
              <Text center small> { light == 0 ? 'OFF' : 'ON' } </Text>
              <Bar 
                style={styles.progressBar}
                width= {widthh}
                height= {heightt}
                progress={light}
                borderColor='#06967A'
                color='#06967A'
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
              <Text center small> {suhu}°C </Text>
              <Bar 
                style={styles.progressBar}
                progress={(suhu/40)}
                width= {widthh}
                height= {heightt}
                indeterminate={false}
                borderColor='#06967A'
                color='#06967A'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block>
        </Block>
      </Block>
      <Block flex={0.5} style={styles.container}>
        <Block row style={{justifyContent: 'space-between'}} >
          <Block flex={false}>
            <TouchableOpacity onPress={() => turn()} style={[styles.cardAct, light == 1 ? {borderWidth: 1, borderColor: '#06967A', shadowOpacity: 0.4, shadowRadius: 5, shadowColor: '#06967A', backgroundColor: '#f9fcf2'} : null ]}>
              <Image 
                source={require('../../assets/images/icons8-light-50.png')}
                style={{width: 30, height: 30}}
              />
              <Text body semibold> Light </Text>
            </TouchableOpacity>
          </Block>
          <Block flex={false}>
            <TouchableOpacity onPress={() => open()} style={[styles.cardAct, motor ? {borderWidth: 1, borderColor: '#06967A', shadowOpacity: 0.4, shadowRadius: 5, shadowColor: '#06967A', backgroundColor: '#f9fcf2'} : null ]}>
              <Image 
                source={require('../../assets/images/icons8-man-feeding-duck-50.png')}
                style={{width: 30, height: 30}}
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
      <TouchableOpacity onPress={() => AsyncStorage.removeItem('user', () => {
        navigation.navigate('WelcomeScreen')
      })}>
        <Image 
          source={require('../../assets/images/icons8-ellipsis-50.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>
    )
  }
}
export default Dashboard
