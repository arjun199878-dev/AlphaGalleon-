import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react-native';

const VaultScreen = () => {
  const { colors, isDark } = useTheme();
  const holdings = [
    { id: '1', name: 'HDFC Bank', ticker: 'HDFCBANK', qty: 150, avg: 1420, value: '2.18L', change: '+₹12,400', initial: 'H' },
    { id: '2', name: 'Reliance', ticker: 'RELIANCE', qty: 80, avg: 2850, value: '2.38L', change: '+₹18,200', initial: 'R' },
    { id: '3', name: 'Tata Power', ticker: 'TATAPOWER', qty: 400, avg: 380, value: '1.65L', change: '+₹14,000', initial: 'T' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.subTitle, { color: colors.primary }]}>PORTFOLIO INTELLIGENCE</Text>
          <Text style={[styles.title, { color: colors.text }]}>The Vault</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.summaryRow}>
             <View style={[styles.healthScoreContainer, { backgroundColor: isDark ? 'rgba(19, 236, 91, 0.1)' : 'rgba(14, 158, 61, 0.1)', borderColor: isDark ? 'rgba(19, 236, 91, 0.2)' : 'rgba(14, 158, 61, 0.2)' }]}>
                <ShieldCheck size={24} color={colors.primary} />
                <Text style={[styles.healthScoreValue, { color: colors.primary }]}>84</Text>
             </View>
             <View>
                <Text style={styles.summaryLabel}>PORTFOLIO HEALTH</Text>
                <Text style={[styles.summaryStatus, { color: colors.text }]}>ROBUST</Text>
             </View>
          </View>
          <View style={[styles.alertBar, { borderTopColor: colors.border }]}>
             <AlertCircle size={14} color={colors.warning} />
             <Text style={[styles.alertText, { color: colors.warning }]}>3 Diagnostic Alerts requiring review</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Tracked Assets</Text>
          <Text style={styles.sectionSub}>Imported from Upstox</Text>
        </View>

        <View style={styles.holdingsList}>
          {holdings.map((item) => (
            <View key={item.id} style={[styles.holdingItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.holdingMain}>
                <View style={[styles.holdingIcon, { borderColor: colors.border }]}>
                  <Text style={[styles.iconText, { color: colors.text }]}>{item.initial}</Text>
                </View>
                <View>
                  <Text style={[styles.holdingName, { color: colors.text }]}>{item.name}</Text>
                  <Text style={styles.holdingDetails}>{item.qty} Units • {item.ticker}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.analyzeBtn, { borderColor: colors.primary }]}>
                <Text style={[styles.analyzeBtnText, { color: colors.primary }]}>ANALYZE</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.syncButton, { borderColor: colors.border }]}>
          <RefreshCw size={14} color={colors.textDim} />
          <Text style={styles.syncText}>REFRESH HOLDINGS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: theme.spacing.lg, paddingTop: theme.spacing.xl },
  subTitle: { fontSize: 10, fontWeight: 'bold', letterSpacing: 3, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '300' },
  scrollContent: { paddingHorizontal: theme.spacing.lg, paddingBottom: 100 },
  summaryCard: { padding: 20, borderRadius: 24, borderWidth: 1, marginTop: 8 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  healthScoreContainer: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  healthScoreValue: { fontSize: 20, fontWeight: 'bold', marginTop: -2 },
  summaryLabel: { color: '#64748b', fontSize: 9, fontWeight: 'bold', letterSpacing: 1.5 },
  summaryStatus: { fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  alertBar: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, paddingTop: 16, borderTopWidth: 1 },
  alertText: { fontSize: 11, fontWeight: '500' },
  sectionHeader: { marginTop: 32, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '500' },
  sectionSub: { color: '#64748b', fontSize: 10, marginTop: 2 },
  holdingsList: { gap: 12 },
  holdingItem: { padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1 },
  holdingMain: { flexDirection: 'row', alignItems: 'center' },
  holdingIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1 },
  iconText: { fontWeight: 'bold' },
  holdingName: { fontSize: 14, fontWeight: 'bold' },
  holdingDetails: { color: '#64748b', fontSize: 10, marginTop: 2 },
  analyzeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  analyzeBtnText: { fontSize: 9, fontWeight: 'bold' },
  syncButton: { marginTop: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 99, borderWidth: 1, gap: 8 },
  syncText: { color: '#64748b', fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5 }
});

export default VaultScreen;
