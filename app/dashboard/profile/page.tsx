import ProfileCard from '../../components/ProfileCard'

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-accent">Your Celestial Profile</h1>
      <div className="max-w-md mx-auto">
        <ProfileCard />
      </div>
    </div>
  )
}

