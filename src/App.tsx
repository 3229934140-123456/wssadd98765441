import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Weekly from '@/pages/Weekly'
import Discussions from '@/pages/Discussions'
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
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}
