import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { ShieldCheck, AlertTriangle, PieChart, Activity, ChevronRight, Info } from 'lucide-react-native';
import { fetchDoctorDiagnosis } from '../api';

const DoctorScreen = () => {
  const { colors, isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  useEffect(() => {
    loadDiagnosis();
  }, []);

  const loadDiagnosis = async () => {
    setLoading(true);
    // Mock portfolio for now - in production this comes from the Vault
    const portfolio = {
        holdings: [
            { stock: "Adani Power", percent: 40 },
            { stock: "Adani Green", percent: 30 },
            { stock: "Infosys", percent: 30 }
        ]
    };
    
    const result = await fetchDoctorDiagnosis(portfolio);
    if (result && result.diagnosis) {
        setDiagnosis(result.diagnosis);
    }
    setLoading(false);
  };

  if (loading) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textDim }]}>RUNNING DIAGNOSTICS...</Text>
            </View>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.subTitle, { color: colors.error }]}>SYSTEM DIAGNOSTIC</Text>\n        <Text style={[styles.title, { color: colors.text }]}>The Doctor</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Health Score Hero */}
        <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.heroLabel}>PORTFOLIO HEALTH SCORE</Text>
          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreValue, { color: colors.text }]}>{diagnosis?.health_score || '--'}</Text>
            <Text style={[styles.scoreStatus, { color: diagnosis?.health_score > 70 ? colors.primary : colors.error }]}>
                {diagnosis?.health_score > 70 ? 'ROBUST' : 'CRITICAL RISK'}
            </Text>
          </View>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
               <Text style={styles.metricLabel}>VOLATILITY</Text>
               <Text style={[styles.metricValue, { color: colors.text }]}>HIGH</Text>
            </View>
            <View style={styles.metricItem}>
               <Text style={styles.metricLabel}>BETA</Text>\n               <Text style={[styles.metricValue, { color: colors.text }]}>1.45</Text>
            </View>
            <View style={styles.metricItem}>
               <Text style={styles.metricLabel}>CONCENTRATION</Text>
               <Text style={[styles.metricValue, { color: colors.error }]}>SEVERE</Text>
            </View>
          </View>
        </View>

        {/* Critical Alerts */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: colors.text }]}>Critical Diagnosis</Text>
        </View>

        <View style={[styles.alertCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: colors.error }]}>
           <View style={styles.alertHeader}>
              <AlertTriangle size={18} color={colors.error} />\n              <Text style={[styles.alertTitle, { color: colors.text }]}>AI Risk Assessment</Text>
           </View>
           <Text style={styles.alertDesc}>
             {diagnosis?.critical_risk || "System is analyzing your portfolio risks..."}
           </Text>\n           <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.error }]}>
              <Text style={[styles.actionBtnText, { color: colors.error }]}>VIEW FIX OPTIONS</Text>
           </TouchableOpacity>
        </View>

        <View style={[styles.alertCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: colors.warning }]}>
           <View style={styles.alertHeader}>
              <Activity size={18} color={colors.warning} />
              <Text style={[styles.alertTitle, { color: colors.text }]}>Recommendation</Text>
           </View>
           <Text style={styles.alertDesc}>
             {diagnosis?.recommendation || "Loading recommendation..."}
           </Text>
        </View>

        {/* Sector Allocation */}
        <View style={styles.sectionHeader}>
           <Text style={[styles.sectionTitle, { color: colors.text }]}>Sector Allocation</Text>
           <Info size={14} color={colors.textDim} />
        </View>

        <View style={[styles.allocationCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
           {diagnosis?.sector_exposure && Object.entries(diagnosis.sector_exposure).map(([sector, percent]: any) => (
               <View key={sector} style={styles.allocationRow}>
                  <View style={styles.allocationInfo}>
                     <Text style={[styles.allocationLabel, { color: colors.text }]}>{sector}</Text>
                     <Text style={[styles.allocationValue, { color: colors.text }]}>{percent}</Text>
                  </View>
                  <View style={[styles.barBg, { backgroundColor: colors.institutionalGray }]}>
                     <View style={[styles.barFill, { backgroundColor: colors.textDim, width: percent }]} />
                  </View>
               </View>
           ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );\n};\n\nconst styles = StyleSheet.create({\n  container: { flex: 1 },\n  header: { padding: theme.spacing.lg, paddingTop: theme.spacing.xl },\n  subTitle: { fontSize: 10, fontWeight: 'bold', letterSpacing: 3, marginBottom: 4 },\n  title: { fontSize: 28, fontWeight: '300' },\n  scrollContent: { paddingHorizontal: theme.spacing.lg, paddingBottom: 100 },\n  heroCard: { padding: 24, borderRadius: 24, borderWidth: 1, marginTop: 8, alignItems: 'center' },\n  heroLabel: { color: '#64748b', fontSize: 9, fontWeight: 'bold', letterSpacing: 2 },\n  scoreContainer: { marginVertical: 20, alignItems: 'center' },\n  scoreValue: { fontSize: 56, fontWeight: 'bold' },\n  scoreStatus: { fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginTop: -4 },\n  metricsGrid: { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 20, gap: 20 },\n  metricItem: { flex: 1, alignItems: 'center' },\n  metricLabel: { color: '#64748b', fontSize: 8, fontWeight: 'bold', marginBottom: 4 },\n  metricValue: { fontSize: 14, fontWeight: '600' },\n  sectionHeader: { marginTop: 32, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },\n  sectionTitle: { fontSize: 18, fontWeight: '500' },\n  alertCard: { padding: 16, borderRadius: 16, borderWidth: 1, borderLeftWidth: 4, marginBottom: 12 },\n  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },\n  alertTitle: { fontSize: 14, fontWeight: 'bold' },\n  alertDesc: { color: '#64748b', fontSize: 12, lineHeight: 18 },\n  actionBtn: { alignSelf: 'flex-start', marginTop: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },\n  actionBtnText: { fontSize: 9, fontWeight: 'bold' },\n  allocationCard: { padding: 20, borderRadius: 20, borderWidth: 1 },\n  allocationRow: { marginBottom: 16 },\n  allocationInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },\n  allocationLabel: { fontSize: 13, fontWeight: '500' },\n  allocationValue: { fontSize: 11, fontWeight: 'bold' },\n  barBg: { height: 6, borderRadius: 3, width: '100%' },\n  barFill: { height: 6, borderRadius: 3 },\n  loadingText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginTop: 16 },\n});\n\nexport default DoctorScreen;\n