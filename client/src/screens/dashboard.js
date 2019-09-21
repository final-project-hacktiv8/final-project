import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

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

  useEffect(() => {
    db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
      setLight(querySnapshot.data().led)
      setFood(querySnapshot.data().height)
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
      width: 100,
      height: 8,
      marginHorizontal: 5
    },
    card: {
      width: 150,
      backgroundColor: theme.colors.accent,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10
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


  return (
    <Block style={{ backgroundColor: '#f9f6ea' }}>
      <Block flex={false} row center style={styles.header}>
        <Text h1 bold> Dashboard </Text>
        <Animatable.Image animation='tada' delay={600} style={styles.avatar} source={require('../../assets/images/avatar_1x.jpg')}/> 
      </Block>
      <Block flex={false} row center style={{justifyContent: 'space-between', marginVertical: 30, paddingHorizontal: theme.sizes.base}}>
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
              style={{width: 20, height: 20}}
            />
            <Block flex={false}>
              <Text center small> {((1-food/30) * 100).toFixed(2)}% </Text>
              <Bar 
                style={styles.progressBar}
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
              style={{width: 20, height: 20}}
            />
            <Block flex={false}>
              <Text center small> 20°C </Text>
              <Bar 
                style={styles.progressBar}
                progress={4}
                indeterminate={false}
                borderColor='#648F5B'
                color='#648F5B'
                unfilledColor='whitesmoke'
              />
            </Block>
          </Block>
        </Block>
      </Block>
      <Block flex={0.4} style={{alignItems: 'flex-end', marginVertical: 20}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Actions')}>
          <Block row style={styles.card}>
            <Block middle center>
              <Text body semibold> Take </Text>
              <Text body semibold> Actions </Text>
            </Block>
            <Block center middle>
              <Image 
                source={require('../../assets/images/icons8-sort-right-26.png')}
                style={{width: 25, height: 25}}
              />
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
