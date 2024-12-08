import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react'
import Song1 from '../assets/Songs/Ae Dil Hai Mushkil Title Track - Ae Dil Hai Mushkil 320 Kbps.mp3'
import Song2 from '../assets/Songs/Sajni Laapataa Ladies 320 Kbps.mp3'
import Song3 from '../assets/Songs/Satranga Animal 320 Kbps.mp3'
import Song4 from '../assets/Songs/Thodi Jagah Marjaavaan 320 Kbps.mp3'
import Song5 from '../assets/Songs/Tujhe Kitna Chahne Lage Kabir Singh 320 Kbps.mp3'

const songData = {
    "79jYT83v4bMOWEgwjQxSx2": {
        name: "Ae Dil Hai Mushkil",
        preview_url: Song1,
    },
    "5zCnGtCl5Ac5zlFHXaZmhy": {
        name: "Sajni",
        preview_url: Song2,

    },
    "3yHyiUDJdz02FZ6jfUbsmY": {
        name: "Satranga",
        preview_url: Song3,
    },
    "3f0wz6zcA7XkQiGm0qNF5r": {
        name: "Thodi Jagah",
        preview_url: Song4,
    },
    "2Fv2injs4qAm8mJBGaxVKU": {
        name: "Thodi Jagah",
        preview_url: Song5,
    },
};
const Player = ({ currentSong, onNextSong, onPreviousSong }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const soundRef = useRef(null);
    const progressIntervalRef = useRef(null);

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
        }

        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        if (currentSong) {
            const songPreview = songData[currentSong.id]?.preview_url
            soundRef.current = new Howl({
                src: [songPreview],

                onplay: () => {
                    setDuration(soundRef.current.duration());
                    trackProgress();
                },
                onend: () => {
                    setIsPlaying(false);
                    setProgress(0);
                    setCurrentTime(0);
                    onNextSong();
                }
            });

            soundRef.current.play();
            setIsPlaying(true);
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.unload();
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [currentSong]);

    const trackProgress = () => {
        progressIntervalRef.current = setInterval(() => {
            if (soundRef.current && isPlaying) {
                const currentPosition = soundRef.current.seek() || 0;
                setCurrentTime(currentPosition);
                setProgress((currentPosition / duration) * 100);
            }
        }, 1000);
    };

    const playSong = () => {
        if (soundRef.current) {
            soundRef.current.play();
            setIsPlaying(true);
            trackProgress();
        }
    };

    const pauseSong = () => {
        if (soundRef.current) {
            soundRef.current.pause();
            setIsPlaying(false);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <div className="hidden md:flex md:justify-end md:items-end md:min-h-screen md:p-4">
                <div className='px-4 flex flex-col items-center justify-end'>
                    <div className="w-[300px] bg-[#461111] rounded-xl text-white shadow-lg">
                        <div className="p-4 space-y-4">
                            <p className="text-sm text-gray-400">Now Playing</p>

                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src={currentSong?.album?.images?.[0]?.url}
                                    alt="Album Cover"
                                    className="w-full aspect-video object-cover"
                                />
                            </div>

                            {currentSong && (
                                <div className="space-y-1">
                                    <h2 className="font-semibold">{currentSong.name}</h2>
                                    <p className="text-sm text-gray-400">{currentSong.artists[0]?.name}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="h-1 bg-gray-600 rounded-full">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Shuffle className="w-5 h-5" />
                                </button>
                                <button onClick={onPreviousSong} className="text-gray-400 hover:text-white transition-colors">
                                    <SkipBack className="w-5 h-5" />
                                </button>
                                {isPlaying ? (
                                    <button
                                        onClick={pauseSong}
                                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    >
                                        <Pause className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={playSong}
                                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    >
                                        <Play className="w-5 h-5" />
                                    </button>
                                )}
                                <button onClick={onNextSong} className="text-gray-400 hover:text-white transition-colors">
                                    <SkipForward className="w-5 h-5" />
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Repeat className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed md:hidden bottom-0 left-0 w-full bg-black text-white p-2 flex items-center justify-between z-50">
                <div className="flex items-center space-x-2">
                    <img
                        src={currentSong?.album?.images?.[0]?.url}
                        alt="Album Cover"
                        className="w-10 h-10 rounded-sm"
                    />
                    <div>
                        <h2 className="text-sm font-semibold">{currentSong?.name}</h2>
                        <p className="text-xs text-gray-400">{currentSong?.artists?.[0]?.name}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {isPlaying ? (
                        <button
                            onClick={pauseSong}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
                        >
                            <Pause className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={playSong}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
                        >
                            <Play className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        onClick={onNextSong}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <SkipForward className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Player