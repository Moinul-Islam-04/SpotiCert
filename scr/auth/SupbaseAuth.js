// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://otmygiatlndhpnkqpxrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90bXlnaWF0bG5kaHBua3FweHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMDMyODUsImV4cCI6MjA1MzU3OTI4NX0.VJb92uxAnsJ3D3spAqRpD-APpAkpfqXRwOg1717gCTQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Step 1: Sign up or log in user with Supabase (and link Spotify tokens)
async function signUpOrLoginWithSupabase(spotifyData) {
  const { accessToken, refreshToken } = spotifyData;

  try {
    // You can link Spotify data with Supabase Auth by checking if the user exists by email or another identifier.
    // Here, we'll just use the Spotify ID as the unique identifier
    const { data, error } = await supabase.auth.signUp({
      email: `${accessToken}@spotify.com`, // Use a unique email (can be Spotify email or generated)
      password: 'randompassword123', // Set a temporary password (just for account creation)
    });

    if (error) throw error;

    // You can now link the Spotify tokens to the user profile
    const { user } = data;
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        spotify_access_token: accessToken,
        spotify_refresh_token: refreshToken,
      });

    console.log('User signed up and linked to Spotify:', user);
    return user;
  } catch (error) {
    console.error('Error during Supabase sign-up/login:', error);
  }
}

// Step 2: Example of how you would use the above functions
async function handleSpotifyLogin() {
  const spotifyTokens = await getSpotifyTokensFromRedirect();
  if (spotifyTokens) {
    await signUpOrLoginWithSupabase(spotifyTokens);
  }
}

export { signUpOrLoginWithSupabase, handleSpotifyLogin };