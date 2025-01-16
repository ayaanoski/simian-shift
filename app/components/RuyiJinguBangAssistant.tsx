'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scroll, MessageCircle, RefreshCcw } from 'lucide-react'

export default function RuyiJinguBangAssistant() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')

  const modernTopics = [
    { id: 'work', label: 'Work-Life Balance', 
      prompt: 'Provide wisdom about maintaining work-life balance, as Sun Wukong would approach the modern challenge of balancing responsibilities with personal time.' },
    { id: 'social', label: 'Digital Connections', 
      prompt: 'Share insights about authentic relationships in a digital age, drawing parallels to Sun Wukong\'s journey of true friendship and loyalty.' },
    { id: 'stress', label: 'Managing Stress', 
      prompt: 'Offer advice about handling modern stress and anxiety, relating to how Sun Wukong maintained his spirit through 500 years under a mountain.' },
    { id: 'growth', label: 'Personal Growth', 
      prompt: 'Give guidance on self-improvement and learning, inspired by Sun Wukong\'s journey from a stone monkey to the Great Sage.' }
  ]

  const getAIAssistance = async (topic) => {
    setIsLoading(true)
    setSelectedTopic(topic.id)
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: topic.prompt }),
      })
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      console.error('Error fetching AI assistance:', error)
      setMessage('The Ruyi Jingu Bang hums with ancient power but seems to be resting. Please try again!')
    }
    setIsLoading(false)
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Scroll className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-orange-800">Choose Your Challenge:</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {modernTopics.map((topic) => (
            <motion.button
              key={topic.id}
              onClick={() => getAIAssistance(topic)}
              disabled={isLoading}
              className={`p-3 rounded-lg text-sm font-medium transition-all
                ${selectedTopic === topic.id 
                  ? 'bg-orange-600 text-white shadow-inner' 
                  : 'bg-white/80 text-orange-800 hover:bg-orange-100 shadow-sm'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {topic.label}
            </motion.button>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCcw className="w-8 h-8 text-orange-600" />
            </motion.div>
          </div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white/90 p-5 rounded-lg shadow-md border border-orange-200"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <p className="text-orange-900 leading-relaxed">{message}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}