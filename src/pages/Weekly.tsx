import {
  TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Star, Zap, Shield, ChevronRight,
} from 'lucide-react'
import { weeklyReportData } from '@/data/mockData'

export default function Weekly() {
  const report = weeklyReportData

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20">
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155]/30">
        <div className="px-4 py-3">
          <h1 className="text-lg font-black text-[#F8FAFC]">周报</h1>
          <p className="text-[11px] text-[#64748B]">
            {report.weekStart} ~ {report.weekEnd}
          </p>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <SummaryCard
            icon={TrendingUp}
            iconColor="text-[#10B981]"
            iconBg="bg-[#10B981]/10"
            label="本周机会"
            value={report.opportunityCount}
            change={report.opportunityChange}
            positive
          />
          <SummaryCard
            icon={AlertTriangle}
            iconColor="text-[#FF6B6B]"
            iconBg="bg-[#FF6B6B]/10"
            label="本周风险"
            value={report.riskCount}
            change={report.riskChange}
            positive={false}
          />
        </div>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-[#10B981]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">机会排序</h2>
          </div>
          <div className="space-y-2">
            {report.opportunities.map((item, i) => (
              <div
                key={item.id}
                className="bg-[#1E293B] rounded-xl p-3.5 border-l-2 border-[#10B981] animate-card-enter"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-[13px] font-bold text-[#F8FAFC] mb-1">{item.title}</h3>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">{item.suggestedAction}</p>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0 mt-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={10}
                        className={si < item.impactLevel ? 'text-[#10B981] fill-[#10B981]' : 'text-[#334155]'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-[#FF6B6B]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">风险排序</h2>
          </div>
          <div className="space-y-2">
            {report.risks.map((item, i) => {
              const levelStyle: Record<string, string> = {
                high: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/20',
                medium: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/20',
                low: 'bg-[#64748B]/15 text-[#94A3B8] border-[#64748B]/20',
              }
              const levelText: Record<string, string> = {
                high: '高危',
                medium: '中危',
                low: '低危',
              }
              return (
                <div
                  key={item.id}
                  className="bg-[#1E293B] rounded-xl p-3.5 border-l-2 border-[#FF6B6B] animate-card-enter"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-[13px] font-bold text-[#F8FAFC] mb-1">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${levelStyle[item.warningLevel]}`}>
                        {levelText[item.warningLevel]}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star
                            key={si}
                            size={10}
                            className={si < item.impactLevel ? 'text-[#FF6B6B] fill-[#FF6B6B]' : 'text-[#334155]'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <ChevronRight size={16} className="text-[#A78BFA]" />
            <h2 className="text-sm font-bold text-[#F8FAFC]">关键事件时间线</h2>
          </div>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#334155]" />

            {report.timeline.map((item, i) => {
              const isOpportunity = item.type === 'opportunity'
              return (
                <div
                  key={i}
                  className="relative pb-5 last:pb-0 animate-card-enter"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    isOpportunity
                      ? 'bg-[#10B981] border-[#0F172A]'
                      : 'bg-[#FF6B6B] border-[#0F172A]'
                  }`} />

                  <div className="bg-[#1E293B] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] mono text-[#64748B]">{item.time}</span>
                      {isOpportunity ? (
                        <ArrowUpRight size={12} className="text-[#10B981]" />
                      ) : (
                        <ArrowDownRight size={12} className="text-[#FF6B6B]" />
                      )}
                    </div>
                    <p className="text-[12px] text-[#94A3B8] leading-relaxed">{item.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
  change,
  positive,
}: {
  icon: typeof TrendingUp
  iconColor: string
  iconBg: string
  label: string
  value: number
  change: number
  positive: boolean
}) {
  return (
    <div className="bg-[#1E293B] rounded-2xl p-4">
      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center mb-2`}>
        <Icon size={16} className={iconColor} />
      </div>
      <div className="text-2xl font-black mono text-[#F8FAFC]">{value}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-[#64748B]">{label}</span>
        {change !== 0 && (
          <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
            positive
              ? change > 0 ? 'text-[#10B981]' : 'text-[#FF6B6B]'
              : change > 0 ? 'text-[#FF6B6B]' : 'text-[#10B981]'
          }`}>
            {change > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(change)}
          </span>
        )}
      </div>
    </div>
  )
}
