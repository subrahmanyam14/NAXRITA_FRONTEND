import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FiSearch as SearchIcon } from 'react-icons/fi';
import { FiFileText as DocumentTextIcon } from 'react-icons/fi';
import { FiBookOpen as BookOpenIcon } from 'react-icons/fi';
import { FiShield as ShieldCheckIcon } from 'react-icons/fi';
import { FiClock as ClockIcon } from 'react-icons/fi';
import { FiUsers as UserGroupIcon } from 'react-icons/fi';
import { FiGlobe as GlobeAltIcon } from 'react-icons/fi';
import { FiBriefcase as BriefcaseIcon } from 'react-icons/fi';
import { FiRotateCw as BeakerIcon } from 'react-icons/fi';
import { FiSettings as CogIcon } from 'react-icons/fi';
import { FiAlertTriangle as ShieldExclamationIcon } from 'react-icons/fi';
import { FiHome as BuildingOfficeIcon } from 'react-icons/fi';
import { FiDollarSign as CurrencyDollarIcon } from 'react-icons/fi';
import { FiCode as CodeBracketIcon } from 'react-icons/fi';
import { FiFilter, FiChevronDown, FiCalendar, FiTag, FiStar, FiClock } from 'react-icons/fi';


// Import policies data
import { policies, policyCategories, getPoliciesByCategory } from '../../data/policies';

// Category icons with background images
const categoryIcons = {
  'key': { 
    icon: ShieldExclamationIcon, 
    // color: 'from-red-50 to-pink-50', 
    // bg: 'bg-red-50', 
    text: 'text-red-700',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop&crop=center'
  },
  'hr': { 
    icon: UserGroupIcon, 
    // color: 'from-blue-500 to-indigo-600', 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center'
  },
  'code': { 
    icon: CodeBracketIcon, 
    // color: 'from-purple-500 to-indigo-600', 
    bg: 'bg-purple-50', 
    text: 'text-purple-700',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center'
  },
  'global': { 
    icon: GlobeAltIcon, 
    // color: 'from-green-500 to-emerald-600', 
    bg: 'bg-green-50', 
    text: 'text-green-700',
    image: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=400&h=300&fit=crop&crop=center'
  },
  'india': { 
    icon: BuildingOfficeIcon, 
    // color: 'from-orange-500 to-red-600', 
    bg: 'bg-orange-50', 
    text: 'text-orange-700',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&crop=center'
  },
  'it': { 
    icon: CogIcon, 
    // color: 'from-gray-500 to-slate-600', 
    bg: 'bg-gray-50', 
    text: 'text-gray-700',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop&crop=center'
  },
  'finance': { 
    icon: CurrencyDollarIcon, 
    // color: 'from-yellow-500 to-orange-600', 
    bg: 'bg-yellow-50', 
    text: 'text-yellow-700',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
  },
  'safety': { 
    icon: ShieldCheckIcon, 
    color: 'from-teal-500 to-cyan-600', 
    bg: 'bg-teal-50', 
    text: 'text-teal-700',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400&h=300&fit=crop&crop=center'
  },
  'operations': { 
    icon: BeakerIcon, 
    // color: 'from-pink-500 to-rose-600', 
    bg: 'bg-pink-50', 
    text: 'text-pink-700',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'
  },
  'default': { 
    icon: DocumentTextIcon, 
    // color: 'from-gray-400 to-gray-600', 
    bg: 'bg-gray-50', 
    text: 'text-gray-700',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center'
  }
};

