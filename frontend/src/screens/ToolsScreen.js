import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme';

const ToolsScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>AI Tools</Text>
            
            <View style={styles.grid}>
                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('Portfolio')}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🏗️</Text>
                    </View>
                    <Text style={styles.cardTitle}>Architect</Text>
                    <Text style={styles.cardDesc}>Build Portfolio</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('Doctor')}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🩺</Text>
                    </View>
                    <Text style={styles.cardTitle}>The Doctor</Text>
                    <Text style={styles.cardDesc}>Portfolio Diagnosis</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('Backtest')}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>⏳</Text>
                    </View>
                    <Text style={styles.cardTitle}>Time Travel</Text>
                    <Text style={styles.cardDesc}>Backtest Strategy</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.l,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.m,
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.surfaceLight,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    icon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: theme.colors.textMuted,
        textAlign: 'center',
    },
});

export default ToolsScreen;
