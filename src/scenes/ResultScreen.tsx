import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import AnimatedLottieView from 'lottie-react-native'
import { scale } from 'react-native-size-matters'
import { transform } from '@babel/core'

export default function ResultScreen(props: { route: { params: { score: number } } }) {
  const lottieRef = useRef<AnimatedLottieView>(null)
  const { score } = props.route.params

  // useEffect(() => {
  //   // lottieRef.current?.play(71, 71)
  //   lottieRef.current?.play(0, Math.floor((71 * score) / 100))
  // }, [score])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ transform: [{ rotate: '-90deg' }] }}>
        <LottieView
          ref={lottieRef}
          autoPlay
          // loop={false}
          speed={2}
          style={{ width: scale(580) }}
          source={require('lotties/wave.json')}
        />
      </View>
      <Text style={{ position: 'absolute', fontSize: scale(64), fontWeight: 'bold' }}>{props.route.params.score}</Text>
    </View>
  )
}
