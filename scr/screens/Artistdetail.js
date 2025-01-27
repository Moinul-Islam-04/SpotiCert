import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import spotifyService from '../services/spotifyService';

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artistId } = route.params;
    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState(null);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const artistDetails = await spotifyService.fetchArtistDetails(artistId);
                setArtistData(artistDetails);
                
                // Assuming you have user's access token stored somewhere
                const userAccessToken = await getUserAccessToken(); // Implement this based on your auth flow
                const stats = await spotifyService.getUserArtistStats(artistId, userAccessToken);
                setUserStats(stats);
            } catch (error) {
                console.error('Error fetching artist data:', error);
                // Implement error handling UI
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [artistId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    if (!artistData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load artist data</Text>
            </View>
        );
    }

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
                        Time Listened: {userStats?.timeListened || 'Not available'}
                    </Text>
                    <Text style={styles.statItem}>
                        Listener Ranking: {userStats?.ranking || 'Not available'}
                    </Text>
                    <Text style={styles.statSubtitle}>Top Songs:</Text>
                    {artistData.topTracks.slice(0, 3).map((track, index) => (
                        <Text key={track.id} style={styles.songItem}>
                            {index + 1}. {track.name}
                        </Text>
                    ))}
                </View>
            </View>

            {/* Rest of your existing UI components... */}
        </ScrollView>
    );
};

// Add these new styles to your existing StyleSheet
const newStyles = {
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    errorText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
};

const styles = StyleSheet.create({
    ...StyleSheet.flatten(newStyles),
    // ... your existing styles
});

export default ArtistDetailScreen;