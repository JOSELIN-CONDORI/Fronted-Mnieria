// RadioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { FaBroadcastTower } from 'react-icons/fa';

const RadioPlayer = () => {
    const audioRef = useRef(null);
    const radioStreams = [
        { id: 1, name: "La Zona", url: "https://mdstrm.com/audio/5fada54116646e098d97e6a5/live.m3u8" },
        { id: 2, name: "Radio Oxigeno", url: "https://mdstrm.com/audio/5fab0687bcd6c2389ee9480c/live.m3u8" } // Replace with actual URL
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeStream, setActiveStream] = useState(radioStreams[0]);

    const togglePlayerVisibility = () => {
        setIsOpen(!isOpen);
    };

    const switchStream = (stream) => {
        if (activeStream.id !== stream.id) {
            setActiveStream(stream);
            setIsPlaying(false); // Reset play state
        }
    };

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(activeStream.url);
            hls.attachMedia(audioRef.current);
        } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            audioRef.current.src = activeStream.url;
        }
    }, [activeStream]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch(error => {
                        console.error("Playback failed:", error);
                    });
            }
        }
    };

};

export default RadioPlayer;
