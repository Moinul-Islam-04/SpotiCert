import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import authService from '../services/auth_service';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSpotifyLogin = async () => {
    try {
      setLoading(true);
      await authService.authorizeSpotify();
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to login with Spotify. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/app-logo.png')} // Make sure to add your app logo
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Welcome to YourApp</Text>
        <Text style={styles.subtitle}>Listen together with friends</Text>

        <TouchableOpacity 
          style={styles.spotifyButton}
          onPress={handleSpotifyLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View style={styles.buttonContent}>
              <Image 
                source={require('../assets/spotify-icon.png')} // Add Spotify icon
                style={styles.spotifyIcon}
              />
              <Text style={styles.buttonText}>
                Login with Spotify
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 48,
    textAlign: 'center',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    maxWidth: 300,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotifyIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: '#B3B3B3',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;