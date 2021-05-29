import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { scale } from 'react-native-size-matters'

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
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.02,
  })

  const setLocationFromCurrent = useCallback(
    () =>
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
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
      latitudeDelta: 0.05,
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
        showsMyLocationButton
      />
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
