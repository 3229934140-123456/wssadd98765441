import { create } from 'zustand'
import type { Category, TrendItem, TrendDetail, DiscussionDetail } from '@/types'
import { trendListData, trendDetailData, getTrendDetailById, colleagues } from '@/data/mockData'

interface AppState {
  activeCategory: Category
  favorites: Set<string>
  discussions: DiscussionDetail[]
  setActiveCategory: (category: Category) => void
  toggleFavorite: (id: string) => void
  addDiscussion: (trendId: string, participants: string[]) => void
  getTrendList: () => TrendItem[]
  getTrendDetail: (id: string) => TrendDetail | null
  getFavoritesList: () => TrendItem[]
  getDiscussionById: (id: string) => DiscussionDetail | undefined
  getTrendDetailWithFavorites: () => TrendItem[]
}

export const useStore = create<AppState>((set, get) => ({
  activeCategory: 'brand',
  favorites: new Set(['6']),
  discussions: [],
  setActiveCategory: (category) => set({ activeCategory: category }),
  toggleFavorite: (id) =>
    set((state) => {
      const next = new Set(state.favorites)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return { favorites: next }
    }),
  addDiscussion: (trendId, participantIds) => {
    const detail = getTrendDetailById(trendId)
    if (!detail) return
    const participantNames = participantIds
      .map((pid) => colleagues.find((c) => c.id === pid))
      .filter(Boolean)
      .map((c) => c?.name || '')
    const newDiscussion: DiscussionDetail = {
      id: `d${Date.now()}`,
      trendId,
      initiator: '我',
      participants: participantNames,
      screenshot: detail.screenshot,
      rankChartImage: '',
      initialJudgment: detail.initialJudgment,
      trendTitle: detail.title,
      trendRank: detail.currentRank,
      trendChangeType: detail.changeType,
      trendRiskLevel: detail.riskLevel,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      discussions: [newDiscussion, ...state.discussions],
    }))
  },
  getTrendList: () => {
    const { activeCategory } = get()
    return trendListData.filter((item) => item.category === activeCategory)
  },
  getTrendDetail: (id) => {
    return trendDetailData[id] || null
  },
  getFavoritesList: () => {
    const { favorites, activeCategory } = get()
    return trendListData.filter(
      (item) => favorites.has(item.id) && item.category === activeCategory
    )
  },
  getDiscussionById: (id) => {
    return get().discussions.find((d) => d.id === id)
  },
  getTrendDetailWithFavorites: () => {
    const { favorites } = get()
    return trendListData.filter((item) => favorites.has(item.id))
  },
}))
