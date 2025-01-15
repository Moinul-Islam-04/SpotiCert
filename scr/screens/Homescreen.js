import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Homescreen = ({ navigation }) => {
    // Mock data for top artists - replace with actual data later
    const topArtists = [
        { id: 1, name: "Drake" },
        { id: 2, name: "Taylor Swift" },
        { id: 3, name: "The Weeknd" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Top Artists</Text>
            
            <View style={styles.artistsContainer}>
                {topArtists.map((artist) => (
                    <View key={artist.id} style={styles.artistBox}>
                        <Text style={styles.artistName}>{artist.name}</Text>
                        <TouchableOpacity 
                            style={styles.arrowButton}
                            onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}
                        >
                            <Text style={styles.arrowText}>→</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 40,
        marginBottom: 30,
    },
    artistsContainer: {
        width: '100%',
        gap: 15,
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
    backButton: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Homescreen;