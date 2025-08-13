import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Icons – keep it tidy (single import)
import {
  FiSearch as SearchIcon,
  FiFileText as DocumentTextIcon,
  FiBookOpen as BookOpenIcon,
  FiShield as ShieldCheckIcon,
  FiClock as ClockIcon,
  FiUsers as UserGroupIcon,
  FiGlobe as GlobeAltIcon,
  FiBriefcase as BriefcaseIcon,
  FiRotateCw as BeakerIcon,
  FiSettings as CogIcon,
  FiAlertTriangle as ShieldExclamationIcon,
  FiHome as BuildingOfficeIcon,
  FiDollarSign as CurrencyDollarIcon,
  FiCode as CodeBracketIcon,
  FiFilter,
  FiChevronDown,
  FiCalendar,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiPause,
  FiMail,
  FiGrid,
  FiList,
  FiBookmark,
  FiEye,
} from 'react-icons/fi';

import { Sparkles, Star } from 'lucide-react';

// Data + Auth
import { policies, policyCategories } from '../../data/policies';
import { useAuth } from '../../contexts/AuthContext';

// ------------------------------
// Helpers
// ------------------------------
const categoryIcons = {
  key: {
    icon: ShieldExclamationIcon,
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop&crop=center',
  },
  hr: {
    icon: UserGroupIcon,
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center',
  },
  code: {
    icon: CodeBracketIcon,
    gradient: 'from-purple-500 via-violet-500 to-indigo-600',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center',
  },
  global: {
    icon: GlobeAltIcon,
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    image:
      'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=400&h=300&fit=crop&crop=center',
  },
  india: {
    icon: BuildingOfficeIcon,
    gradient: 'from-orange-500 via-yellow-500 to-red-600',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&crop=center',
  },
  it: {
    icon: CogIcon,
    gradient: 'from-gray-500 via-slate-500 to-zinc-600',
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    image:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop&crop=center',
  },
  finance: {
    icon: CurrencyDollarIcon,
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
  },
  safety: {
    icon: ShieldCheckIcon,
    gradient: 'from-teal-500 via-cyan-500 to-blue-600',
    bg: 'bg-teal-500/10',
    text: 'text-teal-400',
    image:
      'https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400&h=300&fit=crop&crop=center',
  },
  operations: {
    icon: BeakerIcon,
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center',
  },
  default: {
    icon: DocumentTextIcon,
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center',
  },
};

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center font-jakarta">
    <div className="text-center">
      <div className="animate-pulse mb-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-glow">
          <DocumentTextIcon className="w-9 h-9 text-white" aria-hidden />
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent text-glow mb-2">
        Loading Policies
      </h2>
      <p className="text-gray-300 text-sm md:text-base mb-5">
        Preparing your compliance dashboard...
      </p>
      <div className="w-64 h-2 bg-black rounded-full overflow-hidden mx-auto mb-4 border border-gray-800">
        <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] animate-pulse" />
      </div>
    </div>
  </div>
);

// Responsive items per page (tiles)
const useTilesPerPage = () => {
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Mobile: 8 (2x4), Tablet: 12 (3x4), Desktop: 16 (4x4)
  if (width < 640) return 8;
  if (width < 1024) return 12;
  return 16;
};

