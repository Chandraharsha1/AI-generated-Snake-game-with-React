/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-neon-purple/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl w-full"
      >
        {/* Left Section: Info/Music */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <MusicPlayer />
          
          <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-purple/30 text-center">
            <h4 className="text-xs font-bold text-neon-purple uppercase tracking-widest mb-1">System Status</h4>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_5px_#39ff14]" />
              <span className="text-[10px] text-gray-400 font-mono">NEURAL LINK ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Center Section: Game */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 bg-neon-blue/5 blur-2xl rounded-[32px]" />
            <SnakeGame />
          </div>
        </div>

        {/* Right Section: Stats/Leaderboard (Placeholder) */}
        <div className="hidden xl:flex flex-col gap-6 order-3">
          <div className="w-64 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-green/30">
            <h3 className="text-sm font-bold text-neon-green uppercase tracking-widest mb-4">Top Scores</h3>
            <div className="space-y-3 font-mono text-xs">
              {[
                { name: 'CYBER_PUNK', score: '2450' },
                { name: 'NEON_RIDER', score: '1820' },
                { name: 'VOID_WALKER', score: '1540' },
              ].map((entry, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">{entry.name}</span>
                  <span className="text-neon-green">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-64 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-blue/30">
            <h3 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-2">Controls</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white/5 rounded text-[10px] text-center">↑ UP</div>
              <div className="p-2 bg-white/5 rounded text-[10px] text-center">↓ DOWN</div>
              <div className="p-2 bg-white/5 rounded text-[10px] text-center">← LEFT</div>
              <div className="p-2 bg-white/5 rounded text-[10px] text-center">→ RIGHT</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-[10px] text-gray-600 font-mono tracking-[0.5em] uppercase z-10">
        Neon Protocol v2.5.0 // Established 2026
      </div>
    </div>
  );
}
