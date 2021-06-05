import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components'
import { scale } from 'react-native-size-matters'
import { parse } from 'fast-xml-parser'
import { API_KEY, size } from 'utils'

interface IData {
  key: string
  title: string
  description: string
  images: string[]
}

const DATA = [
  { key: '0' },
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '4' },
  { key: '5' },
  { key: '6' },
  { key: '7' },
  { key: '8' },
  { key: '9' },
  { key: '10' },
  { key: '11' },
  { key: '12' },
  { key: '13' },
  { key: '14' },
  { key: '15' },
  { key: '16' },
  { key: '17' },
  { key: '18' },
  { key: '19' },
  { key: '20' },
]

/** 보드 카드의 너비: 전체 화면 너비 */
const CARD_WIDTH = size.screenWidth * 0.84
/** 보드 카드의 수평 마진 */
const CARD_MARGIN_HORIZONTAL = size.screenWidth * 0.08
/** 보드 카드의 높이: 전체 화면 높이 */
const CARD_HEIGHT = scale(200)

/** 코로나 관련 현황을 보여주는 개별 카드 */
const CoronaBoardCard = styled(View)`
  flex: 1;
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  margin-horizontal: ${CARD_MARGIN_HORIZONTAL};
  margin-vertical: ${scale(24)};
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
function CoronaBoard() {
  /** 국내 전체 발생 현황 */
  const [domesticStatus, setDomesticStatus] = useState<IDomecticStatus[]>()
  /** 지역 발생 현황 */
  const [regionalStatus, setRegionalStatus] = useState<IRegionalStatus[]>()

  useEffect(() => {
    var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + API_KEY
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20210604')
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20210605')

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
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20210604')
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20210605')

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
          {domesticStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'확진자'}
                  count={domesticStatus[0].decideCnt}
                  difference={domesticStatus[0].decideCnt - domesticStatus[1].decideCnt}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'격리해제'}
                  count={domesticStatus[0].clearCnt}
                  difference={domesticStatus[0].clearCnt - domesticStatus[1].clearCnt}
                  colorIndex={1}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'사망자'}
                  count={domesticStatus[0].deathCnt}
                  difference={domesticStatus[0].deathCnt - domesticStatus[1].deathCnt}
                  colorIndex={2}
                />
                <CoronaBoardCardAtom
                  title={'검사진행'}
                  count={domesticStatus[0].examCnt}
                  difference={domesticStatus[0].examCnt - domesticStatus[1].examCnt}
                  colorIndex={3}
                />
              </CoronaBoardCardMolecule>
            </>
          )}
        </CoronaBoardCard>
        {/* 1 */}
        <CoronaBoardCard key={'1'}>
          {regionalStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'확진자'}
                  count={regionalStatus[0].defCnt}
                  difference={regionalStatus[0].defCnt - regionalStatus[1].defCnt}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'사망자'}
                  count={regionalStatus[0].deathCnt}
                  difference={regionalStatus[0].deathCnt - regionalStatus[1].deathCnt}
                  colorIndex={1}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'격리해제'}
                  count={regionalStatus[0].isolClearCnt}
                  difference={regionalStatus[0].isolClearCnt - regionalStatus[1].isolClearCnt}
                  colorIndex={2}
                />
                <CoronaBoardCardAtom
                  title={'치료 중'}
                  count={regionalStatus[0].isolIngCnt}
                  difference={regionalStatus[0].isolIngCnt - regionalStatus[1].isolIngCnt}
                  colorIndex={3}
                />
              </CoronaBoardCardMolecule>
            </>
          )}
        </CoronaBoardCard>
        {/* 2 */}
        <CoronaBoardCard key={'2'}>
          {regionalStatus && (
            <>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'일일 확진자'}
                  count={regionalStatus[0].incDec}
                  difference={regionalStatus[0].incDec - regionalStatus[1].incDec}
                  colorIndex={2}
                />
              </CoronaBoardCardMolecule>
              <CoronaBoardCardMolecule>
                <CoronaBoardCardAtom
                  title={'국내발생'}
                  count={regionalStatus[0].localOccCnt}
                  difference={regionalStatus[0].localOccCnt - regionalStatus[1].localOccCnt}
                  colorIndex={0}
                />
                <CoronaBoardCardAtom
                  title={'해외유입'}
                  count={regionalStatus[0].overFlowCnt}
                  difference={regionalStatus[0].overFlowCnt - regionalStatus[1].overFlowCnt}
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
              color: '#333',
            }}>
            거리두기 단계
          </Text>
          <Text style={{ fontSize: scale(72), fontWeight: 'bold', color: '#333' }}>2</Text>
          <Text
            style={{
              fontSize: scale(12),
              position: 'absolute',
              bottom: scale(12),
              right: scale(18),
              color: '#666',
            }}>
            *21.5.24~6.13
          </Text>
        </CoronaBoardCard>
      </ScrollView>
    </View>
  )
}

function Post() {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 100,
        borderBottomWidth: scale(1),
        borderColor: '#eee',
        backgroundColor: 'white',
        paddingVertical: scale(6),
        paddingHorizontal: scale(12),
        justifyContent: 'center',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: scale(60),
            height: scale(60),
            borderRadius: scale(12),
            marginRight: scale(12),
            backgroundColor: '#f5f5f5',
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: scale(17), color: '#333', marginBottom: scale(4) }}>{'2021 코로나 FAQ'}</Text>
          <Text numberOfLines={2} style={{ fontSize: scale(12), color: '#666' }}>
            {
              '1. 실내에서 환기만 제대로 하고 2m 유지하면 괜찮은가?환기는 실내 공기를 교체해 공기 중 바이러스의 농도를 낮춰주는 효과가 있다.실내공간에서는 주기적이고 충분한 환기 뿐 아니라▴사람 간 2m(최소 1m) 거리 유지, ▴손씻기(흐르는 물과 비누로 30초 이상, 또는 손소독제 사용)와 ▴기침예절(기침․재채기를 할 경우 휴지, 옷소매 안쪽으로 입과 코를 가리기) 등 개인위생수칙을 준수하는 것도 중요하다.'
            }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function PostScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: scale(36) }} />
      <FlatList
        keyExtractor={(item) => item.toString()}
        data={DATA}
        renderItem={() => <Post />}
        ListHeaderComponent={<CoronaBoard />}
      />
    </View>
  )
}
