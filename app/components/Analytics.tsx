'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Target } from 'lucide-react'

export default function Analytics() {
  const [completedTasks, setCompletedTasks] = useState(0)
  const [streak, setStreak] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks)
      const completed = tasks.filter((task: any) => task.completed).length
      setCompletedTasks(completed)
      setProgress(Math.round((completed / tasks.length) * 100) || 0)
    }

    setStreak(Math.floor(Math.random() * 10))
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 transform group-hover:scale-105 transition-transform duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Completed Quests</h3>
            </div>
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {completedTasks}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 transform group-hover:scale-105 transition-transform duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Power Streak</h3>
            </div>
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {streak} days
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white/10 backdrop-blur-sm p-6 rounded-xl relative overflow-hidden group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-600/10 transform group-hover:scale-105 transition-transform duration-300" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Journey Progress</h3>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-white/20">
              <motion.div
                className="shadow-lg flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-orange-500 to-red-600"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-white/80">
                Journey Started
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {progress}% Complete
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}