import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const Homescreen = ({ navigation }) => {
    // Mock data for top artists - replace with actual data later
    const topArtists = [
        { id: 1, name: "Drake" },
        { id: 2, name: "Taylor Swift" },
        { id: 3, name: "The Weeknd" },
    ];

    // Mock data for recommended concerts
    const recommendedConcerts = [
        {
            id: 1,
            artist: "Drake",
            tour: "For All The Dogs Tour",
            date: "Mar 15, 2025",
            venue: "Madison Square Garden",
            price: "From $89.99"
        },
        {
            id: 2,
            artist: "The Weeknd",
            tour: "After Hours Tour",
            date: "Apr 22, 2025",
            venue: "Barclays Center",
            price: "From $75.00"
        },
        {
            id: 3,
            artist: "Travis Scott",
            tour: "Utopia Tour",
            date: "May 5, 2025",
            venue: "UBS Arena",
            price: "From $95.00"
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Top Artists</Text>
                <TouchableOpacity 
                    style={styles.profileButton}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <View style={styles.profileIcon}>
                        <Text style={styles.profileInitial}>J</Text>
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
                        <Text style={styles.artistName}>{artist.name}</Text>
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
                        <View style={styles.concertImagePlaceholder}>
                            <Text style={styles.concertImageText}>{concert.artist.charAt(0)}</Text>
                        </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profileButton: {
        marginLeft: 'auto',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1DB954',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    artistsContainer: {
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 30,
    },
    artistBox: {
        backgroundColor: '#282828',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    artistName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
    arrowButton: {
        backgroundColor: '#1DB954',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    seeAllText: {
        color: '#1DB954',
        fontSize: 16,
        fontWeight: '500',
    },
    concertsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    concertCard: {
        backgroundColor: '#282828',
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    concertImagePlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#1DB954',
        justifyContent: 'center',
        alignItems: 'center',
    },
    concertImageText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    concertInfo: {
        flex: 1,
        padding: 15,
    },
    concertArtist: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    concertTour: {
        color: '#B3B3B3',
        fontSize: 14,
        marginBottom: 8,
    },
    concertDetails: {
        marginBottom: 8,
    },
    concertDate: {
        color: '#1DB954',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
    },
    concertVenue: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    concertPrice: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Homescreen;