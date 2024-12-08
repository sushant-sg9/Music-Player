import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import SongList from './components/SongList';
import axios from 'axios';
import { Buffer } from 'buffer';

const App = () => {
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);


  const getSpotifyToken = async () => {
    try {
      const clientId = 'af8fc662f2fd490db1e4e4cf2f154f63';
      const clientSecret = '261127330fac4930a40bd4d9a257b788';

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
          },
        }
      );

      setToken(response.data.access_token);
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
    }
  };

  const fetchSongs = async (token) => {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/search',
        {
          params: {
            q: 'Arjit Singh',
            type: 'track',
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedSongs = response.data.tracks.items;
      setSongs(fetchedSongs);

      if (fetchedSongs.length > 0) {
        setCurrentSong(fetchedSongs[0]);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  useEffect(() => {
    getSpotifyToken();
  }, []);


  useEffect(() => {
    if (token) {
      fetchSongs(token);
    }
  }, [token]);

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length; 
    setCurrentSongIndex(nextIndex); 
    setCurrentSong(songs[nextIndex]);
  };

  const handlePreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-red-900 via-black to-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <SongList songs={songs} currentSong={currentSong} onSongClick={setCurrentSong} />
      </main>
      <Player
        currentSong={currentSong}
        onNextSong={handleNextSong}
        onPreviousSong={handlePreviousSong}
      />
    </div>
  );
};

export default App;
