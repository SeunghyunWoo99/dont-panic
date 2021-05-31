import * as React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

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
      <FlatList keyExtractor={(item) => item.toString()} data={DATA} renderItem={() => <Post />} />
    </View>
  )
}
