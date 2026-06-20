import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Image, TrendingUp, FileText, ArrowUpRight, ArrowDownRight, Repeat, Sparkles, ChevronRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { changeTypeLabels, riskLevelLabels, colleagues } from '@/data/mockData'
import RankChart from '@/components/RankChart'
import { getTrendDetailById } from '@/data/mockData'
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
  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function DiscussionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getDiscussionById } = useStore()
  const discussion = id ? getDiscussionById(id) : null

  if (!discussion) {
    return (
      <div className="min-h-screen bg-[#0F172A] pb-20 flex items-center justify-center">
        <p className="text-[#64748B]">讨论不存在</p>
      </div>
    )
  }

  const trendDetail = getTrendDetailById(discussion.trendId)
  const ChangeIcon = changeTypeIcon[discussion.trendChangeType as ChangeType]
  const deptColors: Record<string, string> = {
    '市场部': 'bg-[#38BDF8]/20 text-[#38BDF8]',
    '公关部': 'bg-[#A78BFA]/20 text-[#A78BFA]',
    '法务部': 'bg-[#F59E0B]/20 text-[#F59E0B]',
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pb-10">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155]/30">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-xl bg-[#1E293B] border border-[#334155]/50 hover:bg-[#263548] transition-colors"
          >
            <ArrowLeft size={18} className="text-[#94A3B8]" />
          </button>
          <h1 className="text-sm font-bold text-[#F8FAFC] truncate flex-1">讨论详情</h1>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4 animate-fade-in">
        <div className="bg-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
              <Users size={14} className="text-[#38BDF8]" />
            </div>
            <div>
              <div className="text-xs text-[#64748B]">发起时间</div>
              <div className="text-sm font-medium text-[#F8FAFC]">
                {formatDateTime(discussion.createdAt)}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${changeTypeStyle[discussion.trendChangeType]}`}>
              <ChangeIcon size={10} />
              {changeTypeLabels[discussion.trendChangeType]}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskLevelStyle[discussion.trendRiskLevel]}`}>
              {riskLevelLabels[discussion.trendRiskLevel]}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#334155] text-[#94A3B8]">
              TOP {discussion.trendRank}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/detail/${discussion.trendId}`)}
          className="w-full bg-[#1E293B] rounded-2xl p-4 text-left hover:bg-[#263548] transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-[#A78BFA]" />
              </div>
              <span className="text-xs font-medium text-[#94A3B8]">关联话题</span>
            </div>
            <ChevronRight size={16} className="text-[#64748B]" />
          </div>
          <h3 className="text-[15px] font-bold text-[#F8FAFC] leading-snug">
            {discussion.trendTitle}
          </h3>
        </button>

        <div className="bg-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-[#38BDF8]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">参与同事</h2>
            <span className="text-xs text-[#64748B] ml-auto">{discussion.participants.length} 人</span>
          </div>
          <div className="space-y-2">
            {colleagues
              .filter((c) => discussion.participants.includes(c.name))
              .map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#0F172A]">
                  <div className="w-9 h-9 rounded-full bg-[#38BDF8] flex items-center justify-center text-xs font-bold text-[#0F172A]">
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#F8FAFC]">{c.name}</div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium mt-0.5 ${deptColors[c.department] || 'bg-[#334155] text-[#94A3B8]'}`}>
                      {c.department}
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B]">发起人</div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Image size={14} className="text-[#38BDF8]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">话题截图</h2>
          </div>
          <div className="rounded-xl overflow-hidden bg-[#0F172A] aspect-video flex items-center justify-center border border-[#334155]/30">
            {discussion.screenshot ? (
              <img
                src={discussion.screenshot}
                alt="热搜截图"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="text-center text-[#64748B]">
                <Image size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">暂无截图</p>
              </div>
            )}
          </div>
        </div>

        {trendDetail && (
          <div className="bg-[#1E293B] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-[#10B981]" />
              <h2 className="text-sm font-bold text-[#F8FAFC]">排名走势</h2>
            </div>
            <RankChart data={trendDetail.rankHistory} />
          </div>
        )}

        <div className="bg-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-[#F59E0B]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">初步判断</h2>
          </div>
          <div className="p-3 bg-[#0F172A] rounded-xl border border-[#F59E0B]/10">
            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              {discussion.initialJudgment}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
