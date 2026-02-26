import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import theme, { COLORS, SPACING } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ToolsScreen = () => {
  const tools = [
    { name: 'Portfolio Architect', icon: 'color-palette-outline', color: '#3B82F6' },
    { name: 'Portfolio Doctor', icon: 'medkit-outline', color: '#10B981' },
    { name: 'Backtest (Time Travel)', icon: 'time-outline', color: '#8B5CF6' },
    { name: 'Tax Calculator', icon: 'calculator-outline', color: '#F59E0B' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Products & Tools</Text>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.toolCard}>
            <View style={[styles.iconContainer, { backgroundColor: tool.color + '10' }]}>
              <Ionicons name={tool.icon} size={28} color={tool.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolDesc}>Professional grade analysis at your fingertips.</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0F172A' },
  toolCard: {
    backgroundColor: '#FFF',
    borderRadius: 12, 
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: { width: 56, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  toolName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 2 },
  toolDesc: { fontSize: 12, color: '#64748B' },
});

export default ToolsScreen;
