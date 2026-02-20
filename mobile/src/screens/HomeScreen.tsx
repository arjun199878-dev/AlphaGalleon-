import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Search, Bell, Zap } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { fetchMarketPulse } from '../api';

const HomeScreen = () => {
  const { colors, isDark } = useTheme();
  const [assetType, setAssetType] = useState<'stocks' | 'mf'>('stocks');
  const [marketPulse, setMarketPulse] = useState<any>(null);
  const [loadingPulse, setLoadingPulse] = useState(true);
  
  useEffect(() => {
    const loadMarketData = async () => {
      setLoadingPulse(true);
      const data = await fetchMarketPulse();
      if (data) setMarketPulse(data);
      setLoadingPulse(false);
    };
    loadMarketData();
  }, []);

  const stocks = [
    { id: '1', name: 'HDFC Bank', ticker: 'NSE: HDFCBANK', action: 'BUY', insight: "Institutional volume spike detected.", confidence: '92%' },
    { id: '2', name: 'Tata Power', ticker: 'NSE: TATAPOWER', action: 'HOLD', insight: "Sector rotation into utilities observed.", confidence: '78%' },
  ];

  const mf = [
    { id: '1', name: 'Quant Small Cap', ticker: 'Direct Growth', action: 'BUY', insight: "Small cap index breakout.", confidence: '95%' },
  ];

  const currentData = assetType === 'stocks' ? stocks : mf;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <View>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.statusText, { color: colors.primary }]}>SYSTEM ONLINE</Text>
          </View>
          <Text style={[styles.greeting, { color: colors.text }]}>Good evening,{'\n'}Julian</Text>
        </View>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Bell size={20} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.toggleContainer, { backgroundColor: colors.institutionalGray }]}>
          <TouchableOpacity 
            onPress={() => setAssetType('stocks')}
            style={[styles.toggleBtn, assetType === 'stocks' && { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.toggleText, { color: assetType === 'stocks' ? (isDark ? '#000' : '#FFF') : colors.textDim }]}>STOCKS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setAssetType('mf')}
            style={[styles.toggleBtn, assetType === 'mf' && { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.toggleText, { color: assetType === 'mf' ? (isDark ? '#000' : '#FFF') : colors.textDim }]}>MUTUAL FUNDS</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.institutionalGray }]}>
          <Search size={18} color={colors.textDim} />
          <TextInput 
            placeholder="Search securities..." 
            placeholderTextColor={colors.textDim}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Market Pulse</Text>
        </View>
        
        {loadingPulse ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pulseScroll}>
             <View style={[styles.pulseCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: colors.primary }]}>
               <Text style={[styles.pulseLabel, { color: colors.textDim }]}>NIFTY 50</Text>
               <Text style={[styles.pulseValue, { color: colors.text }]}>{marketPulse?.nifty?.value || '25,807'}</Text>
               <Text style={[styles.pulseChange, { color: marketPulse?.nifty?.trend === 'up' ? colors.primary : colors.textDim }]}>
                 {marketPulse?.nifty?.change_percent || '+0.00%'}
               </Text>
             </View>
             <View style={[styles.pulseCard, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: colors.primaryDim }]}>
               <Text style={[styles.pulseLabel, { color: colors.textDim }]}>SENSEX</Text>
               <Text style={[styles.pulseValue, { color: colors.text }]}>{marketPulse?.sensex?.value || '83,674'}</Text>
               <Text style={[styles.pulseChange, { color: marketPulse?.sensex?.trend === 'up' ? colors.primary : colors.textDim }]}>
                 {marketPulse?.sensex?.change_percent || '+0.00%'}
               </Text>
             </View>
          </ScrollView>
        )}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Institutional Insight</Text>
          <View style={styles.liveIndicator}>
            <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.liveText, { color: colors.primary }]}>LIVE</Text>
          </View>
        </View>

        <View style={styles.feedContainer}>
          {currentData.map((item) => (
            <View key={item.id} style={[styles.insightCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardBrand}>
                  <View style={styles.brandIcon}>
                    <Zap size={16} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.brandName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.brandTicker, { color: colors.textDim }]}>{item.ticker}</Text>
                  </View>
                </View>
                <View style={[styles.actionBadge, { backgroundColor: isDark ? 'rgba(19, 236, 91, 0.1)' : 'rgba(14, 158, 61, 0.1)' }]}>
                  <Text style={[styles.actionText, { color: colors.primary }]}>{item.action}</Text>
                </View>
              </View>
              <Text style={[styles.insightDescription, { color: colors.textDim }]}>{item.insight}</Text>
              <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                 <Text style={[styles.footerText, { color: colors.textDim }]}>AI Confidence: {item.confidence}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: theme.spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  greeting: { fontSize: 28, fontWeight: '300' },
  iconButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  toggleContainer: { margin: theme.spacing.lg, borderRadius: 30, flexDirection: 'row', padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 25 },
  toggleText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5 },
  searchBar: { marginHorizontal: theme.spacing.lg, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 56 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 14 },
  sectionHeader: { paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl, marginBottom: theme.spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '500' },
  pulseScroll: { paddingLeft: theme.spacing.lg },
  pulseCard: { width: 150, padding: 16, borderRadius: 12, borderLeftWidth: 2, marginRight: 12, borderWidth: 1 },
  pulseLabel: { fontSize: 10, fontWeight: 'bold' },
  pulseValue: { fontSize: 16, marginVertical: 4 },
  pulseChange: { fontSize: 10, fontWeight: 'bold' },
  liveIndicator: { flexDirection: 'row', alignItems: 'center' },
  liveText: { fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
  feedContainer: { paddingHorizontal: theme.spacing.lg, paddingBottom: 100 },
  insightCard: { borderRadius: 16, padding: 20, borderWidth: 1, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardBrand: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  brandName: { fontSize: 14, fontWeight: 'bold' },
  brandTicker: { fontSize: 10 },
  actionBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  actionText: { fontSize: 10, fontWeight: 'bold' },
  insightDescription: { fontSize: 12, lineHeight: 18 },
  cardFooter: { marginTop: 16, paddingTop: 12, borderTopWidth: 1 },
  footerText: { fontSize: 10 }
});

export default HomeScreen;
