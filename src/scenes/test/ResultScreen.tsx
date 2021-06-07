import React, { useEffect, useRef } from 'react'
import { Text, View, Animated, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { color, size } from 'utils'

export default function ResultScreen(props: { route: { params: { score: number } } }) {
  const navigation = useNavigation()

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
        <View style={{ backgroundColor: '#75d178', opacity: 0.8, height: '100%', width: size.screenHeight }} />
        <LottieView autoPlay speed={2} style={{ height: '100%' }} source={require('lotties/wave.json')} />
      </Animated.View>
      <Text
        style={{
          color: color.text.primary,
          fontSize: scale(28),
          fontWeight: 'bold',
          marginLeft: scale(24),
          position: 'absolute',
          textAlign: 'center',
          top: scale(96),
        }}>
        {(function () {
          switch (true) {
            case score < 20:
              return '코로나일 가능성이 낮아요.\n개인 방역 수칙을 준수하세요.'
            case score < 40:
              return '코로나일 가능성이 있어요.\n근처 병원을 방문해 정밀 검진을\n받아보세요.'
            case score < 60:
              return '코로나가 의심돼요.\n내 주변 병원이\n어디에 있는지 알아보세요.'
            case score < 80:
              return '위험!\n정밀 검진을 받아보세요'
            default:
              return '위험!\n정밀 검진을 받아보세요'
          }
        })()}
      </Text>
      <Text
        style={{
          color: color.text.hint,
          fontSize: scale(12),
          marginLeft: scale(24),
          alignSelf: 'flex-end',
          textAlign: 'center',
          bottom: -scale(122),
        }}>
        {'*정확한 진단결과를 보장하지 않습니다.'}
      </Text>
      <Text style={{ position: 'absolute', fontSize: scale(64), fontWeight: 'bold' }}>{score}</Text>
      <Pressable
        style={{
          width: scale(240),
          height: scale(48),
          borderRadius: scale(30),
          backgroundColor: color.button.primary,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          position: 'absolute',
          bottom: verticalScale(124),
        }}
        onPress={() => navigation.navigate('MainTabNavigator', { screen: 'MapScreen' })}>
        <Text style={{ fontSize: scale(18), fontWeight: 'bold', color: color.text.button }}>내 주변 병원 찾기</Text>
      </Pressable>
      <Pressable
        style={{
          width: scale(240),
          height: scale(48),
          borderRadius: scale(30),
          backgroundColor: color.button.secondary,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          position: 'absolute',
          bottom: verticalScale(60),
        }}
        onPress={() => navigation.navigate('MainTabNavigator', { screen: 'PostScreen' })}>
        <Text style={{ fontSize: scale(18), fontWeight: 'bold', color: color.text.main }}>코로나 현황 보기</Text>
      </Pressable>
      <Pressable
        style={{
          position: 'absolute',
          bottom: verticalScale(28),
        }}
        onPress={() => navigation.goBack()}>
        <Text
          style={{
            fontSize: scale(16),
            color: color.text.button,
            textDecorationLine: 'underline',
          }}>
          {'테스트 다시 하기'}
        </Text>
      </Pressable>
    </View>
  )
}