export default function PolicyLanding() {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('tiles'); // 'tiles' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'bookmarked'
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState(() => new Set());

  // Carousels
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const tilesPerPage = useTilesPerPage();
  const itemsPerPage = viewMode === 'tiles' ? tilesPerPage : 10;

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Categories with counts (memoized)
  const categories = useMemo(() => {
    const base = [{ id: 'all', name: 'All Policies' }, ...policyCategories];
    return base.map((cat) => ({
      ...cat,
      count:
        cat.id === 'all'
          ? policies.length
          : policies.filter((p) => p?.category === cat.id).length,
    }));
  }, []);

  const userRole = user?.role || 'employee';
  const getPolicyLink = useCallback(
    (policyId) => `/${userRole}/public/policies/${policyId}`,
    [userRole]
  );

  const getAllCombinedPolicies = useCallback(() => {
    const ok = new Set([
      'global',
      'hr',
      'code',
      'india',
      'it',
      'finance',
      'safety',
      'operations',
    ]);
    return policies.filter((p) => p && p.category && ok.has(p.category.toLowerCase()));
  }, []);

  const filteredPolicies = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? getAllCombinedPolicies()
        : policies.filter((p) => p && p.category === selectedCategory);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const title = (p?.title || '').toLowerCase();
        const content = (p?.content || '').toLowerCase();
        const tags = Array.isArray(p?.tags) ? p.tags : [];
        return (
          title.includes(q) ||
          content.includes(q) ||
          tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Active tab: bookmarked only
    if (activeTab === 'bookmarked') {
      list = list.filter((p) => bookmarkedPolicies.has(p.id));
    }

    // Basic sort (client-side)
    if (sortBy === 'name') {
      list = [...list].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'category') {
      list = [...list].sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    } else if (sortBy === 'date') {
      // This assumes a comparable `effectiveDate` string or timestamp on your data (fallback random).
      list = [...list].sort(
        (a, b) =>
          new Date(b?.effectiveDate || 0).getTime() -
          new Date(a?.effectiveDate || 0).getTime()
      );
    }

    // Date filter quick pass (week/month/year = very lightweight mock)
    const now = Date.now();
    const cutoff =
      dateFilter === 'week'
        ? now - 7 * 864e5
        : dateFilter === 'month'
        ? now - 30 * 864e5
        : dateFilter === 'year'
        ? now - 365 * 864e5
        : null;

    if (cutoff) {
      list = list.filter((p) => {
        const d = new Date(p?.effectiveDate || 0).getTime();
        return Number.isFinite(d) && d >= cutoff;
      });
    }

    return list;
  }, [
    selectedCategory,
    getAllCombinedPolicies,
    searchQuery,
    activeTab,
    bookmarkedPolicies,
    sortBy,
    dateFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / itemsPerPage));
  const paginatedPolicies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPolicies.slice(start, start + itemsPerPage);
  }, [filteredPolicies, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, activeTab, viewMode, sortBy, dateFilter, tilesPerPage]);

  // Popular policies (guarded)
  const popularPolicyIds = ['key-1001', 'global-1', 'hr-1', 'key-1'];
  const popularPolicies = useMemo(() => {
    const list = popularPolicyIds
      .map((id) => {
        const policy = policies.find((p) => p.id === id);
        if (!policy) return null;
        return {
          ...policy,
          lastUpdated: '2 days ago',
          views: Math.floor(Math.random() * 1000) + 100,
        };
      })
      .filter(Boolean);
    return list.length ? list : [];
  }, []);

  const hasSearchQuery = searchQuery.trim().length > 0;
  const showResults =
    hasSearchQuery || selectedCategory !== 'all' || activeTab === 'bookmarked';

  // Auto-scroll carousels (respect reduced motion)
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAutoPlaying || prefersReduced) return;
    if (!categories?.length || !popularPolicies?.length) return;

    const chunkCount = Math.max(1, Math.ceil((categories.length - 1) / 4));
    const id = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % chunkCount);
      setFeaturedIndex((prev) => (prev + 1) % popularPolicies.length);
    }, 5000);

    return () => clearInterval(id);
  }, [isAutoPlaying, categories, popularPolicies]);

  const toggleBookmark = useCallback((policyId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setBookmarkedPolicies((prev) => {
      const ns = new Set(prev);
      ns.has(policyId) ? ns.delete(policyId) : ns.add(policyId);
      return ns;
    });
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('all');
  }, []);

  if (loading) return <PageLoader />;

  const generateStars = (count) =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      >
        <Star size={Math.random() > 0.5 ? 2 : 1} className="text-white opacity-30" />
      </div>
    ));

  return (
    <div className="min-h-screen bg-black font-jakarta relative overflow-hidden">
      {/* Background (disabled by default; uncomment if you want stars) */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none">{generateStars(120)}</div> */}

      {/* Hero / Search */}
      <div className="relative z-10 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent text-glow mb-4 sm:mb-6">
              Policy Hub
            </h1>

            <div className="mt-6 sm:mt-10 max-w-4xl mx-auto">
              <div className="relative flex items-center bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-glow border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" aria-hidden />
                </div>
                <input
                  type="text"
                  aria-label="Search policies"
                  className="block w-full pl-12 sm:pl-16 pr-32 sm:pr-40 py-3 sm:py-5 border-0 rounded-xl sm:rounded-2xl text-sm sm:text-lg text-white placeholder-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Search policies, procedures, guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setShowAdvancedSearch((v) => !v)}
                  aria-expanded={showAdvancedSearch}
                  aria-label="Toggle advanced search"
                  className="absolute right-2 sm:right-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg sm:rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-glow hover:shadow-blue-500/40 text-xs sm:text-sm"
                >
                  <FiFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-medium hidden xs:inline">Advanced</span>
                </button>
              </div>

              {/* Advanced Search */}
              {showAdvancedSearch && (
                <div className="mt-4 sm:mt-6 bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-glow p-4 sm:p-8 border border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                        Sort by
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-gray-700 rounded-lg sm:rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Last Updated</option>
                        <option value="name">Name A-Z</option>
                        <option value="category">Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                        Date Range
                      </label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-gray-700 rounded-lg sm:rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-gray-700 rounded-lg sm:rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.count})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Tabs */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-center space-x-2 bg-black/60 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-gray-800 max-w-xs sm:max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              aria-pressed={activeTab === 'all'}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('bookmarked')}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 ${
                activeTab === 'bookmarked'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              aria-pressed={activeTab === 'bookmarked'}
            >
              <FiBookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>My ({bookmarkedPolicies.size})</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-glow p-4 sm:p-8 mb-10 border border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow mb-1.5 sm:mb-2">
                  {activeTab === 'bookmarked'
                    ? 'My Bookmarked Policies'
                    : hasSearchQuery
                    ? 'Search Results'
                    : selectedCategory !== 'all'
                    ? `${categories.find((c) => c.id === selectedCategory)?.name || 'Category'} Policies`
                    : 'All Policies'}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {hasSearchQuery
                    ? `About ${filteredPolicies.length} results for "${searchQuery}"`
                    : `${filteredPolicies.length} policies found`}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-gray-700">
                  <button
                    onClick={() => setViewMode('tiles')}
                    aria-label="Tiles view"
                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-300 ${
                      viewMode === 'tiles'
                        ? 'bg-blue-600 text-white shadow-glow'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <FiGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white shadow-glow'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <FiList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {(hasSearchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium text-xs sm:text-sm transition-colors duration-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {filteredPolicies.length > 0 ? (
              <>
                {viewMode === 'tiles' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    {paginatedPolicies.map((policy) => {
                      const catInfo = categoryIcons[policy.category] || categoryIcons.default;
                      const Icon = catInfo.icon;
                      const isBookmarked = bookmarkedPolicies.has(policy.id);

                      return (
                        <Link
                          key={policy.id}
                          to={getPolicyLink(policy.id)}
                          className="group relative bg-black/60 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-glow"
                          aria-label={`Open ${policy.title}`}
                        >
                          <div className="relative h-24 sm:h-32 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${catInfo.image})` }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${catInfo.gradient} opacity-80`} />
                            <button
                              onClick={(e) => toggleBookmark(policy.id, e)}
                              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                              className="absolute top-2 right-2 p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-md border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                              <FiBookmark
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? 'text-blue-400' : 'text-gray-400'}`}
                                fill={isBookmarked ? 'currentColor' : 'none'}
                              />
                            </button>
                            <div className="absolute bottom-2 left-2">
                              <div className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-md border border-gray-700">
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 sm:p-6">
                            <div className="mb-2 sm:mb-3">
                              <span
                                className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full ${catInfo.bg} ${catInfo.text} border border-gray-700`}
                              >
                                {policy.category}
                              </span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                              {policy.title}
                            </h3>
                            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                              <span className="inline-flex items-center">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                Updated 2d ago
                              </span>
                              <span className="inline-flex items-center">
                                <FiEye className="w-3 h-3 mr-1" />
                                {Math.floor(Math.random() * 500) + 100}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {paginatedPolicies.map((policy) => {
                      const catInfo = categoryIcons[policy.category] || categoryIcons.default;
                      const Icon = catInfo.icon;
                      const isBookmarked = bookmarkedPolicies.has(policy.id);

                      return (
                        <div key={policy.id} className="border-b border-gray-800 pb-4 sm:pb-6 last:border-b-0">
                          <Link
                            to={getPolicyLink(policy.id)}
                            className="block group hover:bg-black/40 rounded-lg sm:rounded-xl p-4 sm:p-6 -m-4 sm:-m-6 transition-all duration-300 border border-transparent hover:border-gray-700"
                          >
                            <div className="flex items-start gap-3 sm:gap-6">
                              <div className="flex-shrink-0">
                                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${catInfo.bg} backdrop-blur-sm border border-gray-700`}>
                                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${catInfo.text}`} />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                  <div className="flex items-center flex-wrap gap-2">
                                    <span className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full ${catInfo.bg} ${catInfo.text} border border-gray-700`}>
                                      {policy.category}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500">•</span>
                                    <span className="text-[10px] sm:text-xs text-gray-500">Updated 2 days ago</span>
                                    <span className="text-[10px] sm:text-xs text-gray-500">•</span>
                                    <span className="text-green-400 text-[10px] sm:text-xs font-medium inline-flex items-center">
                                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                                      Active
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => toggleBookmark(policy.id, e)}
                                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                                    className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-md transition-all duration-300"
                                  >
                                    <FiBookmark
                                      className={`w-4 h-4 ${isBookmarked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
                                      fill={isBookmarked ? 'currentColor' : 'none'}
                                    />
                                  </button>
                                </div>
                                <h3 className="text-base sm:text-xl font-semibold text-blue-400 group-hover:text-blue-300 mb-2 sm:mb-3 transition-colors duration-300">
                                  {policy.title}
                                </h3>
                                <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                                  {policy.content
                                    ? policy.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                                    : 'Policy content description...'}
                                </p>
                                <div className="flex items-center flex-wrap gap-3 sm:gap-6 text-[11px] sm:text-sm text-gray-500">
                                  <span className="inline-flex items-center">
                                    <FiTag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                    Policy #{policy.id}
                                  </span>
                                  <span className="inline-flex items-center">
                                    <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                    Effective: {policy.effectiveDate || 'Jan 2025'}
                                  </span>
                                  <span className="inline-flex items-center">
                                    <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                    {Math.floor(Math.random() * 1000) + 100} views
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-800">
                    <div className="text-gray-400 text-xs sm:text-sm">
                      Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredPolicies.length)} of {filteredPolicies.length}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 sm:p-2 rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        aria-label="Previous page"
                      >
                        <FiChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (currentPage <= 3) pageNum = i + 1;
                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md border transition-all duration-300 text-xs sm:text-sm ${
                              currentPage === pageNum
                                ? 'bg-blue-600 border-blue-600 text-white shadow-glow'
                                : 'border-gray-700 text-gray-400 hover:text-white hover:border-blue-500'
                            }`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 sm:p-2 rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        aria-label="Next page"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-black rounded-full flex items-center justify-center border border-gray-800">
                  {activeTab === 'bookmarked' ? (
                    <FiBookmark className="w-10 h-10 sm:w-16 sm:h-16 text-gray-600" />
                  ) : (
                    <SearchIcon className="w-10 h-10 sm:w-16 sm:h-16 text-gray-600" />
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3">
                  {activeTab === 'bookmarked' ? 'No bookmarked policies' : 'No policies found'}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 max-w-md mx-auto">
                  {activeTab === 'bookmarked'
                    ? 'Start bookmarking policies to access them quickly here.'
                    : 'Try adjusting your search terms or browse by category below.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setActiveTab('all');
                  }}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg sm:rounded-xl hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 shadow-glow"
                >
                  {activeTab === 'bookmarked' ? 'Browse All Policies' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Category Carousel */}
        {!showResults && categories.length > 0 && (
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow">
                Browse by Category
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying((v) => !v)}
                  className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
                  aria-label={isAutoPlaying ? 'Pause carousel' : 'Play carousel'}
                >
                  {isAutoPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
                </button>
                <button
                  onClick={() => setCategoryIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
                  aria-label="Previous categories"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    setCategoryIndex((prev) =>
                      Math.min(Math.ceil((categories.length - 1) / 4), prev + 1)
                    )
                  }
                  className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
                  aria-label="Next categories"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-6"
                style={{ transform: `translateX(-${categoryIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(categories.length / 4) }, (_, chunkIndex) => (
                  <div key={chunkIndex} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full flex-shrink-0">
                    {categories.slice(chunkIndex * 4, chunkIndex * 4 + 4).map((cat) => {
                      const info = categoryIcons[cat.id] || categoryIcons.default;
                      const Icon = info.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`relative overflow-hidden rounded-xl sm:rounded-2xl h-32 sm:h-48 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1.5 group ${
                            isSelected ? 'ring-2 ring-blue-500 shadow-glow' : ''
                          }`}
                          aria-pressed={isSelected}
                          aria-label={`Filter by ${cat.name}`}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${info.image})` }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                          <div className="relative h-full flex flex-col justify-end p-3 sm:p-6 text-white">
                            <div className="mb-2 sm:mb-4">
                              <Icon className="w-6 h-6 sm:w-10 sm:h-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="font-semibold text-sm sm:text-base text-left leading-tight drop-shadow-md mb-0.5 sm:mb-1 text-glow">
                              {cat.name}
                            </h3>
                            <span className="text-xs sm:text-sm opacity-90 drop-shadow-md text-left">
                              {cat.count} policies
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow border border-white/30">
                                <FiBookmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popular */}
        {!showResults && popularPolicies.length > 0 && (
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow">
                Popular Policies
              </h2>
              <Link
                to="/policies/all"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm sm:text-base transition-colors duration-300"
              >
                View all →
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-6"
                style={{
                  transform: `translateX(-${popularPolicies.length ? featuredIndex * 25 : 0}%)`,
                }}
              >
                {popularPolicies.map((policy) => {
                  const info = categoryIcons[policy.category] || categoryIcons.default;
                  const Icon = info.icon;
                  const isBookmarked = bookmarkedPolicies.has(policy.id);
                  return (
                    <Link
                      key={policy.id}
                      to={getPolicyLink(policy.id)}
                      className="group bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-glow hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-gray-800 hover:border-gray-600 flex-shrink-0 w-64 sm:w-80 hover:-translate-y-1.5 sm:hover:-translate-y-2"
                      aria-label={`Open ${policy.title}`}
                    >
                      <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${info.gradient}`} />
                      <div className="p-5 sm:p-8 relative">
                        <button
                          onClick={(e) => toggleBookmark(policy.id, e)}
                          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                          className="absolute top-3 right-3 p-1.5 sm:p-2 hover:bg-gray-700 rounded-md transition-all duration-300"
                        >
                          <FiBookmark
                            className={`w-4 h-4 ${isBookmarked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
                            fill={isBookmarked ? 'currentColor' : 'none'}
                          />
                        </button>
                        <div className="flex items-center mb-4 sm:mb-6">
                          <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${info.bg} backdrop-blur-sm border border-gray-700`}>
                            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${info.text}`} />
                          </div>
                          <div className="ml-3 sm:ml-4 flex-1">
                            <span className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full ${info.bg} ${info.text} border border-gray-700`}>
                              {policy.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base sm:text-xl font-semibold text-white mb-2.5 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-glow">
                          {policy.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                          {policy.content
                            ? policy.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                            : 'Policy description...'}
                        </p>
                        <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
                          <span className="inline-flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {policy.lastUpdated}
                          </span>
                          <span className="inline-flex items-center">
                            <FiEye className="w-3 h-3 mr-1" />
                            {policy.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Help */}
        {!showResults && (
          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-gray-800">
            <div className="text-center">
              <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow mb-3 sm:mb-6">
                Need Additional Help?
              </h2>
              <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Can&apos;t find the policy you&apos;re looking for? Our HR team can assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                <a
                  href="mailto:hr@nexrita.com"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg sm:rounded-xl hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 shadow-glow hover:shadow-blue-500/40 text-sm sm:text-base"
                >
                  <FiMail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Contact HR Team
                </a>
                <Link
                  to="/policies/request"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-gray-300 hover:text-white bg-black/50 hover:bg-black/70 font-medium rounded-lg sm:rounded-xl hover:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                >
                  Request New Policy
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom Animations (trimmed + responsive) */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
        .shadow-glow { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        .text-glow {
          text-shadow:
            0 0 10px rgba(59,130,246,.5),
            0 0 20px rgba(59,130,246,.3),
            0 0 40px rgba(59,130,246,.1);
        }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        @keyframes twinkle { 0%,100%{opacity:.2} 50%{opacity:.8} }
        .animate-twinkle { animation: twinkle var(--duration,3s) ease-in-out infinite; }

        /* Compact mobile type & spacing */
        @media (max-width: 639px) {
          .text-glow { text-shadow: 0 0 6px rgba(59,130,246,.35), 0 0 14px rgba(59,130,246,.2); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle { animation: none; }
        }
      `}</style>
    </div>
  );
}
