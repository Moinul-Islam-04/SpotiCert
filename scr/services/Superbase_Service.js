// services/supabaseService.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { encode as btoa } from 'base-64';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class AuthService {
  // Supabase Authentication
  async signUp({ email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Spotify Authorization
  async authorizeSpotify() {
    const redirectUri = makeRedirectUri({
      scheme: 'your-app-scheme',
      path: 'spotify-auth'
    });

    const scope = 'user-top-read user-read-recently-played user-library-read';
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    const result = await WebBrowser.openAuthSessionAsync(spotifyAuthUrl, redirectUri);
    
    if (result.type === 'success') {
      const code = result.url.split('code=')[1];
      await this.getAndStoreSpotifyTokens(code, redirectUri);
    }
  }

  async getAndStoreSpotifyTokens(code, redirectUri) {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    });

    const tokens = await tokenResponse.json();
    
    // Store tokens in Supabase
    const { error } = await supabase
      .from('user_spotify_data')
      .upsert({
        id: (await supabase.auth.getUser()).data.user.id,
        spotify_access_token: tokens.access_token,
        spotify_refresh_token: tokens.refresh_token,
        spotify_token_expiry: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      });

    if (error) throw error;
  }

  async getSpotifyTokens() {
    const { data, error } = await supabase
      .from('user_spotify_data')
      .select('spotify_access_token, spotify_refresh_token, spotify_token_expiry')
      .single();

    if (error) throw error;

    // Check if token needs refresh
    if (new Date(data.spotify_token_expiry) <= new Date()) {
      return await this.refreshSpotifyTokens(data.spotify_refresh_token);
    }

    return data.spotify_access_token;
  }

  async refreshSpotifyTokens(refreshToken) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });

    const tokens = await response.json();

    // Update tokens in database
    const { error } = await supabase
      .from('user_spotify_data')
      .update({
        spotify_access_token: tokens.access_token,
        spotify_token_expiry: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      })
      .eq('id', (await supabase.auth.getUser()).data.user.id);

    if (error) throw error;
    return tokens.access_token;
  }
}

export default new AuthService();