import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>A</Text>
                </View>
                <Text style={styles.name}>Arjun Toragaravalli Ramapriya</Text>
            </View>

            <View style={styles.balanceCard}>
                <View>
                    <Text style={styles.balanceAmount}>₹56.05</Text>
                    <Text style={styles.balanceLabel}>Stocks, F&O balance</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add money</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Account details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Bank & AutoPay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Customer support 24x7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Reports</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Clean White like Groww
    },
    header: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary, // Groww Blue/Green
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    avatarText: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    balanceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    balanceAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    balanceLabel: {
        fontSize: 12,
        color: theme.colors.textMuted,
    },
    addButton: {
        backgroundColor: '#E0F2F1', // Light Green
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#00897B', // Dark Green
        fontWeight: 'bold',
    },
    menu: {
        marginTop: theme.spacing.m,
    },
    menuItem: {
        paddingVertical: theme.spacing.l,
        paddingHorizontal: theme.spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuText: {
        fontSize: 16,
        color: '#444',
    },
});

export default ProfileScreen;
