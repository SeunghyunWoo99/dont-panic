import React, { useRef } from 'react'
import { View, ScrollView } from 'react-native'
import { size } from 'utils'

const CARD_WIDTH = size.screenWidth
const CARD_HEIGHT = size.screenHeight

export default function TestScreen() {
  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.9}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center">
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: 'green',
          }}
        />
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: 'blue',
          }}
        />
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: 'purple',
          }}
        />
      </ScrollView>
    </View>
  )
}
