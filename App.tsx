import React, { useEffect, useRef } from 'react'
import { Platform, Pressable, Text } from 'react-native'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Geolocation from 'react-native-geolocation-service'
import { MainTabNavigator, TestStackNavigator } from 'navigations'
import { PostWebViewScreen } from 'scenes'

const Stack = createStackNavigator()

export default function App() {
  const navigationRef = useRef<NavigationContainerRef>(null)

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always')
    }
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TestStackNavigator"
          component={TestStackNavigator}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalTransition,
          }}
        />
        <Stack.Screen
          name="PostWebViewScreen"
          component={PostWebViewScreen}
          options={{
            headerShown: false,
            // ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
