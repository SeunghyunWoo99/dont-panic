import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import LottieView from 'lottie-react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { Test, HospitalCorona, HospitalNormal } from 'assets/svgs'
import { color } from 'utils'

const Tag = styled(TouchableOpacity)`
  background-color: white;
  height: ${scale(28)};
  padding-horizontal: ${scale(10)};
  border-radius: ${scale(14)};
  align-items: center;
  justify-content: center;
  margin-right: ${scale(8)};
  flex-direction: row;
  shadow-offset: 8px 8px;
  shadow-opacity: 0.1;
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

  const [isLoading, setIsLoading] = useState(false)

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
    <>
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
            `}>
              <View
                style={{
                  width: scale(30),
                  height: scale(30),
                  borderRadius: scale(15),
                  backgroundColor: color.background.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 4, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}>
                {hospital.YPos?._text ? (
                  <HospitalNormal width={scale(23)} height={scale(23)} />
                ) : (
                  <HospitalCorona width={scale(23)} height={scale(23)} />
                )}
              </View>
            </Marker>
          ))}
        </MapView>
        <Pressable
          onPress={() => navigation.navigate('TestStackNavigator', { screen: 'TestScreen' })}
          style={{
            padding: 10,
            marginRight: 10,
            position: 'absolute',
            top: verticalScale(24),
            right: scale(6),
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: scale(52),
            height: scale(52),
            borderRadius: scale(26),
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
          hitSlop={10}>
          <Test width={scale(32)} height={scale(32)} style={{ left: scale(3) }} />
        </Pressable>
        <View
          style={{
            position: 'absolute',
            marginHorizontal: scale(16),
            marginTop: verticalScale(30),
            flexDirection: 'row',
          }}>
          <Tag
            onPress={() => {
              setIsLoading(true)
              fetch('http://52.78.126.183:3000/ows/covid-hospital', {
                method: 'GET',
              })
                .then((response) => response.json())
                .then((result) => {
                  setIsLoading(false)
                  console.log(result)
                  setHospitals(result)
                })
                .catch((error) => {
                  console.error('코로나 안심 병원을 불러오지 못함', error)
                })
            }}>
            <HospitalCorona width={scale(15)} height={scale(15)} style={{ marginRight: scale(4) }} />
            <Text style={{ fontSize: scale(13), color: color.text.primary }}>코로나 안심 병원</Text>
          </Tag>
          <Tag
            onPress={() => {
              setIsLoading(true)
              fetch(
                `http://52.78.126.183:3000/ows/hospital?lng=${region.longitude}&lat=${region.latitude}&radius=500&dgsbjtCd=01`,
                {
                  method: 'GET',
                },
              )
                .then((response) => response.json())
                .then((result) => {
                  setIsLoading(false)
                  console.log(result)
                  setHospitals(result.result)
                })
                .catch((error) => {
                  console.error('일반 진료 병원을 불러오지 못함', error)
                })
            }}>
            <HospitalNormal width={scale(15)} height={scale(15)} style={{ marginRight: scale(4) }} />
            <Text style={{ fontSize: scale(13), color: color.text.primary }}>일반 진료</Text>
          </Tag>
        </View>
      </View>
      {isLoading && (
        <Modal style={{ margin: 0 }} isVisible={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000001',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LottieView
              style={{ height: scale(72), position: 'absolute' }}
              source={require('lotties/refresh1.json')}
              autoPlay={true}
              loop={true}
            />
          </View>
        </Modal>
      )}
    </>
  )
}