// Professional Loader Component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse mb-4">
        <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-full flex items-center justify-center">
          <DocumentTextIcon className="w-10 h-10 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Policies</h2>
      <p className="text-gray-500 mb-6">Preparing your compliance dashboard...</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
      </div>
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default function PolicyLanding() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateFilter, setDateFilter] = useState('all');

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  // Add counts to categories
  const categories = [
    { id: 'all', name: 'All Policies' },
    ...policyCategories
  ].map(cat => ({
    ...cat,
    count: cat.id === 'all'
      ? policies.length
      : policies.filter(p => p.category === cat.id).length
  }));

  // Filter policies
  const filteredPolicies = policies.filter(policy => {
    if (!policy || !policy.title) return false;

    const title = typeof policy.title === 'string' ? policy.title : '';
    const description = typeof policy.description === 'string' ? policy.description : '';

    const matchesSearch = !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === getPoliciesByCategory("all") || policy.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Popular policies
  const popularPolicyIds = ['key-1001', 'global-1', 'hr-1', 'it-1'];
  const popularPolicies = popularPolicyIds
    .map(id => {
      const policy = policies.find(p => p.id === id);
      if (!policy) return null;
      return {
        ...policy,
        lastUpdated: '2 days ago',
        views: Math.floor(Math.random() * 1000) + 100
      };
    })
    .filter(Boolean);

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero Section */}
      <div className="bg-gradient-to-r from-purple-950 via-black to-purple-950 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Policy Hub
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Your comprehensive resource for company policies, procedures, and compliance guidelines.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mt-10 max-w-4xl mx-auto">
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-32 py-4 border-0 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
                  placeholder="Search policies, procedures, guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="absolute right-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors flex items-center space-x-2"
                >
                  <FiFilter className="w-4 h-4" />
                  <span className="text-sm font-medium">Advanced</span>
                </button>
              </div>
              
              {/* Advanced Search Panel */}
              {showAdvancedSearch && (
                <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Last Updated</option>
                        <option value="name">Name A-Z</option>
                        <option value="category">Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

      <main className="-mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search Results - Show immediately when searching */}
        {hasSearchQuery && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                <p className="text-gray-600">About {filteredPolicies.length} results for "{searchQuery}"</p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear search
              </button>
            </div>

            <div className="space-y-6">
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => {
                  const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                  const Icon = categoryInfo.icon;
                  
                  return (
                    <div key={policy.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <Link
                        to={`/employee/public/policies/${policy.id}`}
                        className="block group hover:bg-gray-50 rounded-lg p-4 -m-4 transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${categoryInfo.bg} flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${categoryInfo.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text}`}>
                                {policy.category}
                              </span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">Updated 2 days ago</span>
                            </div>
                            <h3 className="text-xl font-semibold text-indigo-600 group-hover:text-indigo-800 mb-2">
                              {policy.title}
                            </h3>
                            <p className="text-gray-700 text-base mb-3 leading-relaxed">
                              {policy.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <FiTag className="w-4 h-4 mr-1" />
                                Policy #{policy.id}
                              </span>
                              <span className="flex items-center">
                                <FiCalendar className="w-4 h-4 mr-1" />
                                Last reviewed: Jan 2025
                              </span>
                              <span className="text-green-600 font-medium">✓ Active</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <SearchIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or browse by category below.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Filter Cards - Only show when not searching */}
        {!hasSearchQuery && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => {
                const categoryInfo = categoryIcons[cat.id] || categoryIcons.default;
                const Icon = categoryInfo.icon;
                const isSelected = selectedCategory === cat.id;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative overflow-hidden rounded-2xl h-32 transition-all duration-300 transform hover:scale-105 ${
                      isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50' : ''
                    }`}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${categoryInfo.image})` }}
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} opacity-80`}></div>
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                      <Icon className="w-8 h-8 mb-2 drop-shadow-lg" />
                      <h3 className="font-semibold text-sm text-center leading-tight drop-shadow-md">{cat.name}</h3>
                      <span className="text-xs opacity-90 mt-1 drop-shadow-md">{cat.count} policies</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <FiStar className="w-3 h-3 text-indigo-600" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Policies - Only show when not searching */}
        {!hasSearchQuery && (
          <div className="mb-12 mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Policies</h2>
              <Link to="/policies/all" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPolicies.map((policy) => {
                const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                const Icon = categoryInfo.icon;
                
                return (
                  <Link
                    key={policy.id}
                    to={`/employee/public/policies/${policy.id}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className={`h-3 bg-gradient-to-r ${categoryInfo.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl ${categoryInfo.bg}`}>
                          <Icon className={`w-6 h-6 ${categoryInfo.text}`} />
                        </div>
                        <div className="ml-3 flex-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text}`}>
                            {policy.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{policy.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {policy.lastUpdated}
                        </span>
                        <span className="flex items-center">
                          👁️ {policy.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Filtered Results by Category - Only show when category is selected but no search */}
        {!hasSearchQuery && selectedCategory !== 'all' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.name || 'Category'} Policies
                </h2>
                <p className="text-gray-600">{filteredPolicies.length} policies found</p>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Show all categories
              </button>
            </div>

            <div className="space-y-6">
              {filteredPolicies.map((policy) => {
                const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                const Icon = categoryInfo.icon;
                
                return (
                  <div key={policy.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <Link
                      to={`/employee/public/policies/${policy.id}`}
                      className="block group hover:bg-gray-50 rounded-lg p-4 -m-4 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${categoryInfo.bg} flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${categoryInfo.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text}`}>
                              {policy.category}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">Updated 2 days ago</span>
                          </div>
                          <h3 className="text-xl font-semibold text-indigo-600 group-hover:text-indigo-800 mb-2">
                            {policy.title}
                          </h3>
                          <p className="text-gray-700 text-base mb-3 leading-relaxed">
                            {policy.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FiTag className="w-4 h-4 mr-1" />
                              Policy #{policy.id}
                            </span>
                            <span className="flex items-center">
                              <FiCalendar className="w-4 h-4 mr-1" />
                              Last reviewed: Jan 2025
                            </span>
                            <span className="text-green-600 font-medium">✓ Active</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Help Section - Only show when not searching */}
        {!hasSearchQuery && (
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the policy you're looking for? Our HR team is available to assist you with any questions or provide additional resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hr@company.com"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Contact HR Team
                </a>
                <Link
                  to="/policies/request"
                  className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
                >
                  Request New Policy
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}