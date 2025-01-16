'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaTasks, FaChartBar, FaTrophy, FaUser, FaCloud, FaMountain } from 'react-icons/fa'

const navItems = [
  { 
    href: '/dashboard', 
    icon: FaTasks, 
    label: 'Celestial Quests',
    description: 'Your divine missions'
  },
  { 
    href: '/dashboard/leaderboard', 
    icon: FaTrophy, 
    label: 'Immortal Rankings',
    description: 'Compare your powers'
  },
  { 
    href: '/dashboard/analytics', 
    icon: FaChartBar, 
    label: 'Sacred Analytics',
    description: 'Track your journey'
  },
  { 
    href: '/dashboard/profile', 
    icon: FaUser, 
    label: 'Sage Profile',
    description: 'Your monkey essence'
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gradient-to-b from-amber-800/10 to-orange-700/10 w-72 min-h-screen relative overflow-hidden backdrop-blur-sm border-r border-orange-200/30">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-400/20 to-yellow-200/20 rounded-full blur-3xl" />
      
      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Logo Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center justify-center mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-orange-400/30 to-yellow-300/30 rounded-full blur-md"
            />
            <img 
              src="/monkey-king.svg" 
              alt="Monkey King" 
              className="w-20 h-20 relative z-10 drop-shadow-xl"
            />
          </div>
          <h1 className="text-2xl font-bold mt-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Simian Shift
          </h1>
        </motion.div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <div
                  className={`group relative p-3 rounded-lg transition-all duration-300 
                    ${pathname === item.href 
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-900' 
                      : 'hover:bg-orange-500/10 text-orange-800'}`}
                >
                  <div className="flex items-center">
                    <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 
                      ${pathname === item.href ? 'text-orange-600' : 'text-orange-500'}`} 
                    />
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-orange-600/80 mt-0.5">{item.description}</div>
                    </div>
                  </div>
                  
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full"
                    />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Decorative Bottom Elements */}
        <div className="absolute top-10 left-6 right-6">
          <div className="flex items-center justify-between text-orange-600/40">
            <FaCloud className="w-6 h-6" />
            <FaMountain className="w-8 h-8" />
            <FaCloud className="w-6 h-6" />
          </div>
        </div>
      </div>
    </aside>
  )
}