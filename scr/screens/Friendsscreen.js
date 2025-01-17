import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const FriendsScreen = () => {
    // Mock data for friends' concerts - replace with actual data later
    const friendsConcerts = [
        { 
            id: 1, 
            name: 'Sarah Wilson', 
            concert: 'Taylor Swift - Eras Tour',
            venue: 'MetLife Stadium',
            date: 'May 25, 2025'
        },
        { 
            id: 2, 
            name: 'Mike Johnson', 
            concert: 'Drake - For All The Dogs Tour',
            venue: 'Madison Square Garden',
            date: 'Feb 28, 2025'
        },
        { 
            id: 3, 
            name: 'Emma Davis', 
            concert: 'The Weeknd - After Hours Tour',
            venue: 'Barclays Center',
            date: 'March 15, 2025'
        },
        { 
            id: 4, 
            name: 'Chris Brown', 
            concert: 'Bad Bunny - Most Wanted Tour',
            venue: 'UBS Arena',
            date: 'April 2, 2025'
        },
        { 
            id: 5, 
            name: 'Lisa Anderson', 
            concert: 'Ed Sheeran - Mathematics Tour',
            venue: 'Citi Field',
            date: 'June 10, 2025'
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Friends' Concerts</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.concertsContainer}>
                {friendsConcerts.map((friend) => (
                    <TouchableOpacity key={friend.id} style={styles.concertBox}>
                        <View style={styles.friendSection}>
                            <View style={styles.friendIcon}>
                                <Text style={styles.friendInitial}>
                                    {friend.name.charAt(0)}
                                </Text>
                            </View>
                            <Text style={styles.friendName}>{friend.name}</Text>
                        </View>
                        
                        <View style={styles.concertInfo}>
                            <Text style={styles.concertName}>{friend.concert}</Text>
                            <View style={styles.concertDetails}>
                                <Text style={styles.venueText}>{friend.venue}</Text>
                                <Text style={styles.dateText}>{friend.date}</Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity style={styles.interestedButton}>
                            <Text style={styles.interestedButtonText}>I'm Interested</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    filterButton: {
        backgroundColor: '#282828',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    filterButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    concertsContainer: {
        width: '100%',
    },
    concertBox: {
        backgroundColor: '#282828',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    friendSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    friendIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1DB954',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    friendInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    friendName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    concertInfo: {
        marginBottom: 12,
    },
    concertName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    concertDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    venueText: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    dateText: {
        color: '#1DB954',
        fontSize: 14,
        fontWeight: '500',
    },
    interestedButton: {
        backgroundColor: '#1DB954',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    interestedButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default FriendsScreen;