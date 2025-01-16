import Leaderboard from '../../components/Leaderboard'

export default function LeaderboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-red-600">Leaderboard</h1>
      <div className="card">
        <Leaderboard />
      </div>
    </div>
  )
}

