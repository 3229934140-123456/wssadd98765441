import { Activity, SlidersHorizontal } from 'lucide-react'
import CategoryTabs from '@/components/CategoryTabs'
import TrendCard from '@/components/TrendCard'
import { useStore } from '@/store/useStore'

export default function Home() {
  const { getTrendList, activeCategory } = useStore()
  const trends = getTrendList()

  const categoryEmoji: Record<string, string> = {
    brand: '🛡️',
    competitor: '⚔️',
    spokesperson: '🎤',
    industry: '📊',
  }

  const categoryDesc: Record<string, string> = {
    brand: '与花西子品牌相关的热搜异动',
    competitor: '竞品品牌动态与策略变化',
    spokesperson: '代言人相关话题与风险监测',
    industry: '行业政策、趋势与公共议题',
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#818CF8] flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#F8FAFC] leading-tight tracking-tight">热搜哨兵</h1>
              <p className="text-[10px] text-[#64748B] -mt-0.5">微博热搜异动监测</p>
            </div>
          </div>
          <button className="p-2 rounded-xl bg-[#1E293B] border border-[#334155]/50 hover:bg-[#263548] transition-colors">
            <SlidersHorizontal size={16} className="text-[#64748B]" />
          </button>
        </div>

        <CategoryTabs />
      </header>

      <div className="px-4 pt-2 pb-2 flex items-center gap-2">
        <span className="text-base">{categoryEmoji[activeCategory]}</span>
        <span className="text-xs text-[#64748B]">{categoryDesc[activeCategory]}</span>
        <span className="ml-auto text-xs text-[#64748B] mono">{trends.length} 条异动</span>
      </div>

      <div className="px-4 space-y-3">
        {trends.map((item, i) => (
          <TrendCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {trends.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[#64748B]">
          <Activity size={40} className="mb-3 opacity-30" />
          <p className="text-sm">当前视角暂无异动</p>
        </div>
      )}
    </div>
  )
}
