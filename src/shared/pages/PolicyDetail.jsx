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

// Skeleton Loader with Pulsing Animation
const SkeletonLoader = () => (
  <div className="min-h-screen bg-white text-gray-800">
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Skeleton */}
      <div className="h-8 w-1/2 bg-gray-200 rounded mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-3">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-gray-200 rounded animate-pulse ${
                i % 2 === 0 ? 'w-full' : 'w-5/6 ml-4'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-3 space-y-4">
          <div className="h-9 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>

          {/* Metadata Skeleton */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Actions Skeleton */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gray-200 rounded animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              ></div>
            ))}
          </div>

          {/* Content Lines Skeleton */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 rounded animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  </div>
);

export default function PolicyDetail() {
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Policy not found.</p>
      </div>
    );
  }

  const category = policyCategories.find(c => c.id === policy.category) || { name: 'Other' };

  return (
    <div className="max-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <button
              onClick={() => navigate(-1)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-gray-400">/</span>
            <Link to="/policies" className="text-blue-600 hover:underline">
              Policies
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium truncate text-gray-900">{policy.title}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6 lg:py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar (TOC) */}
        {headings.length > 0 && (
          <div className="lg:col-span-1 hidden lg:block  h-full w-full ">
            <div className="sticky top-24 bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
              <h2 className="text-sm font-semibold flex items-center mb-3 text-gray-900 uppercase tracking-wide">
                <DocumentTextIcon className="h-4 w-4 mr-1.5 text-gray-700" />
                <span>Table of Contents</span>
              </h2>
              <nav className="space-y-0.5 max-h-96 overflow-y-auto text-xs">
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToSection(h.id)}
                    className={`block w-full text-left px-2.5 py-1.5 rounded transition-all duration-150 truncate ${
                      activeHeading === h.id
                        ? 'bg-blue-50 text-blue-800 font-bold border-l-2 border-blue-500 pl-2'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    } ${h.level === 3 ? 'ml-3 text-gray-500' : ''}`}
                  >
                    {h.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${headings.length > 0 ? 'lg:col-span-3' : 'col-span-full'}`}>
          <article className="bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="p-5">
              <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {policy.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 mb-4 border-b pb-3 border-gray-200">
                <div className="flex items-center gap-1.5">
                  <DocumentIcon className="h-3.5 w-3.5 text-gray-500" />
                  <strong className="text-gray-800">{category.name}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                  Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5">
                  <VersionIcon className="h-3.5 w-3.5 text-gray-500" />
                  v{policy.version}
                </div>
              </div>

              {/* Details Grid */}
              <div className="bg-gray-50 p-3 rounded border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-5">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                  <strong className="text-gray-800">Effective:</strong> {policy.effectiveDate}
                </div>
                <div className="flex items-center gap-1.5">
                  <PeopleIcon className="h-3.5 w-3.5 text-gray-500" />
                  <strong className="text-gray-800">Applies To:</strong> {policy.appliesTo}
                </div>
                <div className="flex items-center gap-1.5">
                  <PersonIcon className="h-3.5 w-3.5 text-gray-500" />
                  <strong className="text-gray-800">Owner:</strong> {policy.owner}
                </div>
                <div className="flex items-center gap-1.5">
                  <ListIcon className="h-3.5 w-3.5 text-gray-500" />
                  <strong className="text-gray-800">Type:</strong> {policy.documentType}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                  <PrinterIcon className="h-3.5 w-3.5" /> Print
                </button>
                <button onClick={toggleBookmark} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                  <BookmarkIcon className={`h-3.5 w-3.5 ${isBookmarked ? 'text-blue-600' : ''}`} /> {isBookmarked ? 'Saved' : 'Save'}
                </button>
                <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                  <ShareIcon className="h-3.5 w-3.5" /> Share
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                  <DownloadIcon className="h-3.5 w-3.5" /> Download
                </button>
              </div>

              {/* Policy Content */}
              <div
                ref={contentRef}
                className="prose prose-sm max-w-none leading-relaxed text-gray-700 [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:border-l-4 [&_h2]:border-blue-500 [&_h2]:pl-2 [&_h2]:mb-3 [&_h2]:mt-5 [&_p]:font-simple [&_p]:text-gray-700 [&_p]:text-xs [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-xs [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: policy.processedContent }}
              />

              {/* Attachments */}
              {policy.attachments?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
                  <ul className="space-y-1">
                    {policy.attachments.map((file, i) => (
                      <li key={i} className="flex justify-between items-center text-xs text-gray-600 py-1 border-b border-gray-100 last:border-0">
                        <span className="flex items-center gap-1.5 truncate">
                          <DocumentTextIcon className="h-3.5 w-3.5 text-gray-500" />
                          {file.name}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}