'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Heart, Gift, Sparkles, Star } from 'lucide-react'
import BirthdayModal from '@/components/BirthdayModal'
import AmbientBackground from '@/components/AmbientBackground'

const useTypingEffect = (words: string[], speed = 110, delayBetweenWords = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]!

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      } else if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, speed, delayBetweenWords])

  return currentText
}

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const typingWords = ["Happy Birthday Gaia", "You're 18 Now!", "My Beautiful Girl", "I Love You ❤️"]
  const typedText = useTypingEffect(typingWords, 100, 2500)

  // Pre-generate stable heart positions and properties using useMemo
  const heartConfigs = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 30 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  }, []) // Empty dependency array ensures this only runs once

  // Pre-generate stable sparkle configurations
  const sparkleConfigs = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 15 + 10,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  }, []) // Empty dependency array ensures this only runs once

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePlayVideo = () => {
    setShowVideo(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #f3e8ff 75%, #fdf2f8 100%)'
    }}>
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {heartConfigs.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400 opacity-20"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.fontSize}px`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(heart.id) * 30, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: heart.delay,
            }}
          >
            💖
          </motion.div>
        ))}

        {sparkleConfigs.map((sparkle) => (
          <motion.div
            key={`sparkle-${sparkle.id}`}
            className="absolute text-purple-400 opacity-40"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              fontSize: `${sparkle.fontSize}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: sparkle.delay,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>


      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Birthday Badge */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="text-pink-500 w-8 h-8" />
            <h2 className="text-2xl font-bold text-pink-600">Special Birthday Girl</h2>
            <Star className="text-pink-500 w-8 h-8" />
          </motion.div>

        {/* Main Title with Typing Effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">
              {typedText}
            </span>
            <motion.span
              className="inline-block w-1 h-16 bg-pink-500 ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </h1>

          <motion.div
            className="h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 rounded-full mx-auto"
            style={{ width: `${Math.min(typedText.length * 20, 400)}px` }}
            animate={{
              backgroundPosition: ['0%', '100%'],
              scale: [1, 1.02, 1]
            }}
            transition={{
              backgroundPosition: { duration: 2, repeat: Infinity },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          />
        </motion.div>

        {/* Birthday Message */}
        <motion.p
          className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          🎉 Today you are officialy 18! And I can't wait till we get to celebrate this day together.
          You bring so much joy, laughter, and love into my life every single day, Gajusiu. Love you incredibly, please watch the birthday video. I hope you will love it as much as I do! 💖
        </motion.p>

        {/* Video Section */}
        <motion.div
          className="mb-12 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {!showVideo ? (
            <div className="relative group">
              <motion.button
                onClick={handlePlayVideo}
                className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden group-hover:shadow-pink-500/50 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Play className="w-8 h-8 fill-current" />
                  <span>Watch Your Special Video</span>
                </span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          ) : (
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                  src="https://drive.google.com/file/d/1oPci0Wskr3-yUEaKUmgIprU3o2L_XGRy/preview"
                  width="100%"
                  height="480"
                  allow="autoplay"
                  className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}
        </motion.div>

          {/* Action Buttons */}
          <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -12px rgba(236, 72, 153, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Gift className="w-6 h-6" />
              <span>Open Birthday Surprise</span>
            </span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Birthday Modal */}
      <BirthdayModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Sparkle Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`floating-sparkle-${i}`}
            className="absolute text-yellow-400 text-4xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  )
}