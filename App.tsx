import React, { useRef } from 'react'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { MainTabNavigator } from 'navigations'
import { TestScreen } from 'scenes'
import { Pressable, Text } from 'react-native'

const Stack = createStackNavigator()

export default function App() {
  const navigationRef = useRef<NavigationContainerRef>(null)

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
            headerTransparent: true,
            ...TransitionPresets.ModalTransition,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
