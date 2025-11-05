import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/tabs/Home'
import TabsNavigation from './TabsNavigation'
import SellStackNavigation from './SellStackNavigation'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="TabsNavigation"
          >
            <Stack.Screen name="TabsNavigation" component={TabsNavigation} />
            <Stack.Screen 
              name="SellStack" 
              component={SellStackNavigation}
              options={{
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
                gestureEnabled: true,
                gestureDirection: 'vertical',
              }}
            />
          </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})