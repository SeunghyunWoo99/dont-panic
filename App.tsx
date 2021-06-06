import React, { useEffect, useRef } from 'react'
import { Platform, Pressable, Text } from 'react-native'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

  // 어플리케이션 구동 시 처음이면 튜토리얼 화면으로 이동
  useEffect(() => {
    AsyncStorage.getItem('isNotFirst').then((isNotFirst) => {
      if (isNotFirst !== '1') {
        setTimeout(() => navigationRef.current?.navigate('TestStackNavigator'), 2000)
        AsyncStorage.setItem('isNotFirst', '1')
      }
    })
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
