// services/spotifyService.js
import { CLIENT_ID, CLIENT_SECRET } from '@env';

class SpotifyService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    return this.accessToken;
  }

  async fetchArtistDetails(artistId) {
    const token = await this.getAccessToken();
    
    // Fetch basic artist info
    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const artistData = await artistResponse.json();

    // Fetch top tracks
    const topTracksResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const topTracksData = await topTracksResponse.json();

    // Format the response
    return {
      name: artistData.name,
      genres: artistData.genres,
      monthlyListeners: artistData.followers.total.toLocaleString(),
      images: artistData.images,
      topTracks: topTracksData.tracks.map(track => ({
        id: track.id,
        name: track.name,
        preview_url: track.preview_url
      }))
    };
  }

  async getUserArtistStats(artistId, userAccessToken) {
    // This requires user authentication with appropriate scopes
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
      { headers: { Authorization: `Bearer ${userAccessToken}` } }
    );
    const data = await response.json();
    
    // Find artist ranking
    const artistRank = data.items.findIndex(artist => artist.id === artistId);
    
    return {
      ranking: artistRank !== -1 ? `Top ${((artistRank + 1) / data.items.length * 100).toFixed(1)}% of listeners` : null,
      // Note: Detailed listening time requires additional API calls and permissions
      timeListened: "Not available" // Spotify API doesn't provide exact listening time
    };
  }
}

export default new SpotifyService();