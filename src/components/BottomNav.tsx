import { TrendingUp, FileText, CalendarDays } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/', label: '异动', icon: TrendingUp },
  { path: '/weekly', label: '周报', icon: CalendarDays },
  { path: '/discussions', label: '讨论', icon: FileText },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = location.pathname === '/' || location.pathname.startsWith('/detail')
    ? '/'
    : location.pathname

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur-xl border-t border-[#334155]/50 safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#38BDF8]'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
