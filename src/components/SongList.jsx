import React, { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Banner from "../assets/arjit.jpg";
import { CheckCircle2, Search, Music } from "lucide-react";

const DraggableRow = ({ 
  song, 
  index, 
  moveSong, 
  playing, 
  handleClick, 
  formatDuration 
}) => {
  const ref = useRef(null);
  
  const [, drop] = useDrop({
    accept: 'SONG_ROW',
    hover: (draggedItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveSong(dragIndex, hoverIndex);

      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'SONG_ROW',
    item: () => {
      return { id: song.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      onClick={() => handleClick(song)}
      className={`group hover:bg-white/10 cursor-pointer transition-colors ${
        playing && playing.id === song.id ? "bg-[#461111]" : ""
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <td className="py-2">
        {playing && playing.id === song.id ? (
          <div className="w-4 h-4 flex items-center justify-center">
                <Music />
          </div>
        ) : (
          <span className="text-gray-400 group-hover:hidden">
            {index + 1}
          </span>
        )}
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-4">
          <img
            src={
              song.album?.images?.[0]?.url ||
              "/placeholder.svg?height=40&width=40"
            }
            alt={song.name}
            className="w-10 h-10 rounded"
          />
          <span className="font-medium">{song.name}</span>
        </div>
      </td>
      <td className="py-2 text-gray-400">
        {formatDuration(song.duration_ms)}
      </td>
      <td className="py-2 text-gray-400">
        {song.album?.name || "Unknown Album"}
      </td>
    </tr>
  );
};

const SongList = ({ 
  songs: initialSongs, 
  currentSong, 
  onSongClick,
  onSongsReordered 
}) => {
  const [songs, setSongs] = useState(initialSongs);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    if (currentSong) {
      setPlaying(currentSong);
    }
  }, [currentSong]);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleClick = (song) => {
    setPlaying(song);
    onSongClick(song);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDuration = (durationMs) => {
    return new Date(durationMs)
      .toISOString()
      .substr(14, 5);
  };

  const moveSong = (dragIndex, hoverIndex) => {
    const draggedSong = songs[dragIndex];
    const updatedSongs = [...songs];
    
    updatedSongs.splice(dragIndex, 1);
    updatedSongs.splice(hoverIndex, 0, draggedSong);

    setSongs(updatedSongs);
    
    if (onSongsReordered) {
      onSongsReordered(updatedSongs);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 ">
      <div className="flex items-center space-x-8">
        <a href="#" className="text-white hover:text-gray-300 text-sm">
          Music
        </a>
        <a href="#" className="text-white hover:text-gray-300 text-sm">
          Podcast
        </a>
        <a href="#" className="text-white hover:text-gray-300 text-sm">
          Live
        </a>
        <a href="#" className="text-white hover:text-gray-300 text-sm">
          Radio
        </a>
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          className="bg-[#4D1C1C] bg-opacity-50 text-white placeholder-gray-400 text-sm rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button className="absolute right-2 p-1 text-white hover:bg-white/10 rounded-full transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </nav>

        <div className="px-6 pt-4 pb-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#3c0d0d] to-[#1a0808]">
            <div
              className="absolute inset-0 "
              style={{
                backgroundImage: `url(${Banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 h-full flex flex-col justify-end px-10 py-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified Artist
              </div>
              <h1 className="text-6xl font-bold mb-4">Arjit Singh</h1>
              <p className="text-white/60">
                {formatNumber(27852501)} monthly listeners
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Popular</h2>
            <button className="text-sm text-gray-400 hover:text-white">
              See All
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="font-normal text-left pb-3 w-12">#</th>
                  <th className="font-normal text-left pb-3">TITLE</th>
                  <th className="font-normal text-left pb-3">TIME</th>
                  <th className="font-normal text-left pb-3">ALBUM</th>
                </tr>
              </thead>
              <tbody>
                {songs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-3 text-center text-gray-400"
                    >
                      Loading songs...
                    </td>
                  </tr>
                ) : (
                  songs.map((song, index) => (
                    <DraggableRow
                      key={song.id}
                      index={index}
                      song={song}
                      moveSong={moveSong}
                      playing={playing}
                      handleClick={handleClick}
                      formatDuration={formatDuration}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default SongList