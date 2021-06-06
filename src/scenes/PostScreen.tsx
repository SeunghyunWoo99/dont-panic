import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View, FlatList, ScrollView, Image, Pressable, StyleSheet, Animated, Easing } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import AnimatedLottieView from 'lottie-react-native'
import LottieView from 'lottie-react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { parse } from 'fast-xml-parser'
import moment from 'moment'
import { API_KEY, color, size } from 'utils'

interface IData {
  key: string
  title: string
  description: string
  url: string
  images: string[]
}

const DATA: IData[] = [
  {
    key: '0',
    title:
      '[코로나19-중앙방역대책본부] “30세 미만 필수인력 등 다음 주부터 화이자백신 접종 예약 시작” (6월 1일 오후 브리핑)',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5198934',
    description:
      '아스트라제네카 백신 접종 대상에서 제외된 30세 미만에 대해 다음주부터 화이자백신 접종 예약이 시작됩니다. 예약을 받는 우선 접종 대상은 사회필수인력, 취약시설 종사자 등입니다. 지금까지 올림픽 참가가 예정된 국가대표팀 선수 등 특수한 경우를 제외하고 30세 미만은 백신 접종을 받지 못했지만, 30세 미만에 대해서도 백신 접종이 시작되는 것입니다. 중앙방역대책본부는 오늘(1일) 오후 정례브리핑에서 "현재 예방접종센터에서는 75세 이상 어르신에 대한 화이자백신 1차 접종을 6월 13일까지 완료하는 것을 목표로 한다"며, "이어 2차 접종에 집중함과 동시에 아스트라제네카 접종 대상에서 제외된 30세 미만 2분기 접종대상자에게 화이자 백신 접종을 시작한다"고 밝혔습니다.',
    images: ['https://news.kbs.co.kr/special/covid19/covid19_thumnail_2105.png'],
  },
  {
    key: '1',
    title: '코로나19 백신 접종 사전예약 이렇게 하세요',
    url: 'https://mediahub.seoul.go.kr/archives/2001580',
    description:
      '내일(10일)부터 65세부터 69세 어르신들에 대한 코로나19 백신 접종 예약이 시작됩니다. 예약은 온라인 사전예약 사이트(ncvr.kdca.go.kr)나 질병관리청 콜센터, 1339 등을 통해 할 수 있는데, 접종 대상자가 60세 이상 고령층인 만큼 자녀들이 본인 인증만 거치면 부모님을 대신해 예약하는 것도 가능합니다.',
    images: ['https://image.imnews.imbc.com/newszoomin/groupnews/groupnews_9/corona19_inthum.png'],
  },
  {
    key: '2',
    title: '이틀간 이상반응 2천222건↑…사망신고 10명↑, 인과성 미확인',
    url: 'https://imnews.imbc.com/news/2021/society/article/6224047_34873.html',
    description:
      '코로나19 백신 접종이 꾸준히 진행되는 가운데 접종 후 이상반응을 신고하는 사례가 최근 이틀간 2천여건으로 집계됐습니다.',
    images: [
      'https://image.imnews.imbc.com/news/2021/society/article/__icsFiles/afieldfile/2021/06/02/h2021060213.jpg',
    ],
  },
  {
    key: '3',
    title: '타이레놀 품귀에 대한약사회 "동일한 약 있으니 안심하세요',
    url: 'https://imnews.imbc.com/news/2021/society/article/6223647_34873.html',
    description:
      '코로나19 백신 접종이 본격화되면서 해열진통제인 \'타이레놀\' 품귀 현상이 벌어지자 대한약사회가 "굳이 타이레놀을 고집할 필요가 없다"며 진화에 나섰습니다.',
    images: [
      'https://image.imnews.imbc.com/news/2021/society/article/__icsFiles/afieldfile/2021/06/02/joo210602_1.jpg',
    ],
  },
  {
    key: '4',
    title: '미국이 제공한 얀센 100만명분, 30세 이상 예비군-민방위 대원이 맞는다',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5197299',
    description:
      '미국 정부가 우리 군에 존슨앤존슨사가 개발한 코로나19 얀센 백신 100만 명분을 제공하기로 한 가운데, 이 백신은 30세 이상 예비군과 민방위 대원 등이 맞게 됩니다.',
    images: ['https://news.kbs.co.kr/data/news/2021/05/30/20210530_tV5n9I.jpg'],
  },
  {
    key: '5',
    title: '백신 접종 예방효과는?…‘마스크 벗기’ 시기상조?',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5194747',
    description:
      '[앵커] 야외에서라도 마스크를 벗을 수 있으면 좋겠다, 반면 하루 6,7백명씩 확진자가 나오는 상황인데 시기상조다.. 이런 의견도 있습니다.',
    images: ['https://news.kbs.co.kr/data/news/title_image/newsmp4/news9/2021/05/26/40_5194747.jpg'],
  },
  {
    key: '6',
    title: '[코로나19-중앙방역대책본부] “185.1만 명 2차 접종까지 완료” - 5월 25일 오후 브리핑',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5193457',
    description:
      '어제 하루 17만 3천 명이 코로나 백신 예방접종을 마쳤습니다. 중앙방역대책본부는 오늘(25일) 오후 정례브리핑에서, "25일 0시 기준으로 1차 접종은 7만 1천 명, 2차 접종은 10만 2천 명이 백신 접종을 완료했다"며, "총 185만 1천 명(전체 인구 대비 3.6%)이 2차 접종까지 완료했다"고 밝혔습니다.',
    images: ['https://news.kbs.co.kr/data/news/2021/05/25/20210525_AkHviZ.jpg'],
  },
  {
    key: '7',
    title: '백신 맞으면 7월부터 야외서 마스크 벗는다…다음 달부터는 가족모임 인원서 제외',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5194326',
    description:
      '코로나19 백신을 한번이라도 접종한 사람은 7월부터 야외에서 마스크를 쓰지 않아도 됩니다. 다음달부터는 백신 접종자는 가족 모임 제한 인원수에서 제외합니다.',
    images: ['https://news.kbs.co.kr/data/news/2021/05/26/20210526_10vUpb.jpg'],
  },
  {
    key: '8',
    title: '예약 취소한 ‘코로나19 백신’, 네이버·카카오 통해 27일부터 당일 예약',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5186099',
    description:
      '코로나19 백신 예약 취소로 생기는 잔여 백신을 네이버, 카카오를 통해 당일 예약을 할 수 있게 됩니다. 코로나19 예방접종추진단은 65세 이상 고령층 예방접종이 시행되는 오는 27일부터 예약 취소 등으로 발생하는 잔여 백신을 네이버와 카카오를 통해 신속하게 예약하여 접종할 수 있도록 할 예정입니다.',
    images: ['https://news.kbs.co.kr/data/news/2021/05/14/20210514_9veu12.jpg'],
  },
  {
    key: '9',
    title: '백신 접종률 올리기 위한 고육책…접종 증명 어떻게?',
    url: 'https://news.kbs.co.kr/news/view.do?ncd=5194746',
    description:
      '[앵커] 이런 혜택들, 요양시설에도 적용됩니다. 다음달부터 얼굴 맞대고, 접촉 면회를 할 수 있는데 조건이 있습니다. 면회하는 사람은 두 차례 접종을 모두 마치고 나서 2주가 지나야 합니다. 이 경우에도 마스크 착용같은 방역 수칙은 지켜야 합니다.',
    images: ['https://news.kbs.co.kr/special/covid19/covid19_thumnail_2105.png'],
  },
]

