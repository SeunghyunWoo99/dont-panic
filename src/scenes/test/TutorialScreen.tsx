import React from 'react'
import { Text, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export default function TutorialScreen() {
  return (
    <View style={{ flex: 1, paddingHorizontal: scale(24), paddingTop: verticalScale(128) }}>
      <Text style={{ fontSize: scale(48), fontWeight: 'bold' }}>어서오세요</Text>
    </View>
  )
}
