import { useStore } from '@/store/useStore'
import { categoryLabels } from '@/data/mockData'
import type { Category } from '@/types'

const categories: Category[] = ['brand', 'competitor', 'spokesperson', 'industry']

const categoryColors: Record<Category, { active: string; bg: string }> = {
  brand: { active: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30', bg: 'bg-[#38BDF8]/5' },
  competitor: { active: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30', bg: 'bg-[#F59E0B]/5' },
  spokesperson: { active: 'text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/30', bg: 'bg-[#A78BFA]/5' },
  industry: { active: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30', bg: 'bg-[#10B981]/5' },
}

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory } = useStore()

  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const isActive = activeCategory === cat
        const colors = categoryColors[cat]
        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              isActive
                ? `${colors.active} border`
                : `text-[#64748B] bg-[#1E293B] border-transparent hover:text-[#94A3B8] hover:bg-[#263548]`
            }`}
          >
            {categoryLabels[cat]}
          </button>
        )
      })}
    </div>
  )
}
