'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Save, Camera } from 'lucide-react'
import Link from 'next/link'
import character from '../../public/character/image.png'

type Profile = {
  nickname: string
  avatar: string
  character: string
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile>({
    nickname: 'Monkey King',
    avatar: '/sun-wukong.svg',
    character: '/character/wukong.png'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempNickname, setTempNickname] = useState('')
  const [tempAvatar, setTempAvatar] = useState<File | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
    const storedPoints = localStorage.getItem('totalPoints')
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints))
    }
  }, [])

  const handleEdit = () => {
    setTempNickname(profile.nickname)
    setIsEditing(true)
  }

  const handleSave = () => {
    const newProfile = { ...profile, nickname: tempNickname }
    if (tempAvatar) {
      const reader = new FileReader()
      reader.onloadend = () => {
        newProfile.avatar = reader.result as string
        updateProfile(newProfile)
      }
      reader.readAsDataURL(tempAvatar)
    } else {
      updateProfile(newProfile)
    }
  }

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile)
    localStorage.setItem('profile', JSON.stringify(newProfile))
    setIsEditing(false)
    setTempAvatar(null)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTempAvatar(e.target.files[0])
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-t-lg" />
        <CardTitle className="relative text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Warrior Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-orange-500/30 relative">
              <Image
                src={tempAvatar ? URL.createObjectURL(tempAvatar) : profile.avatar}
                alt="Avatar"
                width={128}
                height={128}
                className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              {isEditing && (
                <label htmlFor="avatar" className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 animate-pulse" />
          </div>

          {isEditing ? (
            <div className="w-full space-y-4">
              <div>
                <Label htmlFor="nickname" className="text-white/80">Warrior Name</Label>
                <Input
                  id="nickname"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  className="bg-white/10 border-orange-500/30 text-white"
                  placeholder="Enter your warrior name"
                />
              </div>
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{profile.nickname}</h3>
                <p className="text-orange-300">Total Points: {totalPoints}</p>
              </div>
              
              {/* Character Display Section - Using standard img tag */}
              <div className="my-6 flex justify-center">
                <div className="w-48 h-64 relative">
                  <img
                    src={character.src}
                    alt="Character"
                    className="w-64 h-full object-contain transition-transform duration-300 hover:scale-105"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              </div>

              {/* Buttons Section */}
              <div className="space-y-2">
                <Button
                  onClick={handleEdit}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-orange-500/30"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                
                <Link href="/" className="block w-full">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                  >
                    Customize Character
                  </Button>
                </Link>
                <Link href="https://pixel8r2.vercel.app/marketplace" className="block w-full">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                  >
                    NFT MARKETPLACE (PIXEL8R)
                  </Button>
                </Link>

              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}