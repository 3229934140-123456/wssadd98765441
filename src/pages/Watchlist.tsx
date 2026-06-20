import { useNavigate } from 'react-router-dom'
import { Eye, Heart, TrendingUp, ArrowUpRight, ArrowDownRight, Repeat, Sparkles, Clock } from 'lucide-react'
import { useStore } from '@/store/useStore'
import CategoryTabs from '@/components/CategoryTabs'
import { categoryLabels, changeTypeLabels, riskLevelLabels } from '@/data/mockData'
import type { ChangeType } from '@/types'

const changeTypeConfig: Record<string, { icon: typeof ArrowUpRight; color: string }> = {
  rising: { icon: ArrowUpRight, color: 'text-[#10B981]' },
  falling: { icon: ArrowDownRight, color: 'text-[#FF6B6B]' },
  fluctuating: { icon: Repeat, color: 'text-[#F59E0B]' },
  new_entry: { icon: Sparkles, color: 'text-[#38BDF8]' },
}

const riskLevelStyle: Record<string, string> = {
  opportunity: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/20',
  warning: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/20',
  danger: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/20',
}

const changeTypeBarColor: Record<string, string> = {
  rising: 'bg-[#10B981]',
  falling: 'bg-[#FF6B6B]',
  fluctuating: 'bg-[#F59E0B]',
  new_entry: 'bg-[#38BDF8]',
}

function formatTime(ts: string) {
  const d = new Date(ts)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function formatHeat(v: number) {
  if (v >= 10000) return `${(v / 10000).toFixed(1)}万`
  return v.toString()
}

export default function Watchlist() {
  const navigate = useNavigate()
  const { getFavoritesList, toggleFavorite, favorites, activeCategory } = useStore()
  const items = getFavoritesList()
  const allFavorites = Array.from(favorites)

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl">
        <div className="px-4 pt-4 pb-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
            <Eye size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-[#F8FAFC] leading-tight">观察列表</h1>
            <p className="text-[10px] text-[#64748B] -mt-0.5">持续追踪的重点热搜</p>
          </div>
          <div className="ml-auto px-3 py-1 bg-[#1E293B] rounded-full">
            <span className="text-xs font-bold text-[#F59E0B]">{allFavorites.length} 个观察对象</span>
          </div>
        </div>
        <CategoryTabs />
      </header>

      <div className="px-4 pt-2 pb-2 flex items-center gap-2">
        <Heart size={14} className="text-[#FF6B6B] fill-[#FF6B6B]" />
        <span className="text-xs text-[#64748B]">
          {categoryLabels[activeCategory]} · 已收藏 {items.length} 条
        </span>
      </div>

      <div className="px-4 space-y-3">
        {items.length > 0 ? (
          items.map((item, i) => {
            const config = changeTypeConfig[item.changeType as ChangeType]
            const Icon = config.icon
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/detail/${item.id}`)}
                className="w-full text-left bg-[#1E293B] rounded-2xl p-4 transition-all duration-200 hover:bg-[#263548] active:scale-[0.98] animate-card-enter relative overflow-hidden group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${changeTypeBarColor[item.changeType]}`} />

                <div className="pl-2">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-[15px] font-bold text-[#F8FAFC] leading-snug flex-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Icon size={14} className={config.color} />
                      <span className={`text-xs font-medium ${config.color}`}>
                        {changeTypeLabels[item.changeType]}
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-3 line-clamp-2">
                    {item.reason}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskLevelStyle[item.riskLevel]}`}>
                        {riskLevelLabels[item.riskLevel]}
                      </span>
                      <span className="text-[11px] text-[#64748B] mono">
                        TOP{item.currentRank}
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        热度 {formatHeat(item.heatValue)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(item.id)
                        }}
                        className="p-1.5 rounded-lg bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 transition-colors"
                      >
                        <Heart size={14} className="text-[#FF6B6B] fill-[#FF6B6B]" />
                      </button>
                      <div className="flex items-center gap-1 text-[#64748B]">
                        <Clock size={11} />
                        <span className="text-[11px]">{formatTime(item.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-[#64748B]">
            <Heart size={40} className="mb-3 opacity-30" />
            <p className="text-sm mb-1">暂无观察对象</p>
            <p className="text-xs">在详情页点击收藏按钮添加观察对象</p>
            {allFavorites.length > 0 && (
              <p className="text-xs text-[#38BDF8] mt-2">
                其他视角有 {allFavorites.length - items.length} 个观察对象
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
