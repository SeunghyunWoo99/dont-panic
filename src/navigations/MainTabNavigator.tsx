import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { scale } from 'react-native-size-matters'
import { MapScreen, PostScreen } from 'scenes'
import { Map, MapActive, News, NewsActive } from 'assets/svgs'
import { color, size } from 'utils'

const TabBar = styled(View)`
  flex-direction: row;
  height: ${scale(54)}px;
  width: ${size.screenWidth}px;
  background-color: ${color.background.primary};
  border-top-width: 0.25px;
  border-color: #bbb;
  box-shadow: ${scale(3)}px ${scale(5)}px ${scale(10)}px rgba(112, 63, 63, 0.3);
`

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <TabBar style={{ justifyContent: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        /** 페이지의 종류와 해당 페이지의 focus 여부에 따라 달라지는 icon을 리턴하는 함수 */
        const Icon = () => {
          switch (route.name) {
            case 'Map':
              return isFocused ? (
                <MapActive width={scale(24)} height={scale(24)} style={{ alignSelf: 'center', marginTop: scale(8) }} />
              ) : (
                <Map width={scale(24)} height={scale(24)} style={{ alignSelf: 'center', marginTop: scale(8) }} />
              )
            case 'Post':
              return isFocused ? (
                <NewsActive width={scale(24)} height={scale(24)} style={{ alignSelf: 'center', marginTop: scale(8) }} />
              ) : (
                <News width={scale(24)} height={scale(24)} style={{ alignSelf: 'center', marginTop: scale(8) }} />
              )
          }
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}>
            {Icon()}
            <Text
              style={{
                fontSize: scale(9),
                color: isFocused ? color.button.primary : color.button.disabled.primary,
                alignSelf: 'center',
                marginTop: scale(3),
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </TabBar>
  )
}

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
    </Tab.Navigator>
  )
}
