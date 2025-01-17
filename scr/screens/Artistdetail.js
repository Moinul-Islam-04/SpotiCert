import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artistId } = route.params;

    // Mock data - replace with actual API calls
    const artistData = {
        name: "Taylor Swift",
        genres: ["Pop", "Country"],
        monthlyListeners: "85.5M",
        yourStats: {
            timeListened: "45 hours",
            topSongs: ["Anti-Hero", "Cruel Summer", "Karma"],
            ranking: "Top 2% of listeners"
        },
        concerts: [
            {
                id: 1,
                date: "March 15, 2024",
                venue: "Madison Square Garden",
                location: "New York, NY",
                available: true
            },
            {
                id: 2,
                date: "April 2, 2024",
                venue: "Staples Center",
                location: "Los Angeles, CA",
                available: false
            }
        ]
    };

    return (
        <ScrollView style={styles.container}>
            {/* Artist Header */}
            <View style={styles.header}>
                <Text style={styles.artistName}>{artistData.name}</Text>
                <Text style={styles.artistInfo}>
                    {artistData.genres.join(' • ')}
                </Text>
                <Text style={styles.listeners}>
                    {artistData.monthlyListeners} monthly listeners
                </Text>
            </View>

            {/* Your Listening Stats */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Stats</Text>
                <View style={styles.statsCard}>
                    <Text style={styles.statItem}>
                        Time Listened: {artistData.yourStats.timeListened}
                    </Text>
                    <Text style={styles.statItem}>
                        Listener Ranking: {artistData.yourStats.ranking}
                    </Text>
                    <Text style={styles.statSubtitle}>Your Top Songs:</Text>
                    {artistData.yourStats.topSongs.map((song, index) => (
                        <Text key={index} style={styles.songItem}>
                            {index + 1}. {song}
                        </Text>
                    ))}
                </View>
            </View>

            {/* Upcoming Concerts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Concerts</Text>
                {artistData.concerts.map((concert) => (
                    <View key={concert.id} style={styles.concertCard}>
                        <View>
                            <Text style={styles.concertDate}>{concert.date}</Text>
                            <Text style={styles.concertVenue}>{concert.venue}</Text>
                            <Text style={styles.concertLocation}>{concert.location}</Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.ticketButton,
                                !concert.available && styles.ticketButtonDisabled
                            ]}
                            disabled={!concert.available}
                        >
                            <Text style={styles.ticketButtonText}>
                                {concert.available ? 'Get Tickets' : 'Sold Out'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#282828',
    },
    artistName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    artistInfo: {
        fontSize: 16,
        color: '#B3B3B3',
        marginBottom: 8,
    },
    listeners: {
        fontSize: 16,
        color: '#1DB954',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#282828',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
    },
    statsCard: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 8,
    },
    statItem: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8,
    },
    statSubtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 8,
    },
    songItem: {
        color: '#B3B3B3',
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 4,
    },
    concertCard: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    concertDate: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    concertVenue: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 2,
    },
    concertLocation: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    ticketButton: {
        backgroundColor: '#1DB954',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    ticketButtonDisabled: {
        backgroundColor: '#282828',
        borderWidth: 1,
        borderColor: '#B3B3B3',
    },
    ticketButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ArtistDetailScreen;