import React, { useEffect, useRef } from 'react'
import { Text, View, Animated } from 'react-native'
import LottieView from 'lottie-react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { size } from 'utils'

export default function ResultScreen(props: { route: { params: { score: number } } }) {
  /** 코로나 자가진단 테스트 결과 점수 */
  const { score } = props.route.params
  /** 점수에 비례해 올라오는 웨이브 높이 */
  const translateX = useRef(new Animated.Value(0)).current

  // 점수가 바뀌면 웨이브 차는 애니메이션 실행
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: (size.screenHeight * score) / 100,
      duration: 3000,
      useNativeDriver: true,
    }).start()
  }, [score, translateX])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={{
          opacity: 0.4,
          // lottie 파일을 수직으로 된 것으로 구해서 어쩔 수 없이 270도 회전, 다른 스타일도 거기에 맞춰 줌
          transform: [{ rotate: '270deg' }, { translateX }],
          height: size.screenWidth,
          flexDirection: 'row',
          alignItems: 'center',
          bottom: -verticalScale(620),
        }}>
        {/* 구한 lottie 파일의 높이가 낮아서 밑 부분을 같은 색으로 붙여 줌 */}
        <View style={{ backgroundColor: '#75d178', opacity: 0.9, height: '100%', width: size.screenHeight }} />
        <LottieView autoPlay speed={2} style={{ height: '100%' }} source={require('lotties/wave.json')} />
      </Animated.View>
      <Text style={{ position: 'absolute', fontSize: scale(64), fontWeight: 'bold' }}>{score}</Text>
    </View>
  )
}
