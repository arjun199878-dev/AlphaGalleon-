import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { Architecture, Stethoscope, History, Radar, ShieldAlert, ChevronRight } from 'lucide-react-native';

const HubScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const tools = [
    { 
      id: 'architect', 
      name: 'The Architect', 
      desc: 'Portfolio construction & rebalancing engine.', 
      icon: Architecture, 
      color: colors.primary,
      screen: 'Architect'
    },
    { 
      id: 'doctor', 
      name: 'The Doctor', 
      desc: 'Risk diagnosis and portfolio health checks.', 
      icon: Stethoscope, 
      color: colors.error,
      screen: 'Doctor'
    },
    { 
      id: 'travel', 
      name: 'Time Travel', 
      desc: 'Historical backtesting and scenario simulation.', 
      icon: History, 
      color: '#a855f7',
      screen: null 
    },
    { 
      id: 'scout', 
      name: 'The Scout', 
      desc: 'AI-driven opportunity radar & screener.', 
      icon: Radar, 
      color: colors.warning,
      screen: null 
    },
    { 
      id: 'sentinel', 
      name: 'The Sentinel', 
      desc: 'Real-time news monitoring & sentiment alerts.', 
      icon: ShieldAlert, 
      color: '#3b82f6',
      screen: null 
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.subTitle, { color: colors.primary }]}>ALPHAGALLEON CORE</Text>
        <Text style={[styles.title, { color: colors.text }]}>The Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {tools.map((tool) => (
            <TouchableOpacity 
              key={tool.id}
              onPress={() => tool.screen && navigation.navigate(tool.screen)}
              activeOpacity={0.7}
              style={[styles.toolCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: tool.color }]}
            >
              <View style={styles.cardInfo}>
                 <View style={[styles.iconBox, { backgroundColor: `${tool.color}15` }]}>
                    <tool.icon size={24} color={tool.color} />
                 </View>
                 <View style={styles.textContainer}>
                    <Text style={[styles.toolName, { color: colors.text }]}>{tool.name}</Text>
                    <Text style={styles.toolDesc}>{tool.desc}</Text>
                 </View>
              </View>
              {tool.screen ? <ChevronRight size={18} color={colors.textDim} /> : <Text style={styles.comingSoon}>SOON</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: theme.spacing.lg, paddingTop: theme.spacing.xl },
  subTitle: { fontSize: 10, fontWeight: 'bold', letterSpacing: 3, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '300' },
  scrollContent: { paddingHorizontal: theme.spacing.lg, paddingBottom: 120 },
  grid: { gap: 12 },
  toolCard: { padding: 20, borderRadius: 20, borderWidth: 1, borderLeftWidth: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  textContainer: { marginLeft: 16, flex: 1 },
  toolName: { fontSize: 16, fontWeight: 'bold' },
  toolDesc: { fontSize: 11, color: '#64748b', marginTop: 2, lineHeight: 16 },
  comingSoon: { fontSize: 8, fontWeight: 'bold', color: '#64748b', letterSpacing: 1 },
});

export default HubScreen;
