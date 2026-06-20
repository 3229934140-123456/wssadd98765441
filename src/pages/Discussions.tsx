import { useStore } from '@/store/useStore'
import { trendListData } from '@/data/mockData'
import { MessageSquare, Users, Clock } from 'lucide-react'

export default function Discussions() {
  const { discussions } = useStore()

  const getTrendTitle = (trendId: string) => {
    const trend = trendListData.find((t) => t.id === trendId)
    return trend?.title || '未知话题'
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155]/30">
        <div className="px-4 py-3">
          <h1 className="text-lg font-black text-[#F8FAFC]">讨论</h1>
          <p className="text-[11px] text-[#64748B]">内部协作讨论记录</p>
        </div>
      </header>

      <div className="px-4 pt-4">
        {discussions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#64748B]">
            <MessageSquare size={40} className="mb-3 opacity-30" />
            <p className="text-sm mb-1">暂无讨论记录</p>
            <p className="text-xs">在详情页中可发起内部讨论</p>
          </div>
        ) : (
          <div className="space-y-3">
            {discussions.map((disc, i) => (
              <div
                key={`${disc.trendId}-${i}`}
                className="bg-[#1E293B] rounded-2xl p-4 animate-card-enter"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h3 className="text-[13px] font-bold text-[#F8FAFC] mb-2">
                  {getTrendTitle(disc.trendId)}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <Users size={12} />
                    <span className="text-[11px]">{disc.participants.length} 人参与</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <Clock size={12} />
                    <span className="text-[11px]">刚刚</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
