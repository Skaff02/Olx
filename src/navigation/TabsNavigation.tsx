import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Sell from '../screens/Sell'
import colors from '../theme/colors'

const Tab = createBottomTabNavigator()

const TabsNavigation = () => {

    const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
                    initialRouteName="Home"

                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: colors.primary,
                        tabBarInactiveTintColor: colors.text_dark,
                        tabBarStyle: {
                            paddingBottom: Platform.OS === 'ios'
                                ? 10
                                : 5,
                            paddingTop: 15,
                            borderTopWidth: 0,
                            height: Platform.OS === 'ios' ? 100 : 70 + insets.bottom,
                            backgroundColor: colors.background_dark,
                        },
                        tabBarShowLabel: true,
                        tabBarIconStyle: {
                            marginBottom: 4
                        },
                    }}
                >   
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Sell" component={Sell} />
    </Tab.Navigator>
  )
}

export default TabsNavigation