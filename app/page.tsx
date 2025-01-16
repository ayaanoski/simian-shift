'use client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Mountain, Sun, Stars, Wind } from 'lucide-react'
import { useMemo } from 'react'

const BackgroundElements = () => {
  const clouds = Array.from({ length: 5 }, (_, i) => i)
  const stars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
      })),
    []
  )

  return (
    <div className="absolute inset-0">
      {clouds.map((i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: ['-100%', '200%'],
            y: [i * 10, i * -10],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
          style={{ top: `${15 + i * 20}%` }}
        >
          <Cloud className="w-12 h-12 text-white/30" />
        </motion.div>
      ))}

      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: star.left,
            top: star.top,
          }}
        >
          <Stars className="w-4 h-4 text-yellow-200" />
        </motion.div>
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
      <AnimatePresence>
        <BackgroundElements />

        {/* Sun */}
        <motion.div
          className="absolute top-20 right-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <Sun className="w-24 h-24 text-yellow-200" />
            <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full" />
          </div>
        </motion.div>

        {/* Mountains */}
        <div className="absolute bottom-0 w-full">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-between w-full"
          >
            {/* Multiple mountains to create a range effect */}
            <Mountain className="w-1/3 h-48 text-orange-900/20" />
            <Mountain className="w-1/3 h-48 text-orange-900/20 -ml-20" />
            <Mountain className="w-1/3 h-48 text-orange-900/20 -ml-20" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.img
              src="/monkey-king.svg"
              alt="Monkey King"
              className="w-32 h-32 mb-8"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200"
          >
            Welcome to Simian Shift
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl mb-12 text-white/90 max-w-2xl"
          >
            Channel the spirit of Sun Wukong, master your tasks, and transform
            your journey into legendary achievements.
          </motion.p>

          <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-20"
        >
          <Link
            href="/dashboard"
            className="group relative inline-block px-12 py-6 rounded-2xl overflow-hidden min-w-[280px]"
          >
            {/* Glowing backdrop effect */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl" />
            
            {/* Button gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-90 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Subtle shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />
            
            {/* Button content */}
            <span className="relative flex items-center justify-center gap-4 text-2xl font-bold text-white">
              Enter Your Realm
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl"
              >
                →
              </motion.span>
            </span>
            
            {/* Bottom border glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
          </Link>
          
          {/* Button shadow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300/20 to-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </motion.div>

          {/* Wind */}
          <motion.div
            className="absolute bottom-10 left-10"
            animate={{
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Wind className="w-16 h-16 text-white/20" />
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Home