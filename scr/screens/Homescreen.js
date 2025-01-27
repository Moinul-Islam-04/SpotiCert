import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Image,
  ActivityIndicator 
} from 'react-native';
import spotifyConcertService from '../services/spotifyConcertService';

const Homescreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [topArtists, setTopArtists] = useState([]);
    const [recommendedConcerts, setRecommendedConcerts] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [artists, profile] = await Promise.all([
                spotifyConcertService.getUserTopArtists(),
                spotifyConcertService.getUserProfile()
            ]);

            setTopArtists(artists);
            setUserProfile(profile);

            // Generate concert recommendations based on top artists
            const concerts = artists.map(artist => 
                spotifyConcertService.generateConcertData(artist)
            );
            setRecommendedConcerts(concerts);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Top Artists</Text>
                <TouchableOpacity 
                    style={styles.profileButton}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <View style={styles.profileIcon}>
                        <Text style={styles.profileInitial}>
                            {userProfile?.display_name?.[0]?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            <View style={styles.artistsContainer}>
                {topArtists.map((artist) => (
                    <TouchableOpacity 
                        key={artist.id} 
                        style={styles.artistBox}
                        onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}
                    >
                        <View style={styles.artistInfo}>
                            {artist.images[0]?.url ? (
                                <Image 
                                    source={{ uri: artist.images[0].url }}
                                    style={styles.artistImage}
                                />
                            ) : null}
                            <View>
                                <Text style={styles.artistName}>{artist.name}</Text>
                                <Text style={styles.artistGenre}>
                                    {artist.genres[0] || 'Artist'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.arrowButton}>
                            <Text style={styles.arrowText}>→</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Concerts</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.concertsContainer}>
                {recommendedConcerts.map((concert) => (
                    <TouchableOpacity 
                        key={concert.id} 
                        style={styles.concertCard}
                        onPress={() => navigation.navigate('ArtistDetail', { artistId: concert.id })}
                    >
                        {concert.image ? (
                            <Image 
                                source={{ uri: concert.image }}
                                style={styles.concertImage}
                            />
                        ) : (
                            <View style={styles.concertImagePlaceholder}>
                                <Text style={styles.concertImageText}>
                                    {concert.artist.charAt(0)}
                                </Text>
                            </View>
                        )}
                        <View style={styles.concertInfo}>
                            <Text style={styles.concertArtist}>{concert.artist}</Text>
                            <Text style={styles.concertTour}>{concert.tour}</Text>
                            <View style={styles.concertDetails}>
                                <Text style={styles.concertDate}>{concert.date}</Text>
                                <Text style={styles.concertVenue}>{concert.venue}</Text>
                            </View>
                            <Text style={styles.concertPrice}>{concert.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

// Extend your existing styles
const styles = StyleSheet.create({
    // ... your existing styles ...
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    artistInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    artistImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    artistGenre: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    concertImage: {
        width: 120,
        height: 120,
    },
    // ... rest of your existing styles ...
});

export default Homescreen;