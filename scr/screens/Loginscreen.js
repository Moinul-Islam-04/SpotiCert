import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';

const Loginscreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to SpotiCert!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')} // Navigate to Home screen
            >
                <Text style={styles.buttonText}>Go to Home Screen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1DB954', // Spotify green color
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Loginscreen;