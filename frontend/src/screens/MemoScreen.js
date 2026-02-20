import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';
import { getInvestmentMemo } from '../api/client';

const MemoScreen = ({ route, navigation }) => {
    const { symbol } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemo = async () => {
            try {
                setLoading(true);
                const result = await getInvestmentMemo(symbol);
                setData(result);
            } catch (err) {
                setError("Could not generate intel.");
            } finally {
                setLoading(false);
            }
        };

        fetchMemo();
    }, [symbol]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Synthesizing Intelligence...</Text>
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || "Unknown Error"}</Text>
            </View>
        );
    }

    const { market_data, memo } = data;
    const { verdict, risk_rating, summary, bull_case, bear_case } = memo;

    const verdictColor = 
        verdict === 'BUY' ? theme.colors.success :
        verdict === 'SELL' ? theme.colors.danger :
        theme.colors.primary;

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.symbol}>{market_data.symbol}</Text>
                <Text style={styles.companyName}>{market_data.companyName}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{market_data.lastPrice}</Text>
                    <Text style={[
                        styles.change, 
                        { color: market_data.change > 0 ? theme.colors.success : theme.colors.danger }
                    ]}>
                        {market_data.change > 0 ? '+' : ''}{market_data.change} ({market_data.pChange}%)
                    </Text>
                </View>
            </View>

            {/* Verdict Card */}
            <View style={[styles.card, { borderLeftColor: verdictColor, borderLeftWidth: 4 }]}>
                <Text style={[styles.verdictTitle, { color: verdictColor }]}>{verdict}</Text>
                <Text style={styles.riskText}>Risk: {risk_rating}</Text>
                <Text style={styles.summaryText}>{summary}</Text>
            </View>

            {/* Bull Case */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Bull Thesis</Text>
                {bull_case.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {point}</Text>
                ))}
            </View>

            {/* Bear Case */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Bear Risks</Text>
                {bear_case.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {point}</Text>
                ))}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    loadingText: {
        marginTop: theme.spacing.m,
        color: theme.colors.textMuted,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: theme.colors.danger,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    symbol: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.text,
    },
    companyName: {
        fontSize: 16,
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.s,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginRight: theme.spacing.m,
    },
    change: {
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.xl,
    },
    verdictTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    riskText: {
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.m,
        fontWeight: '600',
    },
    summaryText: {
        color: theme.colors.text,
        fontSize: 16,
        lineHeight: 24,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surfaceLight,
        paddingBottom: theme.spacing.s,
    },
    bulletPoint: {
        color: theme.colors.textMuted,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: theme.spacing.s,
    },
});

export default MemoScreen;
