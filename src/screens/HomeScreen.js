import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../contextApi/ContextApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import Search from '../components/Search';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { apiRes, GetResponse, searchTxt } = useContext(MyContext);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setPage(1);
    GetResponse();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  useEffect(() => {
    GetResponse();
  }, []);

  useEffect(() => {
    if (apiRes.length > 0) {
      setData(apiRes[0].articles.slice(0, page * 10));
    }
  }, [apiRes, page]);

  const loadMoreData = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }) => {
    if (!searchTxt || item?.source?.name.toLowerCase().includes(searchTxt.toLowerCase())) {
      return (
      
          <TouchableOpacity
            style={{ marginBottom: 10, paddingHorizontal: 12 }}
            onPress={() => { FullScreen(item) }}>
            <View className='flex-1 flex-row overflow-hidden rounded-xl dark:bg-slate-400'>
              <Image
                source={{ uri: item?.urlToImage || 'https://www.createagile.com/blog/wp-content/uploads/2020/11/what-is-alt-text.png' }}
                style={{ height: 'auto', width: 150, borderRadius: 10 }}
                alt='image'
              />
              <View className="flex-1 pl-2 gap-3 py-5">
              <Text className="text-lg font-semibold text-gray-600 " numberOfLines={2}>{item?.author}</Text>
              <Text className="text-sm font-bold" numberOfLines={2}>{item?.title}</Text>
            </View>

            </View>
          </TouchableOpacity>
      );
    }
    return null;
  };

  const FullScreen = (item) => {
    navigation.navigate('DeteilsScreen', { res: item });
  };

  return (
    <SafeAreaView className='flex-1 bg-slate-200 dark:bg-gray-900'>
      {/* Logo */}
      <View className='flex flex-row items-center gap-2 p-4'>
        <View className='space-y-1'>
          <Animatable.View
            animation="slideInDown"
            duration={2000}
            style={{ width: 20, height: 5, backgroundColor: 'red', borderRadius: 15 }}
          />
          <Animatable.View
            animation="bounceInLeft"
            duration={2000}
            style={{ width: 30, height: 5, backgroundColor: 'white', borderRadius: 15 }}
          />
          <Animatable.View
            animation="slideInUp"
            duration={2000}
            style={{ width: 40, height: 5, backgroundColor: 'green', borderRadius: 15 }}
          />
        </View>
        <Animatable.View
          animation="flipInY"
          duration={2000}
          className='flex-row'>
          <Text className='text-3xl text-black dark:text-white'>NewsIn</Text>
          <Text className='text-3xl text-blue-500'>.</Text>
        </Animatable.View>
      </View>
      {/* SearchBox */}
      <Search />

      {/* Slider */}
      <View className='flex flex-row p-5'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-3'>
          {apiRes.length > 0 ? (
            apiRes[0].articles.slice(0, 5).map((item, index) => (
              <View key={index} className='relative overflow-hidden'>
                <TouchableOpacity onPress={() => { FullScreen(item) }}>
                  <Image
                    source={{ uri: item?.urlToImage || 'https://www.createagile.com/blog/wp-content/uploads/2020/11/what-is-alt-text.png' }}
                    style={{ height: 200, width: 320, borderRadius: 20 }}
                    alt='image'
                  />
                  <Text className='absolute bottom-14 p-2 text-xl font-bold text-gray-100 dark:text-white'
                    numberOfLines={1}>
                    {item?.author}
                  </Text>
                  <Text
                    numberOfLines={2}
                    className='absolute bottom-2 text-sm p-2 text-gray-100 dark:text-white bg-black/30 backdrop-blur-xl rounded-lg'
                  >
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View className='flex-row items-center space-x-1'>
            <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size='large' color='#05a81b' />
            <Text className='text-lg dark:text-white'>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View className=''>
        <Text className='text-3xl p-2 dark:text-white'>News</Text>
      </View>

      <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore && <ActivityIndicator style={{ marginVertical: 10 }} size='small' color='#0000ff' />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#ff0000', '#199afc', '#04c233']} />
          }
        />


    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});