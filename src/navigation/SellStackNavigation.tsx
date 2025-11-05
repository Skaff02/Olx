import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateAd from '../screens/sell/CreateAd'
import SubCategories from '../screens/sell/SubCategories'
import AdDetails from '../screens/sell/AdDetails'
import ChoiceSelection from '../screens/sell/ChoiceSelection'

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
      <Stack.Screen name="AdDetails" component={AdDetails} />
      <Stack.Screen 
        name="ChoiceSelection" 
        component={ChoiceSelection}
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  )
}

export default SellStackNavigation

