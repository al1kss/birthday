'use client'

import { useState, useEffect, useRef } from 'react'
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
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            💖
          </motion.div>
        ))}

        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-purple-400 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="flex items-center justify-center space-x-4 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="text-pink-500 w-8 h-8" />
            <h2 className="text-2xl font-bold text-pink-600">Special Birthday Girl</h2>
            <Star className="text-pink-500 w-8 h-8" />
          </motion.div>
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
          🎉 Today you turn 18, and I couldn't be more excited to celebrate the incredible person you are!
          You bring so much joy, laughter, and love into my life every single day.
          Here's to new adventures, dreams coming true, and endless happiness! 💕
        </motion.p>

        {/* Video Section */}
        <motion.div
          className="mb-12 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {!showVideo ? (
            <motion.div
              className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-12 backdrop-blur-sm border-2 border-pink-300 shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg pulse-pink"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(236, 72, 153, 0.4)',
                    '0 0 60px rgba(236, 72, 153, 0.8)',
                    '0 0 30px rgba(236, 72, 153, 0.4)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <Play className="w-16 h-16 text-white ml-2" />
              </motion.div>

              <h3 className="text-3xl font-bold text-pink-700 mb-4">
                🎁 Your Special Birthday Video!
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                I made something extra special just for you, my love 💖
              </p>

              <motion.button
                onClick={handlePlayVideo}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity }
                }}
              >
                <span className="flex items-center gap-3">
                  💕 Play My Message 💕
                  <Heart className="w-6 h-6 heartbeat" />
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-300"
            >
              <video
                ref={videoRef}
                className="w-full h-auto"
                controls
                poster="/video-thumbnail.jpg"
              >
                <source src="/birthday-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              🎉 Celebrate Again!
              <Gift className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-pink-600 text-lg">
            <Sparkles className="w-5 h-5 sparkle" />
            <span className="font-medium">Made with endless love for Gaia Wolski</span>
            <Sparkles className="w-5 h-5 sparkle" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>

      {/* Birthday Modal */}
      <BirthdayModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}