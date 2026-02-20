import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('Memo', { symbol: searchQuery.toUpperCase() });
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Stocks</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={24} color="#000" /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="qr-code-outline" size={24} color="#000" /></TouchableOpacity>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>
                </View>
            </View>

            {/* Market Indices */}
            <View style={styles.indicesRow}>
                <View style={styles.indexItem}>
                    <Text style={styles.indexName}>NIFTY 50</Text>
                    <View style={styles.indexValueRow}>
                        <Text style={styles.indexValue}>25,935.15</Text>
                        <Text style={styles.indexChange}>+67.85</Text>
                    </View>
                </View>
                <View style={styles.indexItem}>
                    <Text style={styles.indexName}>SENSEX</Text>
                    <View style={styles.indexValueRow}>
                        <Text style={styles.indexValue}>84,273.92</Text>
                        <Text style={styles.indexChange}>+208.17</Text>
                    </View>
                </View>
            </View>

            {/* Tab Filter */}
            <View style={styles.tabRow}>
                <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabText}>Holdings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabText}>Positions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabText}>Orders</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color={theme.colors.textMuted} style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search stocks, mutual funds..."
                        placeholderTextColor={theme.colors.textMuted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                </View>

                {/* Most Bought Section */}
                <Text style={styles.sectionTitle}>Most bought on AlphaGalleon</Text>
                <View style={styles.cardGrid}>
                    <TouchableOpacity style={styles.stockCard} onPress={() => navigation.navigate('Memo', { symbol: 'RELIANCE' })}>
                        <View style={styles.stockIcon}><Text style={styles.stockInitial}>R</Text></View>
                        <Text style={styles.stockName} numberOfLines={1}>Reliance Industries</Text>
                        <Text style={styles.stockPrice}>₹1,451.00</Text>
                        <Text style={styles.stockChange}>-0.06 (0.24%)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.stockCard} onPress={() => navigation.navigate('Memo', { symbol: 'TATASTEEL' })}>
                        <View style={styles.stockIcon}><Text style={styles.stockInitial}>T</Text></View>
                        <Text style={styles.stockName} numberOfLines={1}>Tata Steel</Text>
                        <Text style={styles.stockPrice}>₹156.40</Text>
                        <Text style={[styles.stockChange, { color: theme.colors.success }]}>+4.25 (2.6%)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.stockCard} onPress={() => navigation.navigate('Memo', { symbol: 'INFY' })}>
                        <View style={styles.stockIcon}><Text style={styles.stockInitial}>I</Text></View>
                        <Text style={styles.stockName} numberOfLines={1}>Infosys</Text>
                        <Text style={styles.stockPrice}>₹1,890.00</Text>
                        <Text style={styles.stockChange}>-12.00 (0.6%)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.stockCard} onPress={() => navigation.navigate('Memo', { symbol: 'HDFCBANK' })}>
                        <View style={styles.stockIcon}><Text style={styles.stockInitial}>H</Text></View>
                        <Text style={styles.stockName} numberOfLines={1}>HDFC Bank</Text>
                        <Text style={styles.stockPrice}>₹1,650.00</Text>
                        <Text style={[styles.stockChange, { color: theme.colors.success }]}>+15.00 (0.9%)</Text>
                    </TouchableOpacity>
                </View>

                {/* Products Section */}
                <Text style={styles.sectionTitle}>Products & Tools</Text>
                <View style={styles.productsRow}>
                    <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('Tools')}>
                        <View style={styles.productIcon}><Ionicons name="grid" size={24} color={theme.colors.primary} /></View>
                        <Text style={styles.productText}>All Tools</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productItem}>
                        <View style={styles.productIcon}><Ionicons name="trending-up" size={24} color="#6366F1" /></View>
                        <Text style={styles.productText}>F&O</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productItem}>
                        <View style={styles.productIcon}><Ionicons name="calendar" size={24} color="#F59E0B" /></View>
                        <Text style={styles.productText}>IPO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productItem}>
                        <View style={styles.productIcon}><Ionicons name="flash" size={24} color="#EF4444" /></View>
                        <Text style={styles.productText}>Intraday</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        marginRight: 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    indicesRow: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    indexItem: {
        marginRight: theme.spacing.xl,
    },
    indexName: {
        fontSize: 12,
        color: theme.colors.textMuted,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    indexValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indexValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 6,
    },
    indexChange: {
        fontSize: 12,
        color: theme.colors.success,
    },
    tabRow: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
    },
    tabItem: {
        marginRight: theme.spacing.l,
        paddingBottom: 6,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
    },
    tabText: {
        fontSize: 16,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    activeTabText: {
        color: theme.colors.primary,
    },
    content: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: 100,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceLight,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: theme.spacing.l,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: theme.spacing.m,
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    stockCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    stockIcon: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    stockInitial: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    stockName: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },
    stockPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    stockChange: {
        fontSize: 12,
        color: theme.colors.textMuted,
    },
    productsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.s,
    },
    productItem: {
        alignItems: 'center',
    },
    productIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    productText: {
        fontSize: 12,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
});

export default HomeScreen;
