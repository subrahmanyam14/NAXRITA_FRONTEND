// src/pages/PolicyDetail.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
// Icons
import { IoChevronBack as ArrowLeftIcon } from 'react-icons/io5';
import { FiFileText as DocumentTextIcon } from 'react-icons/fi';
import { FiPrinter as PrinterIcon } from 'react-icons/fi';
import { FiShare2 as ShareIcon } from 'react-icons/fi';
import { FiBookmark as BookmarkIcon } from 'react-icons/fi';
import { FiDownload as DownloadIcon } from 'react-icons/fi';
import { IoDocumentOutline as DocumentIcon } from 'react-icons/io5';
import { IoCalendarOutline as CalendarIcon } from 'react-icons/io5';
import { IoBarcodeOutline as VersionIcon } from 'react-icons/io5';
import { IoPeopleOutline as PeopleIcon } from 'react-icons/io5';
import { IoPersonOutline as PersonIcon } from 'react-icons/io5';
import { IoListOutline as ListIcon } from 'react-icons/io5';

// Data
import { getPolicyById, policyCategories } from '../../data/policies';
import { useAuth } from '../../contexts/AuthContext';
// Cosmic Background Component
const CosmicBackground = () => {
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Generate stars
    const starArray = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
      duration: Math.random() * 3 + 2
    }));

    // Generate sparkles
    const sparkleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
      duration: Math.random() * 8 + 5,
      delay: Math.random() * 5
    }));

    // Generate animated dots
    const dotArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    }));

    setStars(starArray);
    setSparkles(sparkleArray);
    setDots(dotArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Starfield */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.id * 0.1}s`
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute rounded-full animate-float-sparkle"
          style={{
            left: `${sparkle.left}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`
          }}
        />
      ))}

      {/* Animated Dots */}
      {dots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full animate-pulse-drift"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}

      {/* Nebula Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-drift-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-500/3 rounded-full blur-3xl animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/4 rounded-full blur-2xl animate-scale-pulse" />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes float-sparkle {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-20px) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes pulse-drift {
          0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: translate(25px, -25px) scale(1.5); 
            opacity: 0.8; 
          }
          100% { 
            transform: translate(50px, -50px) scale(1); 
            opacity: 0.3; 
          }
        }
        
        @keyframes drift-slow {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(50px, 30px) rotate(360deg); }
        }
        
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, -40px) rotate(-360deg); }
        }
        
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); opacity: 0.03; }
          50% { transform: scale(1.2); opacity: 0.08; }
        }
        
        .animate-twinkle {
          animation: twinkle var(--duration, 3s) ease-in-out infinite alternate;
        }
        
        .animate-float-sparkle {
          animation: float-sparkle var(--duration, 8s) linear infinite;
        }
        
        .animate-pulse-drift {
          animation: pulse-drift var(--duration, 4s) ease-in-out infinite;
        }
        
        .animate-drift-slow {
          animation: drift-slow 30s linear infinite;
        }
        
        .animate-drift-reverse {
          animation: drift-reverse 25s linear infinite;
        }
        
        .animate-scale-pulse {
          animation: scale-pulse 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Helper: Inject IDs into headings and extract TOC
const processContent = (html) => {
  if (!html) return { content: '', headings: [] };
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const headings = [];
  let id = 0;
  let processedHtml = html;

  processedHtml = processedHtml.replace(regex, (match, level, content) => {
    const headingId = `section-${id}`;
    headings.push({
      id: headingId,
      level: parseInt(level),
      title: content.replace(/<[^>]*>/g, '').trim()
    });
    id++;
    return `<h${level} id="${headingId}" class="scroll-mt-20">${content}</h${level}>`;
  });

  return { content: processedHtml, headings };
};

// Enhanced Skeleton Loader with Cosmic Theme
const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
    <CosmicBackground />
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
      {/* Header Skeleton */}
      <div className="h-8 w-1/2 bg-gradient-to-r from-gray-800 to-gray-700 rounded mb-8 animate-pulse-glow"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-3">
          <div className="h-5 w-1/2 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded animate-pulse-glow"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded animate-pulse-glow ${
                i % 2 === 0 ? 'w-full' : 'w-5/6 ml-4'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-3 space-y-4">
          <div className="h-9 w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded animate-pulse-glow"></div>
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded animate-pulse-glow"></div>

          {/* Metadata Skeleton */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded animate-pulse-glow"></div>
            ))}
          </div>

          {/* Actions Skeleton */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse-glow"
                style={{ animationDelay: `${i * 150}ms` }}
              ></div>
            ))}
          </div>

          {/* Content Lines Skeleton */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded animate-pulse-glow"
              style={{ animationDelay: `${i * 50}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes pulse-glow {
        0%, 100% { 
          opacity: 0.4; 
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.1);
        }
        50% { 
          opacity: 0.8; 
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
      }
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default function PolicyDetail() {
  const { user } = useAuth(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const contentRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Load and process policy
  useEffect(() => {
    if (loading) return;
    const found = getPolicyById(id);
    if (!found) {
      navigate('/policies', { replace: true });
      return;
    }
    const { content: processedContent, headings: extractedHeadings } = processContent(found.content);
    setPolicy({ ...found, processedContent });
    setHeadings(extractedHeadings);
    if (extractedHeadings.length > 0) {
      setActiveHeading(extractedHeadings[0].id);
    }
  }, [id, navigate, loading]);

  // Scroll listener for active section
  useEffect(() => {
    if (loading || headings.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = null;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;
        const nextEl = document.getElementById(headings[i + 1]?.id);
        const top = el.offsetTop;
        const nextTop = nextEl ? nextEl.offsetTop : Infinity;

        if (scrollPos >= top && scrollPos < nextTop) {
          current = headings[i].id;
          break;
        }
      }

      if (current && current !== activeHeading) {
        setActiveHeading(current);
      }
    };

    const debouncedScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, [headings, activeHeading, loading]);

  // Scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveHeading(id);
    }
  };

  // Actions
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);
  const handlePrint = () => window.print();
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: policy?.title || 'Policy Document',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!policy) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10">
          <p className="text-gray-400 text-lg">Policy not found.</p>
        </div>
      </div>
    );
  }
  const getPolicyLink = (policyId) => {
    const userRole = user?.role || 'employee';
    return `/${userRole}/public/policies`;
  };

  const category = policyCategories.find(c => c.id === policy.category) || { name: 'Other' };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative ">
      <CosmicBackground />
      
      {/* Header */}
      <header className="bg-[#111111]/80 backdrop-blur-lg border-b border-[#2a2a2a] shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-[#1e1e1e] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
              aria-label="Back"
            >
              <ArrowLeftIcon className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
            </button>
            <span className="text-gray-600">/</span>
            <Link 
               to={getPolicyLink(policy.id)} 
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
            >
              Policies
            </Link>
            <span className="text-gray-600">/</span>
            <span className="font-semibold truncate text-white">{policy.title}</span>
          </div>
        </div>
      </header>

      {/* Main Content Container with proper spacing */}
      <div className="relative z-10 py-8 px-4 lg:px-6 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar (TOC) */}
          {headings.length > 0 && (
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 bg-[#1e1e1e]/80 backdrop-blur-lg p-6 rounded-xl border border-[#2a2a2a] shadow-xl shadow-black/50 hover:shadow-blue-500/10 transition-all duration-500">
                <h2 className="text-sm font-bold flex items-center mb-4 text-white uppercase tracking-wider">
                  <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-400" />
                  <span>Table of Contents</span>
                </h2>
                <nav className="space-y-1 max-h-96 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 truncate group ${
                        activeHeading === h.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 border-l-2 border-blue-400'
                          : 'text-gray-300 hover:bg-[#2a2a2a]/50 hover:text-white hover:shadow-md hover:shadow-blue-500/10'
                      } ${h.level === 3 ? 'ml-4 text-gray-400 text-xs' : ''}`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        {h.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`${headings.length > 0 ? 'lg:col-span-3' : 'col-span-full'}`}>
            <article className="bg-[#1e1e1e]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] shadow-2xl shadow-black/50 hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {policy.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 mb-6 border-b border-[#2a2a2a] pb-4">
                  <div className="flex items-center gap-2 bg-[#161616]/50 px-3 py-1.5 rounded-lg backdrop-blur">
                    <DocumentIcon className="h-4 w-4 text-blue-400" />
                    <strong className="text-white">{category.name}</strong>
                  </div>
                  <div className="flex items-center gap-2 bg-[#161616]/50 px-3 py-1.5 rounded-lg backdrop-blur">
                    <CalendarIcon className="h-4 w-4 text-green-400" />
                    Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 bg-[#161616]/50 px-3 py-1.5 rounded-lg backdrop-blur">
                    <VersionIcon className="h-4 w-4 text-yellow-400" />
                    v{policy.version}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="bg-gradient-to-br from-[#161616] to-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 shadow-inner">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-400" />
                    <strong className="text-white">Effective:</strong> 
                    <span className="text-gray-300">{policy.effectiveDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PeopleIcon className="h-4 w-4 text-purple-400" />
                    <strong className="text-white">Applies To:</strong> 
                    <span className="text-gray-300">{policy.appliesTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PersonIcon className="h-4 w-4 text-green-400" />
                    <strong className="text-white">Owner:</strong> 
                    <span className="text-gray-300">{policy.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ListIcon className="h-4 w-4 text-orange-400" />
                    <strong className="text-white">Type:</strong> 
                    <span className="text-gray-300">{policy.documentType}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button 
                    onClick={handlePrint} 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 group"
                  >
                    <PrinterIcon className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
                    Print
                  </button>
                  <button 
                    onClick={toggleBookmark} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:scale-105 group ${
                      isBookmarked 
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-yellow-500/30 hover:shadow-yellow-500/50' 
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white border border-[#404040] shadow-gray-500/20'
                    }`}
                  >
                    <BookmarkIcon className={`h-4 w-4 group-hover:scale-110 transition-transform ${isBookmarked ? 'text-yellow-200' : ''}`} /> 
                    {isBookmarked ? 'Saved' : 'Save'}
                  </button>
                  <button 
                    onClick={handleShare} 
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-gray-300 border border-[#404040] rounded-lg font-medium hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 shadow-lg shadow-gray-500/20 hover:shadow-gray-500/40 hover:scale-105 group"
                  >
                    <ShareIcon className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 group">
                    <DownloadIcon className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
                    Download
                  </button>
                </div>

                {/* Policy Content */}
                <div
                  ref={contentRef}
                  className="prose prose-invert prose-blue max-w-none leading-relaxed text-gray-300 
                    [&_h2]:font-bold [&_h2]:text-white [&_h2]:border-l-4 [&_h2]:border-blue-500 [&_h2]:pl-4 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:bg-gradient-to-r [&_h2]:from-blue-900/20 [&_h2]:to-transparent [&_h2]:py-2 [&_h2]:rounded-r-lg
                    [&_h3]:font-semibold [&_h3]:text-blue-200 [&_h3]:mt-6 [&_h3]:mb-3
                    [&_p]:text-gray-300 [&_p]:text-base [&_p]:mb-4 [&_p]:leading-relaxed 
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-base [&_ul]:text-gray-300
                    [&_li]:mb-2 [&_li]:leading-relaxed
                    [&_strong]:text-white [&_strong]:font-semibold
                    [&_em]:text-blue-200 [&_em]:italic
                    [&_code]:bg-gray-800 [&_code]:text-blue-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm
                    [&_a]:text-blue-400 [&_a]:hover:text-blue-300 [&_a]:underline [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: policy.processedContent }}
                />

                {/* Attachments */}
                {policy.attachments?.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-[#2a2a2a]">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                      Attachments
                    </h3>
                    <div className="space-y-3">
                      {policy.attachments.map((file, i) => (
                        <div 
                          key={i} 
                          className="flex justify-between items-center p-4 bg-[#161616]/50 rounded-lg border border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#404040] transition-all duration-300 group"
                        >
                          <span className="flex items-center gap-3 text-gray-300 truncate group-hover:text-white transition-colors">
                            <DocumentTextIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="font-medium">{file.name}</span>
                          </span>
                          <button className="text-blue-400 hover:text-blue-300 font-medium px-3 py-1 rounded hover:bg-blue-500/10 transition-all duration-300">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Bottom Spacing to prevent footer overlap */}
      <div className="h-20 w-full relative z-10"></div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-600 {
          scrollbar-color: #4b5563 transparent;
        }
        
        /* Webkit scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle,
          .animate-float-sparkle,
          .animate-pulse-drift,
          .animate-drift-slow,
          .animate-drift-reverse,
          .animate-scale-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
