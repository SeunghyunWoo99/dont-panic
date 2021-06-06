import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { scale, verticalScale } from 'react-native-size-matters'

const Tag = styled(TouchableOpacity)`
  background-color: white;
  height: ${scale(24)};
  padding-horizontal: ${scale(6)};
  border-radius: ${scale(12)};
  align-items: center;
  justify-content: center;
  margin-right: ${scale(8)};
`

export default function MapScreen() {
  const navigation = useNavigation()

  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.02,
  })
  // FIXME: 타입 any 수정
  /** 지도에 표기할 병원들 */
  const [hospitals, setHospitals] = useState<any>([])

  const setLocationFromCurrent = useCallback(
    () =>
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.035,
            longitudeDelta: 0.02,
          })
        },
        (error) => {
          console.error(error)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      ),
    [],
  )

  // useEffect(() => {
  //   setLocationFromCurrent()
  // }, [setLocationFromCurrent])

  // FIXME: 시연 전 개발을 위해 일단 세종대학교 대양 AI 센터를 위치로 잡음
  useEffect(() => {
    setRegion({
      latitude: 37.551080473869774,
      longitude: 127.07572521105389,
      latitudeDelta: 0.035,
      longitudeDelta: 0.02,
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton>
        {hospitals.map((hospital: any, index: number) => (
          <Marker
            // 일반 병원 ?? 코로나 병원 순서
            key={index}
            coordinate={{
              latitude: hospital.YPos?._text ?? hospital.lat,
              longitude: hospital.XPos?._text ?? hospital.lng,
            }}
            title={hospital.yadmNm?._text ?? hospital.yadmnm}
            description={`\n주소: ${hospital.addr?._text ?? hospital.addr}\n전화번호: ${
              hospital.telno?._text ?? hospital.telno
            }
            `}
          />
        ))}
      </MapView>
      <Pressable
        onPress={() => navigation.navigate('TestStackNavigator')}
        style={{ padding: 10, marginRight: 10, position: 'absolute', top: verticalScale(24), right: scale(6) }}
        hitSlop={10}>
        <Text>Test</Text>
      </Pressable>
      <View style={{ position: 'absolute', marginHorizontal: scale(16), marginTop: scale(24), flexDirection: 'row' }}>
        <Tag
          onPress={() => {
            fetch('http://52.78.126.183:3000/ows/covid-hospital', {
              method: 'GET',
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result)
                setHospitals(result)
              })
              .catch((error) => {
                console.error('코로나 안심 병원을 불러오지 못함', error)
              })
          }}>
          <Text>#코로나 안심 병원</Text>
        </Tag>
        <Tag
          onPress={() => {
            fetch(
              `http://52.78.126.183:3000/ows/hospital?lng=${region.longitude}&lat=${region.latitude}&radius=500&dgsbjtCd=01`,
              {
                method: 'GET',
              },
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(result)
                setHospitals(result.result)
              })
              .catch((error) => {
                console.error('일반 진료 병원을 불러오지 못함', error)
              })
          }}>
          <Text>#일반 진료</Text>
        </Tag>
      </View>
    </View>
  )
}
