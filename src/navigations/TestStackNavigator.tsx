import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TestScreen, ResultScreen } from 'scenes'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
