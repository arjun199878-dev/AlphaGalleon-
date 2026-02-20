import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';
import { Moon, Sun, Shield, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

const SystemScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.subTitle, { color: colors.primary }]}>PREFERENCES</Text>
        <Text style={[styles.title, { color: colors.text }]}>System</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.institutionalGray }]}>
             <Text style={[styles.avatarText, { color: colors.primary }]}>J</Text>
          </View>
          <View>
            <Text style={[styles.profileName, { color: colors.text }]}>Julian's Vault</Text>
            <Text style={styles.profileLevel}>AlphaGalleon Client • Tier I</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Theme Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              {isDark ? <Moon size={20} color={colors.textDim} /> : <Sun size={20} color={colors.textDim} />}
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: colors.primaryDim }}
              thumbColor={isDark ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDark}
            />
          </View>

          <TouchableOpacity style={[styles.settingRow, styles.borderTop, { borderTopColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.textDim} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
            </View>
            <ChevronRight size={18} color={colors.textDim} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={colors.textDim} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Biometric Security</Text>
            </View>
            <ChevronRight size={18} color={colors.textDim} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingRow, styles.borderTop, { borderTopColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color={colors.textDim} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Support & Docs</Text>
            </View>
            <ChevronRight size={18} color={colors.textDim} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutBtn}>
          <LogOut size={16} color={colors.error} />
          <Text style={[styles.signOutText, { color: colors.error }]}>SECURELY TERMINATE SESSION</Text>
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
  profileSection: { flexDirection: 'row', alignItems: 'center', gap: 16, marginVertical: 24 },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyCenter: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarText: { fontSize: 24, fontWeight: 'bold', lineHeight: 56 },
  profileName: { fontSize: 18, fontWeight: 'bold' },
  profileLevel: { fontSize: 10, color: '#64748b', marginTop: 2, letterSpacing: 1 },
  section: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingLabel: { fontSize: 14, fontWeight: '500' },
  borderTop: { borderTopWidth: 1 },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40 },
  signOutText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
});

export default SystemScreen;
