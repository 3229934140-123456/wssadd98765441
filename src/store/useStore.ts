import { create } from 'zustand'
import type { Category, TrendItem, TrendDetail } from '@/types'
import { trendListData, trendDetailData } from '@/data/mockData'

interface AppState {
  activeCategory: Category
  favorites: Set<string>
  discussions: { trendId: string; participants: string[] }[]
  setActiveCategory: (category: Category) => void
  toggleFavorite: (id: string) => void
  addDiscussion: (trendId: string, participants: string[]) => void
  getTrendList: () => TrendItem[]
  getTrendDetail: (id: string) => TrendDetail | null
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
  addDiscussion: (trendId, participants) =>
    set((state) => ({
      discussions: [...state.discussions, { trendId, participants }],
    })),
  getTrendList: () => {
    const { activeCategory } = get()
    return trendListData.filter((item) => item.category === activeCategory)
  },
  getTrendDetail: (id) => {
    return trendDetailData[id] || null
  },
}))
