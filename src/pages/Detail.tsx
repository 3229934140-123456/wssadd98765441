import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Heart, MessageSquare, Clock, TrendingUp,
  Flame, Trophy, Timer, Tag, Image,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { changeTypeLabels, riskLevelLabels } from '@/data/mockData'
import RankChart from '@/components/RankChart'
import DiscussionPanel from '@/components/DiscussionPanel'
import type { ChangeType, RiskLevel, TrendDetail } from '@/types'

const changeTypeColor: Record<ChangeType, string> = {
  rising: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  falling: 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/20',
  fluctuating: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  new_entry: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20',
}

const riskLevelColor: Record<RiskLevel, string> = {
  opportunity: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  warning: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  danger: 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/20',
}

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getTrendDetail, toggleFavorite, favorites, addDiscussion } = useStore()
  const [showDiscussion, setShowDiscussion] = useState(false)

  const detail = id ? getTrendDetail(id) : null

  if (!detail) {
    const fallback = id ? { id, title: '#示例话题#', category: 'brand' as const, changeType: 'rising' as ChangeType, heatValue: 50000, currentRank: 5, peakRank: 2, timeOnList: '3小时', timestamp: '2026-06-20T10:00:00', reason: '示例异动原因', tags: ['示例'], riskLevel: 'opportunity' as RiskLevel, rankHistory: [{ time: '08:00', rank: 20 }, { time: '09:00', rank: 12 }, { time: '10:00', rank: 5 }], screenshot: '', relatedWords: ['示例词'], detailedReason: '这是一条示例详情数据，用于展示详情页布局。', isFavorited: false } : null
    if (!fallback) return null

    return (
      <div className="min-h-screen bg-[#0F172A] pb-24">
        <DetailHeader title={fallback.title} onBack={() => navigate('/')} />
        <DetailContent
          detail={fallback}
          isFavorited={favorites.has(fallback.id)}
          onToggleFavorite={() => toggleFavorite(fallback.id)}
          onOpenDiscussion={() => setShowDiscussion(true)}
        />
        <DiscussionPanel
          open={showDiscussion}
          onClose={() => setShowDiscussion(false)}
          onSend={(p) => addDiscussion(fallback.id, p)}
          trendTitle={fallback.title}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pb-24">
      <DetailHeader title={detail.title} onBack={() => navigate('/')} />
      <DetailContent
        detail={detail}
        isFavorited={favorites.has(detail.id)}
        onToggleFavorite={() => toggleFavorite(detail.id)}
        onOpenDiscussion={() => setShowDiscussion(true)}
      />
      <DiscussionPanel
        open={showDiscussion}
        onClose={() => setShowDiscussion(false)}
        onSend={(p) => addDiscussion(detail.id, p)}
        trendTitle={detail.title}
      />
    </div>
  )
}

function DetailHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155]/30">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-[#1E293B] border border-[#334155]/50 hover:bg-[#263548] transition-colors"
        >
          <ArrowLeft size={18} className="text-[#94A3B8]" />
        </button>
        <h1 className="text-sm font-bold text-[#F8FAFC] truncate flex-1">{title}</h1>
      </div>
    </header>
  )
}

function DetailContent({
  detail,
  isFavorited,
  onToggleFavorite,
  onOpenDiscussion,
}: {
  detail: TrendDetail
  isFavorited: boolean
  onToggleFavorite: () => void
  onOpenDiscussion: () => void
}) {
  return (
    <div className="px-4 pt-4 space-y-4 animate-fade-in">
      <div className="bg-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${changeTypeColor[detail.changeType]}`}>
            {changeTypeLabels[detail.changeType]}
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${riskLevelColor[detail.riskLevel]}`}>
            {riskLevelLabels[detail.riskLevel]}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <InfoCell icon={TrendingUp} label="当前排名" value={`#${detail.currentRank}`} accent />
          <InfoCell icon={Trophy} label="最高排名" value={`#${detail.peakRank}`} />
          <InfoCell icon={Timer} label="在榜时长" value={detail.timeOnList} />
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={14} className="text-[#FF6B6B]" />
          <h2 className="text-sm font-bold text-[#F8FAFC]">排名走势</h2>
        </div>
        <RankChart data={detail.rankHistory} />
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Image size={14} className="text-[#38BDF8]" />
          <h2 className="text-sm font-bold text-[#F8FAFC]">热搜截图</h2>
        </div>
        <div className="rounded-xl overflow-hidden bg-[#0F172A] aspect-video flex items-center justify-center border border-[#334155]/30">
          {detail.screenshot ? (
            <img
              src={detail.screenshot}
              alt="热搜截图"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-center text-[#64748B]">
              <Image size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">热搜快照</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-[#F59E0B]" />
          <h2 className="text-sm font-bold text-[#F8FAFC]">异动原因解读</h2>
        </div>
        <p className="text-[13px] text-[#94A3B8] leading-relaxed">{detail.detailedReason}</p>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={14} className="text-[#A78BFA]" />
          <h2 className="text-sm font-bold text-[#F8FAFC]">关联词</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {detail.relatedWords.map((word) => (
            <span key={word} className="px-3 py-1 bg-[#0F172A] border border-[#334155]/50 rounded-full text-xs text-[#94A3B8]">
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 z-30 bg-gradient-to-t from-[#0F172A] via-[#0F172A] to-transparent pt-8">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={onToggleFavorite}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
              isFavorited
                ? 'bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30'
                : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155]/50 hover:text-[#F8FAFC]'
            }`}
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
            {isFavorited ? '已收藏' : '收藏'}
          </button>
          <button
            onClick={onOpenDiscussion}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold bg-[#38BDF8] text-[#0F172A] transition-all duration-200 active:scale-[0.98]"
          >
            <MessageSquare size={16} />
            发起讨论
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoCell({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof TrendingUp
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="text-center">
      <Icon size={14} className={`mx-auto mb-1 ${accent ? 'text-[#38BDF8]' : 'text-[#64748B]'}`} />
      <div className={`text-lg font-black mono ${accent ? 'text-[#38BDF8]' : 'text-[#F8FAFC]'}`}>
        {value}
      </div>
      <div className="text-[10px] text-[#64748B]">{label}</div>
    </div>
  )
}
