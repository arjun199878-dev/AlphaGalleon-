import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MemoScreen from './src/screens/MemoScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import DoctorScreen from './src/screens/DoctorScreen';
import BacktestScreen from './src/screens/BacktestScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { theme } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Define the Home Stack (so you can click a stock and go to Memo)
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.background }
  }}>
    <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Memo" component={MemoScreen} options={{ title: 'Investment Memo' }} />
  </Stack.Navigator>
);

// 2. Define the Tools Stack (Architect, Doctor, Time Travel)
const ToolsStack = () => (
  <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.background }
  }}>
    <Stack.Screen name="ToolsHub" component={ToolsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Architect' }} />
    <Stack.Screen name="Doctor" component={DoctorScreen} options={{ title: 'The Doctor' }} />
    <Stack.Screen name="Backtest" component={BacktestScreen} options={{ title: 'Time Travel' }} />
  </Stack.Navigator>
);

// 3. Main App Structure (Tabs)
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.surfaceLight,
              paddingBottom: 5,
              height: 60,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textMuted,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Tools') {
                iconName = focused ? 'grid' : 'grid-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Tools" component={ToolsStack} options={{ title: 'AI Tools' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
