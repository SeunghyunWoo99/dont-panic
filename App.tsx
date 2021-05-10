import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainTabNavigator } from 'navigations'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
