import React, { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { size } from 'utils'

/** 질문 카드의 너비: 전체 화면 너비 */
const CARD_WIDTH = size.screenWidth
/** 질문 카드의 높이: 전체 화면 높이 */
const CARD_HEIGHT = size.screenHeight

interface IQuestion {
  /** 질문 */
  question: string
  /** 선택지 */
  choices: string[]
}

/** 질문 데이터 [노션 문서 참고](https://www.notion.so/ddb72faa4b224a56a46db301cc464196) */
const DATA: IQuestion[] = [
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

interface ITestCardProps {
  /** 질문 data */
  data: IQuestion
  /** 몇 번 쨰 질문인지 index */
  cardIndex: number
  /** 질문에 대한 전체 답변을 저장한 배열 */
  answers: (string | undefined)[]
  /** 답변 배열 set 함수 */
  setAnswers: React.Dispatch<React.SetStateAction<(string | undefined)[]>>
  /** 다음 질문으로 animate 하기 위한 ScrollView ref */
  scrollViewRef: React.RefObject<ScrollView>
}

/** 질문 카드 */
function TestCard(props: ITestCardProps) {
  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        paddingVertical: verticalScale(88),
        paddingHorizontal: scale(24),
        backgroundColor: 'white',
      }}>
      {/* 질문 */}
      <Text style={{ fontSize: scale(26), fontWeight: 'bold', marginBottom: scale(32) }}>{props.data.question}</Text>
      {/* 객관식 선택지 */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {props.data.choices.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              props.setAnswers((prev) => {
                const array = [...prev]
                // 답변 선택 시 array 업데이트
                array[props.cardIndex] = index.toString()
                // 다음 질문으로 animate
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
              // 선택된 답변은 하이라이트
              backgroundColor: index.toString() === props.answers[props.cardIndex] ? '#57B1A666' : '#f5f5f5',
            }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

/** 코로나 자가진단 테스트 화면 */
export default function TestScreen() {
  /** 답변 완료 시 다음 질문으로 넘어가기 위한 ScrollView ref */
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
          // 서버엔 질문, 선택지 인덱스가 1부타 시작하므로 각각 1씩 더해 줌
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
      {/* 수평으로 scroll 되는 ScrollView */}
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.9}
        // ScrollView를 페이징 되게 하는 props들, 카드를 넘기 듯이 snap 됨
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center">
        {/* 질문 카드들 */}
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
