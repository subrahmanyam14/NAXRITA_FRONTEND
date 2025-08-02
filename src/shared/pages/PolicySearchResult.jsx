// src/pages/PolicyLanding.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Replace ALL Heroicons with react-icons/fi
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
import { FiHome as BuildingOfficeIcon } from 'react-icons/fi'; // Closest to OfficeBuilding
import { FiDollarSign as CurrencyDollarIcon } from 'react-icons/fi';
import { FiCode as CodeIcon } from 'react-icons/fi';

// ✅ Import policies data
import { policies, policyCategories } from '../../data/policies';

// Icons mapping for categories
const categoryIcons = {
  'key': ShieldExclamationIcon,
  'hr': UserGroupIcon,
  'code': CodeIcon,
  'global': GlobeAltIcon,
  'india': BuildingOfficeIcon,
  'it': CogIcon,
  'finance': CurrencyDollarIcon,
  'safety': ShieldCheckIcon,
  'operations': BeakerIcon,
  'default': DocumentTextIcon
};

// Sample popular policies with updated structure
const popularPolicies = [
  {
    id: 'key-1001',
    title: 'Respect in the Workplace',
    category: 'code',
    description: 'Guidelines for maintaining a respectful and inclusive workplace environment for all employees.',
    lastUpdated: '2 days ago',
    icon: UserGroupIcon,
    iconBackground: 'bg-indigo-100',
    iconForeground: 'text-indigo-600',
  },
  {
    id: 'global-1',
    title: 'Global Code of Conduct',
    category: 'global',
    description: 'Our global standards for ethical behavior and professional conduct.',
    lastUpdated: '1 week ago',
    icon: GlobeAltIcon,
    iconBackground: 'bg-green-100',
    iconForeground: 'text-green-600',
  },
  {
    id: 'hr-1',
    title: 'Remote Work Policy',
    category: 'hr',
    description: 'Rules and expectations for employees working remotely.',
    lastUpdated: '3 days ago',
    icon: BriefcaseIcon,
    iconBackground: 'bg-purple-100',
    iconForeground: 'text-purple-600',
  },
  {
    id: 'it-1',
    title: 'Information Security Policy',
    category: 'it',
    description: 'Protecting company data and digital assets from unauthorized access.',
    lastUpdated: '5 days ago',
    icon: ShieldCheckIcon,
    iconBackground: 'bg-red-100',
    iconForeground: 'text-red-600',
  }
];

// Recent updates for dashboard
const recentUpdates = [
  { id: 'update-1', title: 'Updated: Respect in the Workplace', date: '2 days ago', type: 'update' },
  { id: 'update-2', title: 'New: Mental Health Benefits', date: '1 week ago', type: 'new' },
  { id: 'update-3', title: 'Updated: Remote Work Policy', date: '3 days ago', type: 'update' }
];

// Professional Full-Page Loader
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center">
      {/* Animated Logo */}
      <div className="animate-pulse mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 hover:rotate-0 transition duration-500">
          <DocumentTextIcon className="w-10 h-10 text-white drop-shadow-md" />
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-wide">Loading Policies</h2>
      <p className="text-gray-500 mb-8 text-lg">Preparing your compliance dashboard...</p>

      {/* Animated Progress Bar */}
      <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6 shadow-inner">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-loading-bar"></div>
      </div>

      {/* Floating Dots */}
      <div className="flex justify-center space-x-3">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-float" style={{ animationDelay: '0ms' }}></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-float" style={{ animationDelay: '300ms' }}></div>
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-float" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>

    {/* Global Animations */}
    <style jsx>{`
      @keyframes loading-bar {
        0% { width: 0%; }
        50% { width: 80%; }
        100% { width: 100%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); opacity: 0.6; }
        50% { transform: translateY(-15px); opacity: 1; }
      }
      .animate-loading-bar {
        animation: loading-bar 2s ease-in-out forwards;
      }
      .animate-float {
        animation: float 1.8s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default function PolicyLanding() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate realistic loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
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
  // ✅ Guard against null/undefined policy or missing title
  if (!policy || !policy.title) {
    console.warn('Invalid policy object filtered out:', policy);
    return false;
  }

  const matchesSearch = !searchQuery ||
    (policy.title && typeof policy.title === 'string' && policy.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (policy.description && typeof policy.description === 'string' && policy.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
// useEffect(() => {
//   const invalid = policies.filter(p => !p || !p.title);
//   if (invalid.length > 0) {
//     console.error('Invalid policies found:', invalid);
//   }
// }, []);
// ✅ Safer: Pull from real data
// const popularPolicyIds = ['key-1001', 'global-1', 'hr-1', 'it-1'];
// const popularPolicies = popularPolicyIds
//   .map(id => policies.find(p => p.id === id))
//   .filter(Boolean); // Remove undefined if policy not found

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-800 pb-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-md">
              Company Policies
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Access all company policies, procedures, and guidelines in one place.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-indigo-300" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white bg-opacity-20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 backdrop-blur-sm"
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search & Filter */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 transition-all hover:shadow-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-500">Filter by category</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white text-xs font-medium">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Policies */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Policies</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularPolicies.map((policy) => {
              const Icon = categoryIcons[policy.category] || categoryIcons.default;
              return (
                <Link
                  key={policy.id}
                  to={`/policies/${policy.id}`}
                  className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <span className={`p-2 rounded-md ${policy.iconBackground}`}>
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </span>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">{policy.category}</p>
                        <h3 className="text-lg font-medium text-gray-900">{policy.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500 line-clamp-2">{policy.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-gray-500">Updated {policy.lastUpdated}</p>
                      <span className="text-sm font-medium text-blue-600">View Policy →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Policies & Recent Updates */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* All Policies */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">All Policies</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => {
                    const Icon = categoryIcons[policy.category] || categoryIcons.default;
                    return (
                      <Link
                        key={policy.id}
                        to={`/policies/${policy.id}`}
                        className="block px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon className="h-5 w-5 text-gray-400" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">{policy.category}</p>
                              <h3 className="text-base font-medium text-gray-900">{policy.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">{policy.description}</p>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className="text-sm font-medium text-blue-600">View</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-center py-6 text-gray-500">No policies match your search.</p>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/policies/search" className="font-medium text-blue-600 hover:text-blue-500">
                    View all policies →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Updates + Help */}
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Updates</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                          update.type === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          <span className="text-xs font-medium">
                            {update.type === 'new' ? 'New' : 'Upd'}
                          </span>
                        </span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                        <p className="mt-1 text-xs text-gray-400">{update.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Need Help?</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Can't find what you're looking for? Our HR team is here to help.
                </p>
                <div className="mt-4">
                  <a
                    href="mailto:hr@company.com"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Contact HR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}