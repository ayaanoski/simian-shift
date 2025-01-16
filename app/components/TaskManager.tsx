'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Task = {
  id: string
  title: string
  completed: boolean
  category: 'short-term' | 'long-term'
  points: number
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [category, setCategory] = useState<'short-term' | 'long-term'>('short-term')
  const [points, setPoints] = useState(1)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    updateTotalPoints()
  }, [tasks])

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        category,
        points
      }
      setTasks([...tasks, newTaskObj])
      setNewTask('')
      setPoints(1)
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTotalPoints = () => {
    const totalPoints = tasks.reduce((sum, task) => task.completed ? sum + task.points : sum, 0)
    localStorage.setItem('totalPoints', totalPoints.toString())
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col mb-4 space-y-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New quest"
          className="flex-grow"
        />
        <div className="flex space-x-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'short-term' | 'long-term')}
            className="p-2 border rounded bg-input text-input-foreground"
          >
            <option value="short-term">Cloud Hopping</option>
            <option value="long-term">Mountain Climbing</option>
          </select>
          <Input
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
            min={1}
            max={100}
            className="w-20"
          />
          <Button onClick={addTask} className="bg-accent text-accent-foreground hover:bg-accent/80">
            <FaPlus />
          </Button>
        </div>
      </div>
      <ul className="overflow-y-auto flex-grow">
        {tasks.map(task => (
          <motion.li
            key={task.id}
            className="flex items-center mb-2 p-2 bg-secondary rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </span>
            <span className="mr-2 text-sm text-muted-foreground">
              {task.category === 'short-term' ? 'Cloud Hopping' : 'Mountain Climbing'}
            </span>
            <span className="mr-2 text-sm font-bold text-accent">
              {task.points} pts
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-destructive hover:text-destructive/80"
            >
              <FaTrash />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

