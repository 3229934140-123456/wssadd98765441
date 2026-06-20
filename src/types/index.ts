export type Category = 'brand' | 'competitor' | 'spokesperson' | 'industry'
export type ChangeType = 'rising' | 'falling' | 'fluctuating' | 'new_entry'
export type RiskLevel = 'opportunity' | 'warning' | 'danger'
export type WarningLevel = 'low' | 'medium' | 'high'

export interface TrendItem {
  id: string
  title: string
  category: Category
  changeType: ChangeType
  heatValue: number
  currentRank: number
  peakRank: number
  timeOnList: string
  timestamp: string
  reason: string
  tags: string[]
  riskLevel: RiskLevel
}

export interface TrendDetail extends TrendItem {
  rankHistory: { time: string; rank: number }[]
  screenshot: string
  relatedWords: string[]
  detailedReason: string
  isFavorited: boolean
}

export interface Discussion {
  id: string
  trendId: string
  initiator: string
  participants: string[]
  screenshot: string
  rankChart: string
  initialJudgment: string
  createdAt: string
}

export interface WeeklyReport {
  weekStart: string
  weekEnd: string
  opportunityCount: number
  riskCount: number
  opportunityChange: number
  riskChange: number
  opportunities: {
    id: string
    title: string
    impactLevel: number
    suggestedAction: string
  }[]
  risks: {
    id: string
    title: string
    impactLevel: number
    warningLevel: WarningLevel
  }[]
  timeline: {
    time: string
    event: string
    type: 'opportunity' | 'risk'
  }[]
}

export interface Colleague {
  id: string
  name: string
  department: string
  avatar: string
}
