import * as AuthSession from 'expo-auth-session';

const authService = {
  async authorizeSpotify() {
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true, // Ensure this is true when testing on Expo Go
    });

    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private`,
    });

    if (result.type === 'success') {
      // Handle success
      return result.params.code;
    } else {
      throw new Error('Authorization failed');
    }
  },
};

export default authService;
