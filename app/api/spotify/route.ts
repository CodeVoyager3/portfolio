import { NextResponse } from 'next/server';
import {
  getNowPlaying,
  getRecentlyPlayed,
  getLastFmNowPlaying,
  isSpotifyConfigured,
  isLastFmConfigured,
} from '@/lib/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface SpotifyTrackResponse {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
  isRecentlyPlayed?: boolean;
  configured: boolean;
}

export async function GET() {

  // 1. If Last.fm is configured, try it first (no Spotify Premium required)
  if (isLastFmConfigured) {
    try {
      const lastFmData = await getLastFmNowPlaying();
      if (lastFmData) {
        return NextResponse.json<SpotifyTrackResponse>(
          {
            isPlaying: lastFmData.isPlaying,
            title: lastFmData.title,
            artist: lastFmData.artist,
            album: lastFmData.album,
            albumImageUrl: lastFmData.albumImageUrl,
            songUrl: lastFmData.songUrl,
            isRecentlyPlayed: lastFmData.isRecentlyPlayed,
            configured: true,
          },
          {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
          }
        );
      }
    } catch (err) {
      console.error('Error in Last.fm route handler:', err);
    }
  }

  // 2. If Spotify is configured, try Spotify API
  if (isSpotifyConfigured) {
    try {
      const response = await getNowPlaying();

      if (response && response.status === 200) {
        const song = await response.json();

        if (song && song.is_playing && song.item) {
          const title = song.item.name;
          const artist = song.item.artists
            .map((_artist: { name: string }) => _artist.name)
            .join(', ');
          const album = song.item.album.name;
          const albumImageUrl = song.item.album.images[0]?.url;
          const songUrl = song.item.external_urls.spotify;
          const progressMs = song.progress_ms;
          const durationMs = song.item.duration_ms;

          return NextResponse.json<SpotifyTrackResponse>(
            {
              isPlaying: true,
              title,
              artist,
              album,
              albumImageUrl,
              songUrl,
              progressMs,
              durationMs,
              configured: true,
            },
            {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            }
          );
        }
      }

      // If nothing currently playing, check recently played
      const recentResponse = await getRecentlyPlayed();
      if (recentResponse && recentResponse.status === 200) {
        const recentData = await recentResponse.json();
        const firstRecent = recentData?.items?.[0]?.track;

        if (firstRecent) {
          return NextResponse.json<SpotifyTrackResponse>(
            {
              isPlaying: false,
              isRecentlyPlayed: true,
              title: firstRecent.name,
              artist: firstRecent.artists
                .map((_artist: { name: string }) => _artist.name)
                .join(', '),
              album: firstRecent.album?.name,
              albumImageUrl: firstRecent.album?.images?.[0]?.url,
              songUrl: firstRecent.external_urls?.spotify,
              durationMs: firstRecent.duration_ms,
              configured: true,
            },
            {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            }
          );
        }
      }

      return NextResponse.json<SpotifyTrackResponse>(
        {
          isPlaying: false,
          configured: true,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        }
      );
    } catch (error) {
      console.error('Spotify API route error:', error);
    }
  }

  // If neither is configured
  return NextResponse.json<SpotifyTrackResponse>(
    {
      isPlaying: false,
      configured: false,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}
