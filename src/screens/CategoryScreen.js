import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { MyContext } from '../contextApi/ContextApi';

const CategoryScreen = ({ route }) => {
  const {formattedDate} =useContext(MyContext)
  const { category } = route.params;
  
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData(category);
    
  }, [category]);

  const fetchCategoryData = async (category) => {
    try {
      setLoading(true);
      // const apiUrl = `https://newsapi.org/v2/everything?q=${category}&from=2024-06-03&sortBy=publishedAt&apiKey=c4693ee77bef40bbbc6cc31749efff3a`;
      
      const apiUrl = `https://newsapi.org/v2/everything?q=${category}&from=${formattedDate}&sortBy=publishedAt&apiKey=12745954295d4a71b2c4f219069c22c9`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.status === "ok") {
        setCategoryData(data.articles); 
        setLoading(false);
      } else {
        throw new Error(`News API error! Message: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-950 p-4">
      <Text className="text-2xl font-bold mb-4 dark:text-white">{category} Category</Text>
      <FlatList
        data={categoryData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { Linking.openURL(item.url) }} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <Text className="text-xl font-bold mb-2 dark:text-white">{item.title}</Text>
            <Text className="text-base text-gray-700 dark:text-gray-400">{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CategoryScreen;
