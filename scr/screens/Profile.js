import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    // Mock data - replace with actual data from your backend/Spotify API
    const userProfile = {
        name: "John Doe",
        imageUrl: "https://via.placeholder.com/150", // Replace with actual Spotify profile picture
        upcomingConcerts: [
            {
                id: 1,
                artist: "Taylor Swift",
                date: "March 15, 2024",
                venue: "Madison Square Garden",
                location: "New York, NY"
            },
            {
                id: 2,
                artist: "The Weeknd",
                date: "April 2, 2024",
                venue: "Staples Center",
                location: "Los Angeles, CA"
            }
        ],
        topGenres: ["Pop", "R&B", "Rock"],
        topArtists: [
            "Taylor Swift",
            "Drake",
            "The Weeknd"
        ]
    };

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: userProfile.imageUrl }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{userProfile.name}</Text>
            </View>

            {/* Upcoming Concerts Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Concerts</Text>
                {userProfile.upcomingConcerts.map(concert => (
                    <TouchableOpacity 
                        key={concert.id}
                        style={styles.concertCard}
                        onPress={() => navigation.navigate('ConcertDetail', { concertId: concert.id })}
                    >
                        <Text style={styles.artistName}>{concert.artist}</Text>
                        <Text style={styles.concertInfo}>{concert.date}</Text>
                        <Text style={styles.concertInfo}>{concert.venue}</Text>
                        <Text style={styles.concertInfo}>{concert.location}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Music Taste Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Music Taste</Text>
                
                {/* Top Genres */}
                <View style={styles.genreContainer}>
                    <Text style={styles.subTitle}>Top Genres</Text>
                    <View style={styles.genreList}>
                        {userProfile.topGenres.map((genre, index) => (
                            <View key={index} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Top Artists */}
                <View style={styles.artistsContainer}>
                    <Text style={styles.subTitle}>Top Artists</Text>
                    {userProfile.topArtists.map((artist, index) => (
                        <Text key={index} style={styles.artistItem}>{artist}</Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#282828',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#282828',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
    },
    concertCard: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    concertInfo: {
        fontSize: 14,
        color: '#B3B3B3',
        marginBottom: 2,
    },
    genreContainer: {
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    genreList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    genreTag: {
        backgroundColor: '#1DB954',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    genreText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    artistsContainer: {
        marginTop: 10,
    },
    artistItem: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default ProfileScreen;