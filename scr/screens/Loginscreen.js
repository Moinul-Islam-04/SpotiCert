import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native';
import { loginWithSpotify, getSpotifyTokensFromRedirect } from '../auth/SpotifyAuth'; // Import the functions

const Loginscreen = ({ navigation }) => {
    // useState for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle Spotify Login
    const handleSpotifyLoginPress = async () => {
        console.log('Login with Spotify button pressed');
        // Trigger the Spotify login
        loginWithSpotify();
    };

    useEffect(() => {
        // Function to handle redirect from Spotify
        const handleRedirect = async (event) => {
            const { url } = event;
            if (url) {
                const tokens = await getSpotifyTokensFromRedirect(url); // Extract tokens from the redirect URL
                if (tokens) {
                    console.log('Tokens:', tokens);
                    // After obtaining tokens, navigate to the appropriate screen
                    navigation.navigate('MainTabs'); // Adjust to the correct screen name
                }
            }
        };

        // Add the event listener for the URL
        Linking.addEventListener('url', handleRedirect);

        // Clean up the event listener when the component unmounts
        return () => {
            Linking.removeEventListener('url', handleRedirect);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to SpotiCert!</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#B3B3B3"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#B3B3B3"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MainTabs')}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            {/* Spotify Login Button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#1DB954' }]} // Use Spotify's green for the button
                onPress={handleSpotifyLoginPress}
            >
                <Text style={styles.buttonText}>Login with Spotify</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Spotify's black background
        padding: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#282828', // Spotify's darker gray for input fields
        width: '100%',
        padding: 15,
        borderRadius: 4,
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#282828',
    },
    button: {
        backgroundColor: '#1DB954', // Spotify green
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15, // Add some space between buttons
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default Loginscreen;
