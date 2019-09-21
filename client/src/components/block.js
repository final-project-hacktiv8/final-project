import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import * as theme from '../constats/theme'

export default class Block extends Component {

  render() {
    const { 
      flex,
      center, // align vertically
      middle, // align horizontally
      row, 
      space,
      column,
      style,
      card,
      shadow,
      end,
      children,
      ...props
    } = this.props

    const blockStyles = [
      styles.block,
      flex && {flex},
      flex == false && {flex: 0}, // reset, disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      end && styles.end,
      card && styles.card,
      shadow && styles.shadow,
      style, //rewrite predefined styles
    ]

    return (
      <View style={blockStyles} {...props}>
        { children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  card: {
    borderRadius: theme.sizes.border
  },  
  center: {
    alignItems: 'center'
  },
  middle: {
    justifyContent: 'center'
  },
  end: {
    justifyContent: 'flex-end'
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }
})