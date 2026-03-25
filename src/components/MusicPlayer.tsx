import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Cyberpunk Dreams",
    artist: "AI Synthwave",
    cover: "https://picsum.photos/seed/cyber/200/200",
    color: "#ff00ff"
  },
  {
    id: 2,
    title: "Neon Horizon",
    artist: "Digital Pulse",
    cover: "https://picsum.photos/seed/neon/200/200",
    color: "#00ffff"
  },
  {
    id: 3,
    title: "Midnight Drive",
    artist: "Retro Wave",
    cover: "https://picsum.photos/seed/drive/200/200",
    color: "#bc13fe"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-80 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-pink/30 shadow-[0_0_20px_rgba(255,0,255,0.1)]">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6 group">
          <motion.div 
            key={currentTrack.id}
            initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            className="w-full h-full rounded-xl overflow-hidden neon-border-pink relative z-10"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -inset-2 bg-neon-pink/20 blur-xl rounded-full group-hover:bg-neon-pink/40 transition-all duration-500" />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold neon-text-pink mb-1">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400 uppercase tracking-widest">{currentTrack.artist}</p>
        </div>

        <div className="w-full mb-6">
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neon-pink shadow-[0_0_10px_#ff00ff]"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
            <span>0:45</span>
            <span>3:20</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            className="p-2 text-gray-400 hover:text-neon-pink transition-colors"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 flex items-center justify-center bg-neon-pink text-black rounded-full shadow-[0_0_15px_#ff00ff] hover:scale-110 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-neon-pink transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-gray-500">
          <Volume2 size={16} />
          <div className="w-20 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
