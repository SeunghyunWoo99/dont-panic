import React, { useRef } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { scale } from 'react-native-size-matters'
import { size } from 'utils'

const CARD_WIDTH = size.screenWidth
const CARD_HEIGHT = size.screenHeight

interface IQUESTION {
  question: string
}

const DATA: IQUESTION[] = [
  { question: '나이가 어떻게 되세요?' },
  { question: '최근 앓고있는 혹은 최근 2년간 앓았던 호흡기 질환이 있으신가요? (단순 감기, 독감 제외)' },
  { question: '현재 채온이 얼마나 되나요?' },
  { question: '코, 목 혹은 코와 목사이에 통증이 있나요?' },
  { question: '다른 증상과 비교했을때 발열 증상이 언제 나타났나요?' },
  { question: '숨이 가빠진걸 느껴본적이 있으세요?' },
  { question: '겪고있는 증상중에 마른 기침 증상이 있나요?' },
  { question: '피로감이 있나요?' },
  { question: '미각 혹은 후각기능의 저하가 있나요?' },
  { question: '앓고있는 증상 중 근육통이 있나요?' },
]

function TestCard(props: { data: IQUESTION }) {
  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        paddingVertical: scale(128),
        paddingHorizontal: scale(24),
        backgroundColor: 'white',
      }}>
      <Text style={{ fontSize: scale(26), fontWeight: 'bold' }}>{props.data.question}</Text>
    </View>
  )
}

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
        {DATA.map((item) => (
          <TestCard data={item} />
        ))}
      </ScrollView>
    </View>
  )
}
