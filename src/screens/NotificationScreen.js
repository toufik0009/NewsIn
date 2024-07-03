import { RefreshControl, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';


const NotificationScreen = () => {
  
  return (
    <SafeAreaView className='flex-1 justify-center items-center' >
      
       
        <View className=' h-screen w-full bg-slate-200 dark:bg-gray-950 justify-center items-center'>
          <LottieView source={require('../assets/animation/EmptyNotification.json')} autoPlay loop style={{ height: 350, width: '100%' }} />
          <Text className='text-xl dark:text-white'>Notification Is Empty</Text>
        </View>
     

    </SafeAreaView>
  )
}

export default NotificationScreen