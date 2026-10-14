const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const lastfm_api_key = process.env.LASTFM_API_KEY;
const lastfm_username = process.env.LASTFM_USERNAME;

const basic = client_id && client_secret 
  ? Buffer.from(`${client_id}:${client_secret}`).toString('base64') 
  : '';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const isSpotifyConfigured = Boolean(client_id && client_secret && refresh_token);
export const isLastFmConfigured = Boolean(lastfm_api_key && lastfm_username);

export const getLastFmNowPlaying = async () => {
  if (!isLastFmConfigured) return null;

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      lastfm_username!
    )}&api_key=${lastfm_api_key}&format=json&limit=1`;

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Last.fm fetch failed:', response.status);
      return null;
    }

    const data = await response.json();
    const tracks = data?.recenttracks?.track;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!track) return null;

    const isPlaying = track['@attr']?.nowplaying === 'true';
    const title = track.name;
    const artist = track.artist?.['#text'] || track.artist?.name || '';
    const album = track.album?.['#text'] || '';

    // Find the best quality image
    const images = track.image || [];
    const imageObj =
      images.find((img: { size: string }) => img.size === 'extralarge') ||
      images.find((img: { size: string }) => img.size === 'large') ||
      images[images.length - 1];
    const albumImageUrl = imageObj?.['#text'] || '';

    // Spotify search URL or Last.fm track link
    const songUrl = track.url || `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`;

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      isRecentlyPlayed: !isPlaying,
      configured: true,
    };
  } catch (error) {
    console.error('Error fetching Last.fm track:', error);
    return null;
  }
};

export const getAccessToken = async () => {
  if (!isSpotifyConfigured) {
    return null;
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Spotify token fetch failed:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return data.access_token as string;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
    return null;
  }
};

export const getNowPlaying = async () => {
  const access_token = await getAccessToken();
  if (!access_token) return null;

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    return response;
  } catch (error) {
    console.error('Error fetching currently playing track:', error);
    return null;
  }
};

export const getRecentlyPlayed = async () => {
  const access_token = await getAccessToken();
  if (!access_token) return null;

  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    return response;
  } catch (error) {
    console.error('Error fetching recently played track:', error);
    return null;
  }
};
