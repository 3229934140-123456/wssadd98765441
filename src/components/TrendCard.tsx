import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight, Repeat, Sparkles, Clock } from 'lucide-react'
import type { TrendItem } from '@/types'
import { changeTypeLabels, riskLevelLabels } from '@/data/mockData'

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

export default function TrendCard({ item, index }: { item: TrendItem; index: number }) {
  const navigate = useNavigate()
  const config = changeTypeConfig[item.changeType]
  const Icon = config.icon

  return (
    <button
      onClick={() => navigate(`/detail/${item.id}`)}
      className="w-full text-left bg-[#1E293B] rounded-2xl p-4 transition-all duration-200 hover:bg-[#263548] active:scale-[0.98] animate-card-enter relative overflow-hidden group"
      style={{ animationDelay: `${index * 80}ms` }}
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
          <div className="flex items-center gap-1 text-[#64748B]">
            <Clock size={11} />
            <span className="text-[11px]">{formatTime(item.timestamp)}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#38BDF8]/10 transition-colors duration-300 pointer-events-none" />
    </button>
  )
}
