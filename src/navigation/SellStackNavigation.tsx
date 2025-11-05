import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateAd from '../screens/sell/CreateAd'
import SubCategories from '../screens/sell/SubCategories'

const Stack = createNativeStackNavigator()

const SellStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="CreateAd" component={CreateAd} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
    </Stack.Navigator>
  )
}

export default SellStackNavigation

