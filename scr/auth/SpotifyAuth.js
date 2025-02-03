import { Linking } from 'react-native';

const CLIENT_ID = 'aee8e1a838d9498a9fa5667b9d47834c'; // Ensure these values are correct
const CLIENT_SECRET = '75192fc3ccde4f87aba66b084b529c85';
const REDIRECT_URI = 'exp://10.132.16.73:8081/callback'; // Replace with your actual redirect URI used for deep linking

// Step 1: Redirect user to Spotify for login
function loginWithSpotify() {
    const scope = 'user-read-private user-read-email'; // Scopes can be adjusted as needed
    const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;

    Linking.openURL(authURL); // Open Spotify login page in the user's default browser or a webview
}

// Step 2: Handle the redirect from Spotify with the authorization code
async function handleSpotifyRedirect() {
    // Listen for the incoming redirect
    Linking.addEventListener('url', handleUrl);

    // Optionally, clean up listener if not needed
    return () => {
        Linking.removeEventListener('url', handleUrl);
    };
}

const handleUrl = async (event) => {
    const url = event.url;
    const code = new URLSearchParams(url.split('?')[1]).get('code'); // Extract the authorization code

    if (code) {
        try {
            // Step 3: Exchange the authorization code for an access token
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const data = await tokenResponse.json();

            if (data.error) {
                throw new Error(`Error: ${data.error_description}`);
            }

            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;

            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            // Store the tokens securely (e.g., in AsyncStorage, Redux, or a secure storage library)
        } catch (error) {
            console.error('Error during token exchange:', error);
        }
    } else {
        console.error('No authorization code found in the URL.');
    }
};

export { loginWithSpotify, handleSpotifyRedirect };
