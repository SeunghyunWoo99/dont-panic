import React, { useEffect, useRef, useState } from 'react'
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
  scrollViewRef: React.RefObject<ScrollView>
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
                props.scrollViewRef.current?.scrollTo({ x: (props.cardIndex + 1) * CARD_WIDTH })
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
  /** 테스트 점수(높을 수록 코로나 감염자일 확률이 높음) */
  const [score, setScore] = useState(0)

  useEffect(() => {
    // 모든 질문에 답변을 했으면
    if (!answers.includes(undefined)) {
      fetch(
        // 서버 형식에 맞게 답변 결과 값 넣어서 url 구성
        answers.reduce(
          (acc, answer, index) => acc + `as${index + 1}=${Number(answer) + 1}&`,
          'http://52.78.126.183:3000/ows/survey?',
        ) as string,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((result) => {
          setScore(result.score)
        })
        .catch((error) => {
          console.error('코로나 자가 진단 결과를 불러오지 못 함', error)
        })
    }
  }, [answers])

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
          <TestCard
            key={index.toString()}
            cardIndex={index}
            data={item}
            answers={answers}
            setAnswers={setAnswers}
            scrollViewRef={scrollViewRef}
          />
        ))}
        {/* FIXME: 테스트 결과 보여주는 임시 카드 */}
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            paddingVertical: scale(100),
            paddingHorizontal: scale(24),
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: scale(88), fontWeight: 'bold', marginBottom: scale(32) }}>{score}</Text>
        </View>
      </ScrollView>
    </View>
  )
}
