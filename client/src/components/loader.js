import React from 'react'
import { Modal, StyleSheet, YellowBox } from 'react-native'

import LottieView from 'lottie-react-native'

import { Block } from './index'

const Loader = (props) => {
  const styles = StyleSheet.create({
    container: {
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
      width: 90,
      height: 90,
      backgroundColor: 'transparent',
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: -45,
      marginTop: -45
    }
  })

  YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView.getConstants"]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
    >
      <Block flex={false} style={styles.container}>
        <Block flex={false} style={styles.wrapper}>
          <LottieView 
            source={require('../../assets/loading.json')}
            autoPlay
            loop
          />
        </Block>
      </Block>
    </Modal>
  )
}

export default Loader
