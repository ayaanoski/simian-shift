'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Medal } from 'lucide-react'

type LeaderboardEntry = {
  id: string
  name: string
  score: number
  avatar: string
}

const mythologicalCharacters = [
  { name: 'Zhu Bajie', avatar: '/zhu-bajie.svg' },
  { name: 'Sha Wujing', avatar: '/sha-wujing.svg' },
  { name: 'Tang Sanzang', avatar: '/tang-sanzang.svg' },
  { name: 'Guanyin', avatar: '/guanyin.svg' },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />
    default:
      return <Trophy className="w-6 h-6 text-zinc-600" />
  }
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('profile') || '{}')
    const userPoints = parseInt(localStorage.getItem('totalPoints') || '0')

    const userEntry: LeaderboardEntry = {
      id: 'user',
      name: userProfile.nickname || 'Monkey King',
      score: userPoints,
      avatar: userProfile.avatar || '/sun-wukong.svg'
    }

    const otherEntries: LeaderboardEntry[] = mythologicalCharacters.map((character, index) => ({
      id: (index + 1).toString(),
      name: character.name,
      score: Math.floor(Math.random() * 1000),
      avatar: character.avatar,
    }))

    const fullLeaderboard = [userEntry, ...otherEntries]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    setLeaderboard(fullLeaderboard)
  }, [])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Legendary Warriors
      </h2>
      <ul className="space-y-4">
        {leaderboard.map((entry, index) => (
          <motion.li
            key={entry.id}
            className="relative flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500/20 to-transparent rounded-l-lg" style={{ width: '4px' }} />
            
            <div className="flex-shrink-0">
              {getRankIcon(index + 1)}
            </div>

            <div className="flex items-center flex-1 gap-4">
              <div className="relative">
                <img 
                  src={entry.avatar || "/placeholder.svg"} 
                  alt={entry.name} 
                  className="w-12 h-12 rounded-full border-2 border-orange-500/30"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 animate-pulse" />
              </div>

              <div className="flex-1">
                <span className="font-semibold text-white">{entry.name}</span>
                <motion.div 
                  className="text-sm text-orange-300"
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ delay: index * 0.2 }}
                >
                  Level {Math.floor(entry.score / 100)}
                </motion.div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {entry.score.toLocaleString()}
                </span>
                <span className="text-sm text-orange-300">pts</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}