import { useState } from 'react'
import { X, Check, Users } from 'lucide-react'
import { colleagues } from '@/data/mockData'

interface DiscussionPanelProps {
  open: boolean
  onClose: () => void
  onSend: (participants: string[]) => void
  trendTitle: string
}

export default function DiscussionPanel({ open, onClose, onSend, trendTitle }: DiscussionPanelProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  if (!open) return null

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const handleSend = () => {
    if (selected.size === 0) return
    onSend(Array.from(selected))
    setSelected(new Set())
    onClose()
  }

  const deptColors: Record<string, string> = {
    '市场部': 'bg-[#38BDF8]/20 text-[#38BDF8]',
    '公关部': 'bg-[#A78BFA]/20 text-[#A78BFA]',
    '法务部': 'bg-[#F59E0B]/20 text-[#F59E0B]',
  }

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-[#1E293B] rounded-t-3xl animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1E293B] px-5 pt-4 pb-3 border-b border-[#334155]/50 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#F8FAFC]">发起内部讨论</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#263548] transition-colors">
              <X size={20} className="text-[#64748B]" />
            </button>
          </div>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-1">话题：{trendTitle}</p>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-[#38BDF8]" />
            <span className="text-sm font-medium text-[#94A3B8]">选择参与同事</span>
          </div>

          <div className="space-y-2">
            {colleagues.map((c) => {
              const isSelected = selected.has(c.id)
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/30'
                      : 'bg-[#0F172A] border border-transparent hover:bg-[#263548]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-[#38BDF8] text-[#0F172A]' : 'bg-[#334155] text-[#94A3B8]'
                  }`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-[#F8FAFC]">{c.name}</div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium mt-0.5 ${deptColors[c.department] || 'bg-[#334155] text-[#94A3B8]'}`}>
                      {c.department}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#38BDF8] flex items-center justify-center">
                      <Check size={12} className="text-[#0F172A]" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-[#0F172A] rounded-xl">
            <p className="text-xs text-[#64748B] mb-2">将自动附带：</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-[#334155] rounded text-[10px] text-[#94A3B8]">话题截图</span>
              <span className="px-2 py-1 bg-[#334155] rounded text-[10px] text-[#94A3B8]">排名曲线</span>
              <span className="px-2 py-1 bg-[#334155] rounded text-[10px] text-[#94A3B8]">初步判断</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[#1E293B] px-5 py-4 border-t border-[#334155]/50">
          <button
            onClick={handleSend}
            disabled={selected.size === 0}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
              selected.size > 0
                ? 'bg-[#38BDF8] text-[#0F172A] active:scale-[0.98]'
                : 'bg-[#334155] text-[#64748B] cursor-not-allowed'
            }`}
          >
            发送讨论通知{selected.size > 0 ? `（${selected.size}人）` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
