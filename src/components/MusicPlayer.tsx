'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaHeart } from 'react-icons/fa'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

interface Track {
  title: string
  artist: string
  src: string
  duration: string
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample tracks - replace with actual files
  const tracks: Track[] = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "/music/perfect.mp3", // Add your music file here
      duration: "4:23"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      src: "/music/all-of-me.mp3",
      duration: "4:29"
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      src: "/music/thinking-out-loud.mp3",
      duration: "4:41"
    }
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [currentTrack])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value) / 100
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      className="bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-pink-300/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-pink-300/50 max-w-md w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Audio Element */}
      <audio ref={audioRef} src={tracks[currentTrack]?.src} />

      {/* Album Art Placeholder */}
      <motion.div
        className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
      >
        <motion.div
          className="text-6xl"
          animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        >
          💖
        </motion.div>
      </motion.div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={currentTrack}
        >
          {tracks[currentTrack]?.title || "Select a song"}
        </motion.h3>
        <motion.p
          className="text-gray-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          key={`${currentTrack}-artist`}
        >
          {tracks[currentTrack]?.artist || "Unknown Artist"}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercentage}
            onChange={handleSeek}
            className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ff69b4 0%, #ff69b4 ${progressPercentage}%, #ffc0cb ${progressPercentage}%, #ffc0cb 100%)`
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mb-4">
        <motion.button
          onClick={prevTrack}
          className="text-2xl text-gray-700 hover:text-pink-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdSkipPrevious />
        </motion.button>

        <motion.button
          onClick={togglePlayPause}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ boxShadow: isPlaying ? "0 0 30px rgba(255, 105, 180, 0.5)" : "0 4px 20px rgba(0,0,0,0.1)" }}
        >
          {isPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6 ml-1" />}
        </motion.button>

        <motion.button
          onClick={nextTrack}
          className="text-2xl text-gray-700 hover:text-pink-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdSkipNext />
        </motion.button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center space-x-3">
        <motion.button
          onClick={() => setShowVolume(!showVolume)}
          className="text-gray-600 hover:text-pink-600 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          {volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}
        </motion.button>

        <motion.div
          className="flex-1 max-w-24"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: showVolume ? 1 : 0, width: showVolume ? 'auto' : 0 }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ff69b4 0%, #ff69b4 ${volume * 100}%, #ffc0cb ${volume * 100}%, #ffc0cb 100%)`
            }}
          />
        </motion.div>

        <motion.button
          className="text-red-500 hover:text-red-600 transition-colors"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaHeart />
        </motion.button>
      </div>

      {/* Love Message */}
      <motion.div
        className="text-center mt-4 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Made with 💖 for the most amazing person</p>
      </motion.div>
    </motion.div>
  )
}

export default MusicPlayer