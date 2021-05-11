import * as React from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ latitude: 37.5326, longitude: 127.024612, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      />
    </View>
  )
}
