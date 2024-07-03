import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, useColorScheme, Linking } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LeftIcon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/Feather'

const DetailsScreen = ({ route }) => {
  const colorScheme = useColorScheme() == 'dark'
  const navigation = useNavigation()
  const { res } = route.params || {};
  console.log("res", res);

  const VisitNow = () => {
    if (res?.url) {
      Linking.openURL(res.url);
    }
  };



  return (
    <SafeAreaView className='flex-1 bg-slate-200 dark:bg-gray-950'>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          className='absolute z-10'
          onPress={() => { navigation.navigate('HomeScreen') }}>
          <LeftIcon name='angle-left' color={'#ffff'} size={24} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff5', borderRadius: 15, margin: 5 }} />
        </TouchableOpacity>
        <Image
          source={{ uri: res?.urlToImage || 'https://www.createagile.com/blog/wp-content/uploads/2020/11/what-is-alt-text.png' }}
          style={{ height: 300, width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}
          resizeMode="stretch"
        />

        <View style={{ padding: 16 }}>
          <Text className='text-lg font-semibold text-gray-700 mb-1 dark:text-white'>{res?.source?.name}</Text>
          <Text className='text-2xl font-bold mb-5 dark:text-white'>{res?.title}</Text>
          <Text className='text-lg font-semibold mb-2 dark:text-white'>{res?.publishedAt}</Text>
          <Text className='text-xl text-gray-500 font-bold mb-2 dark:text-white'>{res?.author}</Text>
          <Text className='text-lg dark:text-white'>{res?.description}</Text>
        </View>
      </ScrollView>
      <View className='flex justify-center items-end mr-2'>
        <TouchableOpacity
          className='bg-black dark:bg-white p-2 mb-5 rounded-3xl'
          onPress={VisitNow}>
          <Text className='text-xl text-white dark:text-black'>
            Visit Now
            <Icons name='arrow-up-right' size={22} color={colorScheme ? 'black' : 'white'} />
          </Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
