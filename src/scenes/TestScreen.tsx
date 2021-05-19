import React, { useRef, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { size } from 'utils'

const CARD_WIDTH = size.screenWidth
const CARD_HEIGHT = size.screenHeight

interface IQUESTION {
  question: string
  choices: string[]
}

const DATA: IQUESTION[] = [
  { question: '나이가 어떻게 되세요?', choices: ['0-10', '10-20', '20-30', '30-40', '40-60', '60 이상'] },
  {
    question: '최근 앓고있는 혹은 최근 2년간 앓았던 호흡기 질환이 있으신가요? (단순 감기, 독감 제외)',
    choices: ['네', '아니오'],
  },
  { question: '현재 체온이 37.5도 이상인가요?', choices: ['네', '아니오'] },
  { question: '코, 목 혹은 코와 목사이에 통증이 있나요?', choices: ['네', '아니오'] },
  { question: '다른 증상과 비교했을때 발열 증상이 언제 나타났나요?', choices: ['가장 먼저', '중반', '후반'] },
  { question: '숨이 가빠진걸 느껴본적이 있으세요?', choices: ['네', '아니오'] },
  { question: '겪고있는 증상중에 마른 기침 증상이 있나요?', choices: ['네', '아니오'] },
  { question: '피로감이 있나요?', choices: ['네', '아니오'] },
  { question: '미각 혹은 후각기능의 저하가 있나요?', choices: ['네', '아니오'] },
  { question: '앓고있는 증상 중 근육통이 있나요?', choices: ['네', '아니오'] },
]

function TestCard(props: {
  data: IQUESTION
  cardIndex: number
  answers: (string | undefined)[]
  setAnswers: React.Dispatch<React.SetStateAction<(string | undefined)[]>>
}) {
  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        paddingVertical: verticalScale(88),
        paddingHorizontal: scale(24),
        backgroundColor: 'white',
      }}>
      <Text style={{ fontSize: scale(26), fontWeight: 'bold', marginBottom: scale(32) }}>{props.data.question}</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {props.data.choices.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              props.setAnswers((prev) => {
                const array = [...prev]
                array[props.cardIndex] = index.toString()
                return array
              })
            }}
            style={{
              width: '100%',
              height: scale(56),
              borderRadius: scale(6),
              justifyContent: 'center',
              margin: scale(8),
              paddingLeft: scale(32),
              backgroundColor: index.toString() === props.answers[props.cardIndex] ? '#57B1A666' : '#f5f5f5',
            }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default function TestScreen() {
  const scrollViewRef = useRef<ScrollView>(null)
  /** 질문에 대한 답 배열 */
  const [answers, setAnswers] = useState(new Array<string | undefined>(10))

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
        {DATA.map((item, index) => (
          <TestCard key={index.toString()} cardIndex={index} data={item} answers={answers} setAnswers={setAnswers} />
        ))}
      </ScrollView>
    </View>
  )
}
