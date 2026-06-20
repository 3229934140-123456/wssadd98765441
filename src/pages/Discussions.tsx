import { useNavigate } from 'react-router-dom'
import { MessageSquare, Users, Clock, Image, TrendingUp, FileText, ChevronRight, ArrowUpRight, ArrowDownRight, Repeat, Sparkles } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { changeTypeLabels, riskLevelLabels } from '@/data/mockData'
import type { ChangeType } from '@/types'

const changeTypeStyle: Record<string, string> = {
  rising: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  falling: 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/20',
  fluctuating: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  new_entry: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20',
}

const riskLevelStyle: Record<string, string> = {
  opportunity: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  warning: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  danger: 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/20',
}

const changeTypeIcon: Record<string, typeof ArrowUpRight> = {
  rising: ArrowUpRight,
  falling: ArrowDownRight,
  fluctuating: Repeat,
  new_entry: Sparkles,
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function Discussions() {
  const navigate = useNavigate()
  const { discussions } = useStore()

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155]/30">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-black text-[#F8FAFC]">讨论</h1>
          </div>
          <p className="text-[11px] text-[#64748B]">内部协作讨论记录 · 共 {discussions.length} 条</p>
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
          <div className="space-y-4">
            {discussions.map((disc, i) => {
              const ChangeIcon = changeTypeIcon[disc.trendChangeType as ChangeType]
              return (
                <button
                  key={disc.id}
                  onClick={() => navigate(`/discussion/${disc.id}`)}
                  className="w-full text-left bg-[#1E293B] rounded-2xl p-4 transition-all duration-200 hover:bg-[#263548] active:scale-[0.98] animate-card-enter group"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${changeTypeStyle[disc.trendChangeType]}`}>
                        <ChangeIcon size={10} />
                        {changeTypeLabels[disc.trendChangeType]}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskLevelStyle[disc.trendRiskLevel]}`}>
                        {riskLevelLabels[disc.trendRiskLevel]}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#334155] text-[#94A3B8]">
                        TOP {disc.trendRank}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[#64748B] group-hover:text-[#94A3B8] transition-colors" />
                  </div>

                  <h3 className="text-[15px] font-bold text-[#F8FAFC] leading-snug mb-3">
                    {disc.trendTitle}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-[#0F172A] rounded-xl p-2 text-center">
                      <Image size={12} className="mx-auto mb-1 text-[#38BDF8]" />
                      <p className="text-[9px] text-[#64748B]">截图</p>
                    </div>
                    <div className="bg-[#0F172A] rounded-xl p-2 text-center">
                      <TrendingUp size={12} className="mx-auto mb-1 text-[#10B981]" />
                      <p className="text-[9px] text-[#64748B]">走势</p>
                    </div>
                    <div className="bg-[#0F172A] rounded-xl p-2 text-center">
                      <FileText size={12} className="mx-auto mb-1 text-[#F59E0B]" />
                      <p className="text-[9px] text-[#64748B]">判断</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0F172A] rounded-xl mb-3">
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">
                      {disc.initialJudgment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#64748B]">
                        <Users size={12} />
                        <span className="text-[11px]">{disc.participants.length} 人参与</span>
                      </div>
                      <div className="flex -space-x-1">
                        {disc.participants.slice(0, 3).map((name, idx) => {
                          const initials = name.slice(0, 1)
                          const colors = ['bg-[#38BDF8]', 'bg-[#A78BFA]', 'bg-[#F59E0B]']
                          return (
                            <div
                              key={idx}
                              className={`w-5 h-5 rounded-full ${colors[idx % colors.length]} flex items-center justify-center text-[8px] font-bold text-[#0F172A] border-2 border-[#1E293B]`}
                            >
                              {initials}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#64748B]">
                      <Clock size={11} />
                      <span className="text-[11px]">{formatDateTime(disc.createdAt)}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
