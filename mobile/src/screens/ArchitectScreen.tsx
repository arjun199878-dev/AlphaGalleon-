import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  Animated
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { Sparkles, TrendingUp, PieChart, Shield, ChevronRight } from 'lucide-react-native';
import { fetchArchitectStrategy } from '../api';

const ArchitectScreen = () => {
  const { colors, isDark } = useTheme();
  const [capital, setCapital] = useState('5,00,000');
  const [risk, setRisk] = useState(4); // 1-5 scale
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const getRiskLabel = (val: number) => {
    if (val <= 2) return 'Conservative';
    if (val <= 3) return 'Balanced';
    return 'Aggressive Growth';
  };

  const handleGenerate = async () => {
    setLoading(true);
    setStrategy(null);
    
    // Simulate real AI processing delay for UX
    const numericCapital = parseInt(capital.replace(/,/g, '')) || 0;
    const result = await fetchArchitectStrategy(numericCapital, getRiskLabel(risk), "5 Years");
    
    setTimeout(() => {
      setStrategy(result?.strategy || null);
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.subTitle, { color: colors.primary }]}>STRATEGY ENGINE</Text>
        <Text style={[styles.title, { color: colors.text }]}>The Architect</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Input Parameters Card */}
        <View style={[styles.configCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.sectionLabel}>INVESTMENT PARAMETERS</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>DEPLOYABLE CAPITAL (INR)</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.institutionalGray }]}>
              <Text style={[styles.currency, { color: colors.textDim }]}>₹</Text>
              <TextInput 
                value={capital}
                onChangeText={setCapital}
                style={[styles.input, { color: colors.text }]}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
             <View style={styles.labelRow}>
                <Text style={styles.label}>RISK APPETITE</Text>
                <View style={[styles.riskBadge, { backgroundColor: 'rgba(19, 236, 91, 0.1)' }]}>
                  <Text style={[styles.riskBadgeText, { color: colors.primary }]}>{getRiskLabel(risk)}</Text>
                </View>
             </View>
             {/* Simple Range Simulation with buttons for now or a slider if library is there */}
             <View style={styles.rangeContainer}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <TouchableOpacity 
                    key={val}
                    onPress={() => setRisk(val)}
                    style={[
                      styles.rangeDot, 
                      { backgroundColor: colors.institutionalGray },
                      risk >= val && { backgroundColor: colors.primary }
                    ]} 
                  />
                ))}
             </View>
          </View>

          <TouchableOpacity 
            onPress={handleGenerate}
            disabled={loading}
            style={[styles.generateBtn, { backgroundColor: colors.primary }]}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Sparkles size={16} color="#000" />
                <Text style={styles.generateBtnText}>GENERATE ALPHA STRATEGY</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: colors.textDim }]}>ANALYZING MARKET VECTORS...</Text>
          </View>
        )}

        {/* Results Strategy Card */}
        {strategy && (
          <View style={[styles.resultsContainer]}>
            <View style={styles.resultsHeader}>
               <View style={[styles.liveDot, { backgroundColor: colors.primary }]} />
               <Text style={[styles.resultsStatus, { color: colors.primary }]}>STRATEGY OPTIMIZED</Text>
            </View>

            <View style={[styles.strategyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
               <View style={[styles.strategyHero, { borderBottomColor: colors.border }]}>
                  <View>
                    <Text style={[styles.strategyName, { color: colors.text }]}>{strategy.strategy_name}</Text>
                    <Text style={styles.cagrLabel}>TARGET CAGR: <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{strategy.target_cagr}</Text></Text>
                  </View>
                  <View style={[styles.strategyIcon, { borderColor: colors.border }]}>
                    <TrendingUp size={20} color={colors.primary} />
                  </View>
               </View>

               <View style={styles.allocationList}>
                  {strategy.allocation.map((item: any, idx: number) => (
                    <View key={idx} style={styles.allocationItem}>
                       <View style={styles.allocInfo}>
                          <PieChart size={14} color={colors.textDim} />
                          <View style={{ marginLeft: 12 }}>
                             <Text style={[styles.assetName, { color: colors.text }]}>{item.asset}</Text>
                             <Text style={styles.assetReason} numberOfLines={1}>{item.reason}</Text>
                          </View>
                       </View>
                       <Text style={[styles.assetPercent, { color: colors.text }]}>{item.percent}</Text>
                    </View>
                  ))}
               </View>

               <View style={styles.cardActions}>
                  <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.border }]}>
                    <Text style={[styles.actionBtnText, { color: colors.text }]}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.deployBtn, { backgroundColor: colors.primary }]}>
                    <Text style={styles.deployBtnText}>DEPLOY STRATEGY</Text>
                  </TouchableOpacity>
               </View>
            </View>
          </View>
        )}

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
  configCard: { padding: 24, borderRadius: 24, borderWidth: 1, marginTop: 8 },
  sectionLabel: { color: '#64748b', fontSize: 9, fontWeight: 'bold', letterSpacing: 2, marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#64748b', fontSize: 9, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  inputWrapper: { height: 56, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  currency: { fontSize: 18, fontWeight: '300', marginRight: 8 },
  input: { flex: 1, fontSize: 20, fontWeight: 'bold' },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  riskBadgeText: { fontSize: 9, fontWeight: 'bold' },
  rangeContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  rangeDot: { width: 12, height: 12, borderRadius: 6 },
  generateBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 },
  generateBtnText: { color: '#000', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  loadingContainer: { py: 40, alignItems: 'center', marginTop: 24 },
  loadingText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginTop: 16 },
  resultsContainer: { marginTop: 32 },
  resultsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  liveDot: { width: 6, height: 6, borderRadius: 3 },
  resultsStatus: { fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  strategyCard: { borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  strategyHero: { padding: 20, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  strategyName: { fontSize: 18, fontWeight: 'bold' },
  cagrLabel: { fontSize: 11, color: '#64748b', marginTop: 4 },
  strategyIcon: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  allocationList: { padding: 20 },
  allocationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  allocInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  assetName: { fontSize: 13, fontWeight: '600' },
  assetReason: { fontSize: 10, color: '#64748b', marginTop: 2, width: 180 },
  assetPercent: { fontSize: 14, fontWeight: 'bold' },
  cardActions: { flexDirection: 'row', gap: 12, padding: 16, backgroundColor: 'rgba(255,255,255,0.02)' },
  actionBtn: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  actionBtnText: { fontSize: 10, fontWeight: 'bold' },
  deployBtn: { flex: 2, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  deployBtnText: { color: '#000', fontSize: 11, fontWeight: 'bold' }
});

export default ArchitectScreen;
