'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="relative z-50">
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600" />
      
      {/* Glass effect background */}
      <div className="backdrop-blur-md bg-white/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/dashboard" 
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Simian Shift
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  )
}