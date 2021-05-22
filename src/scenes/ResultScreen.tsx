import * as React from 'react'
import { Text, View } from 'react-native'

export default function ResultScreen(props: { route: { params: { score: number } } }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{props.route.params.score}</Text>
    </View>
  )
}
