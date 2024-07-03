import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
const WelcomeScreen = () => {
  const coloScheme = useColorScheme()
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MyTabs')
    }, 3000)
  }, [])
  return (
    <View className='flex-1 justify-center items-center bg-slate-200 dark:bg-gray-900'>
      <StatusBar backgroundColor={coloScheme == 'dark' ? 'rgb(17,24,39)' : 'rgb(226,232,240)'} barStyle={coloScheme == 'dark' ? 'light-content' : 'dark-content'} />
      <View className='flex-1 flex-row items-center gap-2'>
        <View className='space-y-1'>

          <Animatable.View
            animation="slideInDown"
            duration={2000}
            style={{ width: 40, height: 14, backgroundColor: 'red', borderRadius: 15 }}></Animatable.View>
          <Animatable.View
            animation="bounceInLeft"
            duration={2000}
            style={{ width: 50, height: 14, backgroundColor: 'white', borderRadius: 15 }}></Animatable.View>
          <Animatable.View
            animation="slideInUp"
            duration={2000}
            style={{ width: 60, height: 14, backgroundColor: 'green', borderRadius: 15 }}></Animatable.View>

        </View>

        <Animatable.View
          animation="flipInY"
          duration={2000}
          className='flex-row'>
          <Text className='text-6xl text-black dark:text-white pt-2'>NewsIn</Text>
          <Text className='text-7xl text-blue-500'>.</Text>
        </Animatable.View>
      </View>
      <View className='flex pb-2'>
        <Text className='text-sm text-black dark:text-white pt-2'>Made In India</Text>
      </View>
    </View>
  )
}

export default WelcomeScreen