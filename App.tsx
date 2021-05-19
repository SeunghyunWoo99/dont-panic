import React, { useEffect, useRef } from 'react'
import { Platform, Pressable, Text } from 'react-native'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Geolocation from 'react-native-geolocation-service'
import { MainTabNavigator } from 'navigations'
import { TestScreen } from 'scenes'

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
            headerTransparent: true,
            headerTitle: () => null,
            headerRight: () => (
              <Pressable
                onPress={() => navigationRef.current?.navigate('TestScreen')}
                style={{ padding: 10, marginRight: 10 }}
                hitSlop={10}>
                <Text>Test</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalTransition,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