/** 보드 카드의 너비: 전체 화면 너비 */
const CARD_WIDTH = size.screenWidth * 0.84
/** 보드 카드의 수평 마진 */
const CARD_MARGIN_HORIZONTAL = size.screenWidth * 0.08
/** 보드 카드의 높이: 전체 화면 높이 */
const CARD_HEIGHT = scale(200)

const refreshAnimation = require('lotties/refresh1.json')

const refreshingHeight = verticalScale(120)

const styles = StyleSheet.create({
  row: {
    height: verticalScale(100),
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  rowTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  lottieView: {
    height: refreshingHeight - verticalScale(20),
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
})

/** 코로나 관련 현황을 보여주는 개별 카드 */
const CoronaBoardCard = styled(View)`
  flex: 1;
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  margin-horizontal: ${CARD_MARGIN_HORIZONTAL};
  margin-vertical: ${scale(24)};
  margin-top: ${scale(36)};
  padding-horizontal: ${scale(16)};
  padding-vertical: ${scale(12)};
  border-radius: ${scale(6)};
  shadow-offset: 8px 8px;
  shadow-opacity: 0.1;
  background-color: white;
  align-items: center;
  justify-content: center;
`

const CoronaBoardCardMolecule = styled(View)`
  flex: 1;
  flex-direction: row;
`

const CoronaBoardCardAtom = (props: { title: string; count: number; difference: number; colorIndex: number }) => {
  const colors = ['#FF324F', '#2661FF', '#333333', '#FF8A00']

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors[props.colorIndex], fontSize: scale(14) }}>{props.title}</Text>
      <Text
        style={{ color: colors[props.colorIndex], fontSize: scale(18), fontWeight: 'bold', marginVertical: scale(2) }}>
        {props.count.toLocaleString()}
      </Text>
      <Text style={{ color: colors[props.colorIndex], fontSize: scale(12) }}>
        {props.difference.toLocaleString() + (props.difference > 0 ? '▲' : '▼')}
      </Text>
    </View>
  )
}

