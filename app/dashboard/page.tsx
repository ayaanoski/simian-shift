'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Cloud, Crown, Sparkles, BarChart3 } from 'lucide-react'
import Leaderboard from '../components/Leaderboard'
import Analytics from '../components/Analytics'
import RuyiJinguBangAssistant from '../components/RuyiJinguBangAssistant'

const TaskManager = dynamic(() => import('../components/TaskManager'), {
  ssr: false
})

export default function Dashboard() {
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const storedPoints = localStorage.getItem('totalPoints')
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="absolute -top-4 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300" />
        <h1 className="text-5xl font-bold text-orange-800 flex items-center gap-3">
          Welcome, Monkey King! <Crown className="w-8 h-8 text-yellow-500" />
        </h1>
        <div className="mt-4 text-3xl font-bold text-orange-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Total Points: {totalPoints.toLocaleString()}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Quests Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2 mb-6">
              <Cloud className="w-6 h-6 text-orange-600" />
              Your Celestial Quests
            </h2>
            <div className="max-h-[400px] overflow-hidden">
              <TaskManager />
            </div>
          </div>

          {/* Assistant Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2 mb-6">
              Ruyi Jingu Bang AI Assistant
            </h2>
            <div className="max-h-[250px] overflow-y-auto assistant-scrollbar">
              <style jsx global>{`
                .assistant-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                
                .assistant-scrollbar::-webkit-scrollbar-track {
                  background: rgba(255, 237, 213, 0.5);
                  border-radius: 4px;
                }
                
                .assistant-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(to bottom, #f97316, #fdba74);
                  border-radius: 4px;
                  border: 2px solid rgba(255, 237, 213, 0.5);
                }
                
                .assistant-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(to bottom, #ea580c, #fb923c);
                }
                
                .assistant-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #f97316 rgba(255, 237, 213, 0.5);
                }
              `}</style>
              <RuyiJinguBangAssistant />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Leaderboard Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-orange-600" />
              Immortal Rankings
            </h2>
            <div className="max-h-[250px] overflow-hidden">
              <Leaderboard />
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              Golden Vision Analytics
            </h2>
            <div className="max-h-[250px] overflow-hidden">
              <Analytics />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}