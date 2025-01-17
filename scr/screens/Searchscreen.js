import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Mock data - replace with actual Spotify API call
    const searchArtists = (query) => {
        const mockResults = [
            { id: 1, name: 'Taylor Swift', genres: ['Pop', 'Country'], monthlyListeners: '85.5M' },
            { id: 2, name: 'Drake', genres: ['Hip-hop', 'Rap'], monthlyListeners: '75.2M' },
            { id: 3, name: 'The Weeknd', genres: ['R&B', 'Pop'], monthlyListeners: '68.3M' },
        ].filter(artist => 
            artist.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(mockResults);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Artists</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for artists..."
                    placeholderTextColor="#B3B3B3"
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        searchArtists(text);
                    }}
                />
            </View>

            {/* Results List */}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.artistCard}
                        onPress={() => navigation.navigate('ArtistDetail', { artistId: item.id })}
                    >
                        <View>
                            <Text style={styles.artistName}>{item.name}</Text>
                            <Text style={styles.artistInfo}>
                                {item.genres.join(' • ')}
                            </Text>
                            <Text style={styles.listenerCount}>
                                {item.monthlyListeners} monthly listeners
                            </Text>
                        </View>
                        <Text style={styles.arrowText}>→</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
        marginBottom: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 8,
        color: '#FFFFFF',
        fontSize: 16,
    },
    artistCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    artistName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    artistInfo: {
        color: '#B3B3B3',
        fontSize: 14,
        marginBottom: 4,
    },
    listenerCount: {
        color: '#1DB954',
        fontSize: 14,
    },
    arrowText: {
        color: '#1DB954',
        fontSize: 24,
        fontWeight: 'bold',
    },
    separator: {
        height: 10,
    },
});

export default SearchScreen;