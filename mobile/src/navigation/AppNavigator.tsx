import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LayoutGrid, Zap, Globe, User, Wallet } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import VaultScreen from '../screens/VaultScreen';
import SystemScreen from '../screens/SystemScreen';
import HubScreen from '../screens/HubScreen';
import DoctorScreen from '../screens/DoctorScreen';
import ArchitectScreen from '../screens/ArchitectScreen';

import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HubStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_bottom'
      }}
    >
      <Stack.Screen name="HubHome" component={HubScreen} />
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="Architect" component={ArchitectScreen} />
    </Stack.Navigator>
  );
};

const HubButton = ({ colors, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.hubButtonContainer}
  >
    <View style={[styles.hubButton, { backgroundColor: colors.primary, borderColor: colors.background }]}>
      <Zap size={28} color="#000" strokeWidth={2.5} />
    </View>
  </TouchableOpacity>
);

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar, 
          { 
            backgroundColor: colors.background === '#FFFFFF' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(5, 5, 5, 0.95)', 
            borderTopColor: colors.border 
          }
        ],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Deck" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <LayoutGrid size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Vault" 
        component={VaultScreen} 
        options={{
          tabBarIcon: ({ color }) => <Wallet size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Hub" 
        component={HubStack}
        options={{
          tabBarButton: (props) => <HubButton {...props} colors={colors} />,
          tabBarLabel: 'AI Hub',
          tabBarLabelStyle: { color: colors.primary, fontSize: 8, fontWeight: 'bold', marginTop: 35 }
        }}
      />
      <Tab.Screen 
        name="Network" 
        component={HomeScreen} // Placeholder
        options={{
          tabBarIcon: ({ color }) => <Globe size={22} color={color} />,
        }}
      />
      <Tab.Screen 
        name="System" 
        component={SystemScreen} 
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 85,
    paddingBottom: 25,
    paddingTop: 10,
    position: 'absolute',
  },
  tabBarLabel: {
    fontSize: 8,
    fontWeight: '500',
    marginTop: 4,
  },
  hubButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 4,
  }
});

export default AppNavigator;