/** 코로나 국내 발생 현황 데이터 타입 */
interface IDomecticStatus {
  decideCnt: number
  clearCnt: number
  deathCnt: number
  examCnt: number
}

/** 코로나 시도별 발생 현황 데이터 타입 */
interface IRegionalStatus {
  defCnt: number
  deathCnt: number
  isolClearCnt: number
  isolIngCnt: number
  incDec: number
  localOccCnt: number
  overFlowCnt: number
  gubun: string
}

/** 코로나 카드들이 수평으로 위치한 보드 */
function CoronaBoard(props: { domesticStatus?: IDomecticStatus[]; regionalStatus?: IRegionalStatus[] }) {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.background.secondary }}>
      {/* 수평으로 scroll 되는 ScrollView */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.9}
        // ScrollView를 페이징 되게 하는 props들, 카드를 넘기 듯이 snap 됨
        snapToInterval={CARD_WIDTH + 2 * CARD_MARGIN_HORIZONTAL}
        snapToAlignment="center">
        {/* 0 */}
        <CoronaBoardCard key={'0'}>
          {props.domesticStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'확진자'}
                  count={props.domesticStatus[0]?.decideCnt ?? '--'}
                  difference={props.domesticStatus[0]?.decideCnt - props.domesticStatus[1]?.decideCnt ?? '--'}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'격리해제'}
                  count={props.domesticStatus[0]?.clearCnt ?? '--'}
                  difference={props.domesticStatus[0]?.clearCnt - props.domesticStatus[1]?.clearCnt ?? '--'}
                  colorIndex={1}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'사망자'}
                  count={props.domesticStatus[0]?.deathCnt ?? '--'}
                  difference={props.domesticStatus[0]?.deathCnt - props.domesticStatus[1]?.deathCnt ?? '--'}
                  colorIndex={2}
                />
                <CoronaBoardCardAtom
                  title={'검사진행'}
                  count={props.domesticStatus[0]?.examCnt ?? '--'}
                  difference={props.domesticStatus[0]?.examCnt - props.domesticStatus[1]?.examCnt ?? '--'}
                  colorIndex={3}
                />
              </CoronaBoardCardMolecule>
            </>
          )}
        </CoronaBoardCard>
        {/* 1 */}
        <CoronaBoardCard key={'1'}>
          {props.regionalStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'확진자'}
                  count={props.regionalStatus[0]?.defCnt ?? '--'}
                  difference={props.regionalStatus[0]?.defCnt - props.regionalStatus[1]?.defCnt ?? '--'}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'사망자'}
                  count={props.regionalStatus[0]?.deathCnt ?? '--'}
                  difference={props.regionalStatus[0]?.deathCnt - props.regionalStatus[1]?.deathCnt ?? '--'}
                  colorIndex={1}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'격리해제'}
                  count={props.regionalStatus[0]?.isolClearCnt ?? '--'}
                  difference={props.regionalStatus[0]?.isolClearCnt - props.regionalStatus[1]?.isolClearCnt ?? '--'}
                  colorIndex={2}
                />
                <CoronaBoardCardAtom
                  title={'치료 중'}
                  count={props.regionalStatus[0]?.isolIngCnt ?? '--'}
                  difference={props.regionalStatus[0]?.isolIngCnt - props.regionalStatus[1]?.isolIngCnt ?? '--'}
                  colorIndex={3}
                />
              </CoronaBoardCardMolecule>
            </>
          )}
        </CoronaBoardCard>
        {/* 2 */}
        <CoronaBoardCard key={'2'}>
          {props.regionalStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'일일 확진자'}
                  count={props.regionalStatus[0]?.incDec ?? '--'}
                  difference={props.regionalStatus[0]?.incDec - props.regionalStatus[1]?.incDec ?? '--'}
                  colorIndex={2}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'국내발생'}
                  count={props.regionalStatus[0]?.localOccCnt ?? '--'}
                  difference={props.regionalStatus[0]?.localOccCnt - props.regionalStatus[1]?.localOccCnt ?? '--'}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'해외유입'}
                  count={props.regionalStatus[0]?.overFlowCnt ?? '--'}
                  difference={props.regionalStatus[0]?.overFlowCnt - props.regionalStatus[1]?.overFlowCnt ?? '--'}
                  colorIndex={1}
                />
              </CoronaBoardCardMolecule>
            </>
          )}
        </CoronaBoardCard>
        {/* 3 */}
        <CoronaBoardCard key={'3'}>
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: 'bold',
              top: -scale(16),
              color: color.text.primary,
            }}>
            거리두기 단계
          </Text>
          <Text style={{ fontSize: scale(72), fontWeight: 'bold', color: color.text.primary }}>2</Text>
          <Text
            style={{
              fontSize: scale(12),
              position: 'absolute',
              bottom: scale(12),
              right: scale(18),
              color: color.text.secondary,
            }}>
            *21.5.24~6.13
          </Text>
        </CoronaBoardCard>
      </ScrollView>
    </View>
  )
}

