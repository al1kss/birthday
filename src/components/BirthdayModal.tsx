'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Gift, Star } from 'lucide-react'
import { AiOutlineClose } from 'react-icons/ai'

interface BirthdayModalProps {
  isOpen: boolean
  onClose: () => void
}

const BirthdayModal = ({ isOpen, onClose }: BirthdayModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Confetti pieces
  const confettiPieces = Array.from({ length: 60 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-3 h-3 rounded-full"
      style={{
        backgroundColor: ['#ec4899', '#d946ef', '#a855f7', '#f472b6', '#c084fc'][i % 5],
        left: `${Math.random() * 100}%`,
      }}
      initial={{ y: -100, opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        rotate: 720,
        x: Math.sin(i) * 100
      }}
      transition={{
        duration: 4,
        delay: Math.random() * 2,
        ease: "easeOut"
      }}
    />
  ))

  // Balloons
  const balloons = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-5xl"
      style={{
        left: `${10 + (i * 7)}%`,
        color: ['#ec4899', '#d946ef', '#a855f7', '#f472b6'][i % 4]
      }}
      initial={{ y: 200, opacity: 0 }}
      animate={{
        y: -100,
        opacity: 1,
        x: Math.sin(i * 0.5) * 50,
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 3,
        delay: i * 0.1,
        ease: "easeOut"
      }}
    >
      🎈
    </motion.div>
  ))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {confettiPieces}
            </div>
          )}

          {/* Balloons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {balloons}
          </div>

          {/* Modal */}
          <motion.div
            className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 rounded-3xl p-10 max-w-lg mx-4 shadow-2xl border-4 border-pink-300"
            initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 10 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 300,
              duration: 0.6
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-pink-600 hover:text-pink-800 transition-colors z-10 p-2 rounded-full hover:bg-pink-100"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center space-y-8">
              {/* Main Birthday Message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎉
                </motion.div>

                <h1 className="text-4xl font-bold text-pink-700 mb-3">
                  Happy 18th Birthday!
                </h1>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Gaia Wolski! 💖
                </h2>
              </motion.div>

              {/* Animated Icons */}
              <motion.div
                className="flex justify-center space-x-8 text-4xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="text-pink-500"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎂
                </motion.div>
                <motion.div
                  className="text-red-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 20, -20, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >
                  <Heart className="w-10 h-10" />
                </motion.div>
                <motion.div
                  className="text-purple-500"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <Gift className="w-10 h-10" />
                </motion.div>
                <motion.div
                  className="text-yellow-500"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
                >
                  <Star className="w-10 h-10" />
                </motion.div>
              </motion.div>

              {/* Birthday Messages */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p className="text-xl text-pink-700 font-semibold">
                  🌟 Happy Birthday, beautiful! 🌟
                </p>
                <p className="text-pink-600 text-lg">
                  You're officially 18 and now consdered a pedofile!!! ✨
                </p>
                <p className="text-gray-600">
                  I hope you will have the best day today. Go queen, lol! 💕
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.button
                onClick={onClose}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Let's Celebrate! 🎊
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-3 -left-3 text-3xl animate-bounce">💖</div>
            <div className="absolute -top-3 -right-3 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌸</div>
            <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎀</div>
            <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>✨</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BirthdayModal