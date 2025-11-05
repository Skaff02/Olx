import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/tabs/Home'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Sell from '../screens/tabs/Sell'
import colors from '../theme/colors'
import Profile from '../screens/tabs/Profile'

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
            <Tab.Screen 
                name="Sell" 
                component={Sell}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('SellStack');
                    },
                })}
            />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default TabsNavigation