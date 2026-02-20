import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { theme } from '../theme';
import { diagnosePortfolio } from '../api/client';

const DoctorScreen = () => {
    // Initial state with two empty slots
    const [holdings, setHoldings] = useState([
        { symbol: '', quantity: '' },
        { symbol: '', quantity: '' }
    ]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const addStock = () => {
        setHoldings([...holdings, { symbol: '', quantity: '' }]);
    };

    const updateHolding = (index, field, value) => {
        const newHoldings = [...holdings];
        newHoldings[index][field] = value;
        setHoldings(newHoldings);
    };

    const handleDiagnose = async () => {
        // Filter out empty entries
        const validHoldings = holdings
            .filter(h => h.symbol.trim() !== '')
            .map(h => ({
                symbol: h.symbol.toUpperCase().trim(),
                quantity: parseInt(h.quantity) || 1
            }));

        if (validHoldings.length === 0) {
            Alert.alert("Input Required", "Please enter at least one stock symbol.");
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const data = await diagnosePortfolio(validHoldings);
            setResult(data);
        } catch (error) {
            Alert.alert("Diagnosis Failed", "Could not connect to The Doctor.");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return theme.colors.success;
        if (score >= 50) return theme.colors.primary;
        return theme.colors.danger;
    };

    return (
        <ScrollView style={styles.container}>
            {!result ? (
                // INPUT MODE
                <View>
                    <Text style={styles.headerTitle}>Portfolio Checkup</Text>
                    <Text style={styles.subTitle}>Enter your current holdings for a ruthless institutional diagnosis.</Text>
                    
                    <View style={styles.card}>
                        {holdings.map((item, index) => (
                            <View key={index} style={styles.inputRow}>
                                <TextInput
                                    style={[styles.input, styles.symbolInput]}
                                    placeholder="Symbol (e.g. INFY)"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={item.symbol}
                                    onChangeText={(text) => updateHolding(index, 'symbol', text)}
                                />
                                <TextInput
                                    style={[styles.input, styles.qtyInput]}
                                    placeholder="Qty"
                                    placeholderTextColor={theme.colors.textMuted}
                                    keyboardType="numeric"
                                    value={item.quantity}
                                    onChangeText={(text) => updateHolding(index, 'quantity', text)}
                                />
                            </View>
                        ))}
                        
                        <TouchableOpacity style={styles.addButton} onPress={addStock}>
                            <Text style={styles.addButtonText}>+ Add Stock</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.diagnoseButton} onPress={handleDiagnose} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.diagnoseText}>RUN DIAGNOSIS</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                // RESULT MODE
                <View style={styles.resultContainer}>
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreTitle}>Health Score</Text>
                        <Text style={[styles.scoreValue, { color: getScoreColor(parseInt(result.diagnosis.health_score)) }]}>
                            {result.diagnosis.health_score}/100
                        </Text>
                        <Text style={styles.riskLabel}>Risk Level: {result.diagnosis.risk_level}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Doctor's Summary</Text>
                        <Text style={styles.bodyText}>{result.diagnosis.diagnosis_summary}</Text>
                    </View>

                    {result.diagnosis.critical_warnings.length > 0 && (
                        <View style={styles.warningCard}>
                            <Text style={styles.warningTitle}>⚠️ CRITICAL WARNINGS</Text>
                            {result.diagnosis.critical_warnings.map((warn, i) => (
                                <Text key={i} style={styles.warningText}>• {warn}</Text>
                            ))}
                        </View>
                    )}

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Prescriptions</Text>
                        {result.diagnosis.prescriptions.map((rx, i) => (
                            <View key={i} style={styles.rxCard}>
                                <View style={styles.rxHeader}>
                                    <Text style={styles.rxSymbol}>{rx.symbol}</Text>
                                    <View style={[
                                        styles.rxBadge, 
                                        { backgroundColor: rx.action.includes('SELL') ? theme.colors.danger : theme.colors.success }
                                    ]}>
                                        <Text style={styles.rxAction}>{rx.action}</Text>
                                    </View>
                                </View>
                                <Text style={styles.rxReason}>{rx.reason}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={() => setResult(null)}>
                        <Text style={styles.resetText}>Check Another Portfolio</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        marginBottom: theme.spacing.s,
    },
    subTitle: {
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.l,
        fontSize: 14,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.xl,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.m,
    },
    input: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.s,
        fontSize: 16,
    },
    symbolInput: {
        flex: 2,
        marginRight: theme.spacing.s,
    },
    qtyInput: {
        flex: 1,
    },
    addButton: {
        alignItems: 'center',
        padding: theme.spacing.s,
        marginBottom: theme.spacing.l,
    },
    addButtonText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    diagnoseButton: {
        backgroundColor: theme.colors.danger, // Red for medical emergency vibe
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.s,
        alignItems: 'center',
    },
    diagnoseText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scoreCard: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.l,
    },
    scoreTitle: {
        color: theme.colors.textMuted,
        fontSize: 16,
        marginBottom: theme.spacing.s,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: '900',
        marginBottom: theme.spacing.s,
    },
    riskLabel: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    bodyText: {
        color: theme.colors.text,
        fontSize: 16,
        lineHeight: 24,
    },
    warningCard: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red transparent
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.danger,
    },
    warningTitle: {
        color: theme.colors.danger,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    warningText: {
        color: theme.colors.danger,
        marginBottom: 4,
    },
    rxCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.m,
    },
    rxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    rxSymbol: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 18,
    },
    rxBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    rxAction: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    rxReason: {
        color: theme.colors.textMuted,
        fontSize: 14,
    },
    resetButton: {
        padding: theme.spacing.l,
        alignItems: 'center',
    },
    resetText: {
        color: theme.colors.textMuted,
        textDecorationLine: 'underline',
    },
});

export default DoctorScreen;
