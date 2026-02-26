import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import theme, { COLORS, SPACING } from '../theme';
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
                <ActivityIndicator size="large" color={COLORS.primary} />
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
        verdict === 'BUY' ? COLORS.success :
        verdict === 'SELL' ? COLORS.danger :
        COLORS.primary;

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
                        { color: market_data.change > 0 ? COLORS.success : COLORS.danger }
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
        backgroundColor: COLORS.background,
        padding: SPACING.l,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        marginTop: SPACING.m,
        color: COLORS.textMuted,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: COLORS.danger,
    },
    header: {
        marginBottom: SPACING.xl,
    },
    symbol: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.text,
    },
    companyName: {
        fontSize: 16,
        color: COLORS.textMuted,
        marginBottom: SPACING.s,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginRight: SPACING.m,
    },
    change: {
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderRadius: theme.borderRadius.m,
        marginBottom: SPACING.xl,
    },
    verdictTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: SPACING.s,
    },
    riskText: {
        color: COLORS.textMuted,
        marginBottom: SPACING.m,
        fontWeight: '600',
    },
    summaryText: {
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 24,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surfaceLight,
        paddingBottom: SPACING.s,
    },
    bulletPoint: {
        color: COLORS.textMuted,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: SPACING.s,
    },
});

export default MemoScreen;
