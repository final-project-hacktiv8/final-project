import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, ScrollView, Modal } from 'react-native'

import {LinearGradient} from 'expo-linear-gradient'

import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Logs = (props) => {
  
  const [modalVisible, setModalVisible] = useState(false)

  const styles = StyleSheet.create({
    container: {
      marginTop: 35
    },
    card: {
      paddingHorizontal: theme.sizes.base * 2, 
      justifyContent: 'space-between',
      width: '100%',
      height: 60
    },
    modalContainer: {
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    wrapper: {
      width: 200,
      height: 200,
      borderRadius: 15,
      backgroundColor: 'white',
      position: 'absolute',
      left: '35%',
      top: '40%',
      marginLeft: -40,
      marginTop: -20
    }
  })


  return (
    <Block>
      <Block flex={false} row center style={{paddingHorizontal: theme.sizes.base * 2, justifyContent: 'space-between'}}>
        <Text h1 bold> Hey Fauzi! </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image 
              source={require('../../assets/images/avatar_1x.jpg')}
              style={{ width: 50, height: 50, borderRadius: 20 }}
            />
          </TouchableOpacity>
      </Block>
      <LinearGradient 
        colors={['white', '#f9f6ea']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 55, 
          height: 30
        }}
      />
      <Block style={styles.container}> 
        <ScrollView style={{backgroundColor: '#f9f6ea'}}>
          <Text h3 semibold center> History </Text>
          <FlatList 
            data={props.logs}
            keyExtractor={(item, index) => String(index)}
            style={{marginVertical: 20}}
            pagingEnabled
            scrollEnabled
            scrollEventThrottle={16}
            snapToAlignment='center'
            renderItem={({item, index}) => (
              <Block row key={index} style={styles.card} >
                <Block middle style={{alignItems: 'flex-end', borderRightWidth: 1, borderRightColor: theme.colors.gray2 ,paddingHorizontal: 15}}>
                  <Text gray> {item.time} </Text>
                </Block>
                <Block middle style={{paddingHorizontal: 15}}>
                  <Text semibold body> Feeding Food </Text>
                  <Text gray> {item.date} </Text>
                </Block>
              </Block>
            )}
          />
        </ScrollView>
      </Block>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >
        <Block flex={false} style={styles.modalContainer}>
          <Block flex={false} style={styles.wrapper}>
            <Block center middle>
              <Image 
                source={require('../../assets/images/avatar_1x.jpg')}
                style={{width: 100, height: 100, borderRadius: 20, marginBottom: 5}}
              />
              <TouchableOpacity>
                <Text small style={{color: '#0000EE', marginVertical: 5}}> Change Profile Photo </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text small style={{color: '#0000EE'}}> Cancel </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Modal>
    </Block>
  )
}

const mock = [
  {
    id: 1,
    time: '02.00',
    date: '2 day ago'
  },
  {
    id: 2,
    time: '04.00',
    date: '2 day ago'
  },
  {
    id: 3,
    time: '05.00',
    date: '2 day ago'
  },
  {
    id: 4,
    time: '02.00',
    date: '3 day ago'
  },
  {
    id: 5,
    time: '02.00',
    date: '4 day ago'
  },
  {
    id: 6,
    time: '02.00',
    date: '10 day ago'
  },
  {
    id: 7,
    time: '02.00',
    date: '12 day ago'
  },
  {
    id: 8,
    time: '12.02',
    date: '12 day ago'
  },
  {
    id: 9,
    time: '15.01',
    date: '12 day ago'
  },
  {
    id: 10,
    time: '12.12',
    date: '12 day ago'
  },
  {
    id: 11,
    time: '00.00',
    date: '13 day ago'
  },
  {
    id: 12,
    time: '16.32',
    date: '13 day ago'
  },
  {
    id: 13,
    time: '19.00',
    date: '13 day ago'
  },
  {
    id: 14,
    time: '18.00',
    date: '14 day ago'
  },
  {
    id: 15,
    time: '09.43',
    date: '15 day ago'
  }
]

Logs.defaultProps = { logs: mock }

export default Logs
