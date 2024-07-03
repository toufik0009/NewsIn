import { View, Text, Animated } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import DeteilsScreen from '../screens/DeteilsScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NotificationScreen from '../screens/NotificationScreen'
import ExploreScreen from '../screens/ExploreScreen'

import Icons from 'react-native-vector-icons/AntDesign'
import CategoryScreen from '../screens/CategoryScreen'

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator();


const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: Animated,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                        return <Icons name={iconName} size={size} color={color} />
                    } else if (route.name === 'Notification') {
                        iconName = 'notification';
                        return (
                            <Icons
                                name={iconName}
                                size={size}
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    } else if (route.name === 'Explore') {
                        iconName = 'find';
                        return (
                            <Icons
                                name={iconName}
                                size={size}
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                },
            })}>
            <Tab.Screen name="Home" component={MainNavigation} options={{ headerShown: false }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: true }} />
            <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}


const MainNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='DeteilsScreen' component={DeteilsScreen} options={{ headerShown: false }} />
            <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
            <Stack.Screen name='ExploreScreen' component={ExploreScreen} options={{ headerShown: false }} />
            <Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ headerShown: true, title: 'Category' }} />
        </Stack.Navigator>
    )
}


const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='MyTabs' component={MyTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation