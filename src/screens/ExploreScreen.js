import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../contextApi/ContextApi';
import Search from '../components/Search';
import * as Animatable from 'react-native-animatable';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const { apiRes, GetResponse, searchTxt } = useContext(MyContext);
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetResponse();
  }, []);

  useEffect(() => {
    if (apiRes.length > 0) {
      setTrending(apiRes[0].articles.slice(0, 5));
      setCategories(['Politics', 'Sports', 'Entertainment', 'Technology', 'Health']);
    }
  }, [apiRes]);

  // Category Screen
  const handleCategoryPress = (category,searchTxt) => {
    navigation.navigate('CategoryScreen', { category,searchTxt });
  };

  const renderTrendingItem = ({ item }) => {
    if (!searchTxt || item?.title.toLowerCase().includes(searchTxt.toLowerCase())) {
      return (
        <TouchableOpacity
          style={{ marginBottom: 10, paddingHorizontal: 12 }}
          onPress={() => navigation.navigate('DeteilsScreen', { res: item })}
        >
          <View className="flex-row bg-white dark:bg-slate-400 w-80 overflow-hidden rounded-lg">
            <Image
              source={{ uri: item.urlToImage || 'https://www.createagile.com/blog/wp-content/uploads/2020/11/what-is-alt-text.png' }}
              className="w-24 h-24"
            />
            <View className="flex-1 pl-2">
              <Text className="text-lg font-bold" numberOfLines={2}>{item?.title}</Text>
              <Text className="text-sm font-semibold text-gray-600 " numberOfLines={2}>{item?.author}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity
      key={category}
      className="bg-gray-300 dark:bg-gray-700 rounded-full p-3 m-2"
      onPress={() => handleCategoryPress(category)}
    >
      <Text className="text-base dark:text-white">{category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-200 dark:bg-gray-950">
      <View className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <Animatable.Text animation="fadeInDown" className="text-2xl font-bold dark:text-white">Explore</Animatable.Text>
      </View>
      <Search />
      <ScrollView className="flex-1">
        <View className="my-4">
          <Text className="text-xl font-bold ml-4 mb-2 dark:text-white">Trending</Text>
          <FlatList
            data={trending}
            renderItem={renderTrendingItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="my-4">
          <Text className="text-xl font-bold ml-4 mb-2 dark:text-white">Categories</Text>
          <View className="flex-row flex-wrap mx-4">
            {categories.map(renderCategoryItem)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
