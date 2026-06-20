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
  initialJudgment: string
}

export interface DiscussionDetail {
  id: string
  trendId: string
  initiator: string
  participants: string[]
  screenshot: string
  rankChartImage: string
  initialJudgment: string
  trendTitle: string
  trendRank: number
  trendChangeType: ChangeType
  trendRiskLevel: RiskLevel
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
    sourceTrendIds: string[]
    trendTitle: string
    trendCategory: Category
    rankChange: string
  }[]
  risks: {
    id: string
    title: string
    impactLevel: number
    warningLevel: WarningLevel
    sourceTrendIds: string[]
    trendTitle: string
    trendCategory: Category
    rankChange: string
  }[]
  timeline: {
    time: string
    event: string
    type: 'opportunity' | 'risk'
    trendId?: string
  }[]
}

export interface Colleague {
  id: string
  name: string
  department: string
  avatar: string
}
