import React, { useRef } from 'react'
import { View, ScrollView, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import LottieView from 'lottie-react-native'
import { color, size } from 'utils'

/** 질문 카드의 너비: 전체 화면 너비 */
const CARD_WIDTH = size.screenWidth
/** 질문 카드의 높이: 전체 화면 높이 */
const CARD_HEIGHT = size.screenHeight

export default function TutorialScreen() {
  const navigation = useNavigation()

  /** 다음으로 넘어가기 위한 ScrollView ref */
  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <View style={{ flex: 1 }}>
      {/* 수평으로 scroll 되는 ScrollView */}
      <ScrollView
        horizontal
        pagingEnabled
        bounces={false}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.9}
        // ScrollView를 페이징 되게 하는 props들, 카드를 넘기 듯이 snap 됨
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center">
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            paddingVertical: verticalScale(88),
            paddingHorizontal: scale(32),
            backgroundColor: color.background.primary,
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay
            style={{ width: '110%', alignSelf: 'center', top: -verticalScale(4) }}
            source={require('lotties/map.json')}
          />
          <View>
            <Text
              style={{
                fontSize: scale(32),
                color: color.text.primary,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {'집에서 가까운 병원'}
            </Text>
            <Text
              style={{
                fontSize: scale(16),
                color: color.text.primary,
                textAlign: 'center',
                marginTop: verticalScale(24),
              }}>
              {'내 주변의 코로나 안심 병원을 찾아보세요.'}
            </Text>
          </View>
          <Pressable
            style={{
              width: scale(220),
              height: scale(50),
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
              bottom: verticalScale(60),
            }}
            onPress={() => scrollViewRef.current?.scrollTo({ x: 1 * CARD_WIDTH })}>
            <Text style={{ fontSize: scale(20), fontWeight: 'bold', color: color.text.button }}>다음</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            paddingVertical: verticalScale(88),
            paddingHorizontal: scale(32),
            backgroundColor: color.background.primary,
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay
            style={{ width: '120%', alignSelf: 'center', top: verticalScale(4) }}
            source={require('lotties/post.json')}
          />
          <View style={{ marginTop: verticalScale(60) }}>
            <Text
              style={{
                fontSize: scale(32),
                color: color.text.primary,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {'최신 뉴스'}
            </Text>
            <Text
              style={{
                fontSize: scale(16),
                color: color.text.primary,
                textAlign: 'center',
                marginTop: verticalScale(24),
              }}>
              {'코로나 관련 최신 소식들을 가장 먼저 받아보세요.'}
            </Text>
          </View>
          <Pressable
            style={{
              width: scale(220),
              height: scale(50),
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
              bottom: verticalScale(60),
            }}
            onPress={() => scrollViewRef.current?.scrollTo({ x: 2 * CARD_WIDTH })}>
            <Text style={{ fontSize: scale(20), fontWeight: 'bold', color: color.text.button }}>다음</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            paddingVertical: verticalScale(88),
            paddingHorizontal: scale(32),
            backgroundColor: color.background.primary,
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay
            style={{ width: '120%', alignSelf: 'center', top: -verticalScale(16) }}
            source={require('lotties/test.json')}
          />
          <View style={{ marginTop: -verticalScale(36) }}>
            <Text
              style={{
                fontSize: scale(32),
                color: color.text.primary,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {'으슬으슬... 에취!'}
            </Text>
            <Text
              style={{
                fontSize: scale(16),
                color: color.text.primary,
                textAlign: 'center',
                marginTop: verticalScale(24),
              }}>
              {'앗... 코로나일까? 코로나 자가 진단 테스트를 해보세요.'}
            </Text>
          </View>
          <Pressable
            style={{
              width: scale(220),
              height: scale(50),
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
              bottom: verticalScale(60),
            }}
            onPress={() => navigation.navigate('TestScreen')}>
            <Text style={{ fontSize: scale(20), fontWeight: 'bold', color: color.text.button }}>다음</Text>
          </Pressable>
          <Pressable
            style={{
              position: 'absolute',
              bottom: verticalScale(28),
            }}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontSize: scale(14),
                color: color.text.secondary,
                textDecorationLine: 'underline',
              }}>
              {'다음에 할게요'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