function Post(props: { data: IData }) {
  const navigation = useNavigation()
  const { data } = props

  return (
    <Pressable
      onPress={() => navigation.navigate('PostWebViewScreen', { uri: data.url })}
      style={{
        width: '100%',
        height: 100,
        borderBottomWidth: scale(1),
        borderColor: color.divider,
        backgroundColor: 'white',
        paddingVertical: scale(6),
        paddingHorizontal: scale(12),
        justifyContent: 'center',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: scale(64),
            height: scale(64),
            borderRadius: scale(12),
            marginRight: scale(12),
            backgroundColor: color.background.secondary,
          }}
          source={{ uri: data.images[0] }}
        />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={{ fontSize: scale(15), color: color.text.primary, marginBottom: scale(4) }}>
            {data.title}
          </Text>
          <Text numberOfLines={2} style={{ fontSize: scale(11), color: color.text.secondary }}>
            {data.description}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default function PostScreen() {
  const [offsetY, setOffsetY] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [extraPaddingTop] = useState(new Animated.Value(0))

  const lottieViewRef = useRef<AnimatedLottieView>(null)

  /** 국내 전체 발생 현황 */
  const [domesticStatus, setDomesticStatus] = useState<IDomecticStatus[]>()
  /** 지역 발생 현황 */
  const [regionalStatus, setRegionalStatus] = useState<IRegionalStatus[]>()

  const fetchData = useCallback(() => {
    var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + API_KEY
    queryParams +=
      '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(moment().subtract(1, 'd').format('YYYYMMDD'))
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(moment().format('YYYYMMDD'))

    fetch(url + queryParams)
      .then((response) => response.text())
      .then((responseText) => {
        setDomesticStatus(parse(responseText).response.body.items.item)
      })
      .catch((error) => {
        console.log('코로나 현황 불러오기 실패: ', error)
      })

    var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + API_KEY
    queryParams +=
      '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(moment().subtract(1, 'd').format('YYYYMMDD'))
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(moment().format('YYYYMMDD'))

    fetch(url + queryParams)
      .then((response) => response.text())
      .then((responseText) => {
        setRegionalStatus(
          // FIXME: 실제 지역 연결 전 임시로 서울로 설정
          parse(responseText).response.body.items.item.filter((status: IRegionalStatus) => status.gubun === '서울'),
        )
      })
      .catch((error) => {
        console.log('코로나 시도별 현황 불러오기 실패: ', error)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start()
      lottieViewRef.current?.play()
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start()
    }
  }, [extraPaddingTop, isRefreshing])

  function onScroll(event) {
    const { nativeEvent } = event
    const { contentOffset } = nativeEvent
    const { y } = contentOffset
    setOffsetY(y)
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true)
      setTimeout(() => {
        setIsRefreshing(false)
        fetchData()
      }, 3000)
    }
  }

  let progress = 0

  if (offsetY < 0 && !isRefreshing) {
    progress = offsetY / -refreshingHeight
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: size.screenWidth,
          height: verticalScale(300),
          backgroundColor: '#b8d4b9',
          position: 'absolute',
        }}
      />
      <LottieView
        ref={lottieViewRef}
        style={styles.lottieView}
        source={refreshAnimation}
        progress={progress}
        loop={false}
      />
      <Animated.View
        style={{
          paddingTop: extraPaddingTop,
        }}
      />
      <FlatList
        keyExtractor={(item) => item.toString()}
        data={DATA}
        renderItem={(item) => <Post data={item.item} />}
        ListHeaderComponent={<CoronaBoard domesticStatus={domesticStatus} regionalStatus={regionalStatus} />}
        onScroll={onScroll}
        onResponderRelease={onRelease}
      />
    </View>
  )
}
