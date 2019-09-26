import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'

import moment from 'moment'
import LottieView from 'lottie-react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { LinearGradient } from 'expo-linear-gradient'

import { changePhoto } from '../stores/actions'

import db from '../services/firebase'
import Loader from '../components/loader'
import * as theme from '../constats/theme'
import { Block, Text } from '../components'

const Logs = (props) => {
  
  const dispatch = useDispatch()
  const user  = useSelector(state => state.user)
  const [modalVisible, setModalVisible] = useState(false)
  const [changed, setChanged] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [isLogs, setIsLogs] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
      setIsLogs(querySnapshot.data().logs.reverse())
    })
  }, [])

  useEffect(() => {
    
  }, [isLogs])


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

  useEffect(() => {
    checkPermission()
  },[])

  useEffect(() => {
    setChanged(false)
  },[user.photo_path])

  const checkPermission = async () => {
    const granted = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (granted === Permissions.CAMERA_ROLL) return true
    else return false
  }

  const handleChangePhoto = async () => {
    if (checkPermission()){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,3],
        quality: 0.5,
        base64: true
      })
      
      if (!result.cancelled){
        let ext = result.uri.split('.')[1]
        const image = `data:image/${ext};base64,${result.base64}`
        dispatch(changePhoto(image, user.token))
        setChanged(user.isLoading)
      }
    }
  }

  return (
    <Block>
      <Loader modalVisible={user.isLoading} />
      <Block flex={false} row center style={{paddingHorizontal: theme.sizes.base * 2, justifyContent: 'space-between'}}>
        <Text h1 bold> Hey {user.fullname}! </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image 
              source={{uri: user.photo_path}}
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
          { isLogs ? null : (
            <Block center middle>
              <LottieView 
                source={require('../../assets/loading-2.json')}
                autoPlay
                loop
                style={{width: 100, height: 100}}
              />
            </Block>
          ) }
          <FlatList 
            data={isLogs}
            keyExtractor={(item, index) => String(index)}
            style={{marginVertical: 20}}
            pagingEnabled
            scrollEnabled
            scrollEventThrottle={16}
            snapToAlignment='center'
            renderItem={({item, index}) => (
              <Block row key={index} style={styles.card} >
                <Block middle style={{alignItems: 'flex-end', borderRightWidth: 1, borderRightColor: theme.colors.gray2 ,paddingHorizontal: 15}}>
                  <Text gray> {moment(new Date(item.toDate())).format('kk.mm')} </Text>
                </Block>
                <TouchableWithoutFeedback>
                  <Block middle style={{paddingHorizontal: 15}}>
                    <Text semibold body> Feeding Food </Text>
                    <Text gray> {moment(item.toDate()).fromNow()} </Text>
                  </Block>
                </TouchableWithoutFeedback>
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
                source={{uri: user.photo_path}}
                style={{width: 100, height: 100, borderRadius: 20, marginBottom: 5}}
              />
              <TouchableOpacity onPress={() => handleChangePhoto()}>
                <Text small style={{color: '#0000EE', marginVertical: 5}}> Change Profile Photo </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text small style={{color: '#0000EE'}}> Done </Text>
              </TouchableOpacity>
              { user.isError ? <Text small style={{backgroundColor: 'red'}}> *{user.isError} </Text> : null }
            </Block>
          </Block>
        </Block>
        <Loader modalVisible={changed}/>
      </Modal>
    </Block>
  )
}

const mock = [
  {
    id: 1,
    time: '02.00',
    created_at: new Date()
  },
  {
    id: 2,
    time: '04.00',
    created_at: new Date('2019-09-10')
  },
  {
    id: 3,
    time: '05.00',
    created_at: new Date('2019-09-12')
  },
  {
    id: 4,
    time: '02.00',
    date: '3 day ago',
    created_at: new Date('2019-09-13')
  },
  {
    id: 5,
    time: '02.00',
    date: '4 day ago',
    created_at: new Date('2019-08-10')
  },
  {
    id: 6,
    time: '02.00',
    date: '10 day ago',
    created_at: new Date('2019-08-22')
  },
  {
    id: 7,
    time: '02.00',
    date: '12 day ago',
    created_at: new Date('2019-09-13')
  },
  {
    id: 8,
    time: '12.02',
    date: '12 day ago',
    created_at: new Date('2019-09-01')
  },
  {
    id: 9,
    time: '15.01',
    date: '12 day ago',
    created_at: new Date('2019-09-02')
  },
  {
    id: 10,
    time: '12.12',
    date: '12 day ago',
    created_at: new Date('2019-09-03')
  },
  {
    id: 11,
    time: '00.00',
    date: '13 day ago',
    created_at: new Date('2019-09-04')
  },
  {
    id: 12,
    time: '16.32',
    date: '13 day ago',
    created_at: new Date('2019-09-05')
  },
  {
    id: 13,
    time: '19.00',
    date: '13 day ago',
    created_at: new Date('2019-09-06')
  },
  {
    id: 14,
    time: '18.00',
    date: '14 day ago',
    created_at: new Date('2019-09-07')
  },
  {
    id: 15,
    time: '09.43',
    date: '15 day ago',
    created_at: new Date('2019-09-08')
  }
]

Logs.defaultProps = { logs: mock }

export default Logs
