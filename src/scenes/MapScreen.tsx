import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'

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
    </View>
  )
}
