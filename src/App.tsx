import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Weekly from '@/pages/Weekly'
import Discussions from '@/pages/Discussions'
import Watchlist from '@/pages/Watchlist'
import DiscussionDetail from '@/pages/DiscussionDetail'
import BottomNav from '@/components/BottomNav'

export default function App() {
  return (
    <Router>
      <div className="max-w-lg mx-auto min-h-screen bg-[#0F172A] relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussion/:id" element={<DiscussionDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}
