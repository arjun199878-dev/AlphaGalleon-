import "expo-standard-web-crypto";
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import MemoScreen from './src/screens/MemoScreen';
import ToolsScreen from './src/screens/ToolsScreen';

const convex = new ConvexReactClient("https://vibrant-spoonbill-564.eu-west-1.convex.cloud", {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

// Simple Error Boundary for the Cockpit
class CockpitErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>SYSTEM_CRITICAL_FAILURE</Text>
          <Text style={styles.errorText}>{this.state.error?.toString()}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <CockpitErrorBoundary>
      <ConvexProvider client={convex}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#050505' },
              headerTintColor: '#13ec5b',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} />
            <Stack.Screen name="Memo" component={MemoScreen} />
            <Stack.Screen name="Tools" component={ToolsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ConvexProvider>
    </CockpitErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    padding: 40,
  },
  errorTitle: {
    color: '#ef4444',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  errorText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  }
});
