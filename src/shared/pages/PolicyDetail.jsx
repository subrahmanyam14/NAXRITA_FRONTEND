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
import { IoClose as CloseIcon } from 'react-icons/io5';
import { IoMenu as MenuIcon } from 'react-icons/io5';
import { IoCallOutline as CallIcon } from 'react-icons/io5';
import { IoLinkOutline as LinkIcon } from 'react-icons/io5';

// Data / Auth
import { getPolicyById, policyCategories } from '../../data/policies';
import { useAuth } from '../../contexts/AuthContext';

/* -------------------------- Cosmic Background -------------------------- */
const CosmicBackground = () => {
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const starArray = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
      duration: Math.random() * 3 + 2
    }));
    const sparkleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
      duration: Math.random() * 8 + 5,
      delay: Math.random() * 5
    }));
    const dotArray = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: ['rgba(37,99,235,.28)','rgba(163,163,163,.18)','rgba(107,114,128,.12)'][Math.floor(Math.random() * 3)],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    }));
    setStars(starArray); setSparkles(sparkleArray); setDots(dotArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <div key={`star-${star.id}`} className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.left}%`, top: `${star.top}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            backgroundColor: star.color, opacity: star.opacity,
            animationDuration: `${star.duration}s`, animationDelay: `${star.id * 0.08}s`
          }} />
      ))}
      {sparkles.map(s => (
        <div key={`sparkle-${s.id}`} className="absolute rounded-full animate-float-sparkle"
          style={{
            left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`,
            backgroundColor: s.color, animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`, boxShadow: `0 0 ${s.size * 2}px ${s.color}`
          }} />
      ))}
      {dots.map(d => (
        <div key={`dot-${d.id}`} className="absolute rounded-full animate-pulse-drift"
          style={{
            left: `${d.left}%`, top: `${d.top}%`,
            width: `${d.size}px`, height: `${d.size}px`,
            backgroundColor: d.color, animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`
          }} />
      ))}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-drift-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gray-500/10 rounded-full blur-3xl animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/4 w-56 h-56 bg-blue-600/10 rounded-full blur-2xl animate-scale-pulse" />
      </div>

      <style jsx>{`
        @keyframes twinkle { 0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.8;transform:scale(1.2)} }
        @keyframes float-sparkle { 0%{transform:translateY(100vh) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-20px) rotate(360deg);opacity:0} }
        @keyframes pulse-drift { 0%{transform:translate(0,0) scale(1);opacity:.3}50%{transform:translate(25px,-25px) scale(1.5);opacity:.8}100%{transform:translate(50px,-50px) scale(1);opacity:.3} }
        @keyframes drift-slow { 0%{transform:translate(0,0) rotate(0)}100%{transform:translate(50px,30px) rotate(360deg)} }
        @keyframes drift-reverse { 0%{transform:translate(0,0) rotate(0)}100%{transform:translate(-30px,-40px) rotate(-360deg)} }
        @keyframes scale-pulse { 0%,100%{transform:scale(1);opacity:.06}50%{transform:scale(1.2);opacity:.12} }
        .animate-twinkle{animation:twinkle var(--duration,3s) ease-in-out infinite alternate}
        .animate-float-sparkle{animation:float-sparkle var(--duration,8s) linear infinite}
        .animate-pulse-drift{animation:pulse-drift var(--duration,4s) ease-in-out infinite}
        .animate-drift-slow{animation:drift-slow 28s linear infinite}
        .animate-drift-reverse{animation:drift-reverse 25s linear infinite}
        .animate-scale-pulse{animation:scale-pulse 18s ease-in-out infinite}
      `}</style>
    </div>
  );
};

/* -------------------- Helpers: IDs + Table of Contents -------------------- */
const processContent = (html) => {
  if (!html) return { content: '', headings: [] };
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const headings = [];
  let id = 0;
  let processedHtml = html.replace(regex, (match, level, inner) => {
    const headingId = `section-${id}`;
    headings.push({
      id: headingId,
      level: parseInt(level, 10),
      title: inner.replace(/<[^>]*>/g, '').trim()
    });
    id++;
    return `<h${level} id="${headingId}" class="scroll-mt-24">${inner}</h${level}>`;
  });
  return { content: processedHtml, headings };
};

/* ---------------------------- Skeleton Loader ---------------------------- */
const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-jakarta">
    <CosmicBackground />
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 w-2/3 bg-gradient-to-r from-gray-800 to-gray-700 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block lg:col-span-1 space-y-3">
          <div className="h-5 w-1/2 bg-gray-800 rounded animate-pulse" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 ${i%2?'w-4/5':'w-full'} bg-gray-800/70 rounded animate-pulse`} />
          ))}
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-800/70 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ================================ Page ================================== */
export default function PolicyDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tabs
  const TABS = ['Overview', 'Policy', 'Resources', 'Contact', 'Revisions'];
  const [activeTab, setActiveTab] = useState('Overview');

  // Mobile TOC Drawer
  const [tocOpen, setTocOpen] = useState(false);

  const contentRef = useRef(null);

  /* Simulate loading to show skeleton */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  /* Load and process policy by ID */
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
    setActiveHeading(extractedHeadings[0]?.id || null);
  }, [id, navigate, loading]);

  /* Active heading on scroll (desktop & when tab is Policy) */
  useEffect(() => {
    if (loading || headings.length === 0 || activeTab !== 'Policy') return;

    const onScroll = () => {
      const scrollY = window.scrollY + 120; // offset for header
      let current = activeHeading;
      for (let i = 0; i < headings.length; i++) {
        const cur = document.getElementById(headings[i].id);
        const next = document.getElementById(headings[i + 1]?.id);
        if (!cur) continue;
        const top = cur.offsetTop;
        const nextTop = next ? next.offsetTop : Number.POSITIVE_INFINITY;
        if (scrollY >= top && scrollY < nextTop) { current = headings[i].id; break; }
      }
      if (current !== activeHeading) setActiveHeading(current);
    };

    const debounced = () => {
      clearTimeout(window.__tocTimeout);
      window.__tocTimeout = setTimeout(onScroll, 16);
    };

    window.addEventListener('scroll', debounced);
    onScroll();
    return () => {
      window.removeEventListener('scroll', debounced);
      clearTimeout(window.__tocTimeout);
    };
  }, [headings, activeHeading, loading, activeTab]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 96, behavior: 'smooth' });
    setActiveHeading(sectionId);
    setTocOpen(false);
  };

  // Actions
  const toggleBookmark = () => setIsBookmarked((s) => !s);
  const handlePrint = () => window.print();
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: policy?.title || 'Policy', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (e) { /* no-op */ }
  };

  if (loading) return <SkeletonLoader />;
  if (!policy) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden font-jakarta">
        <CosmicBackground />
        <p className="relative z-10 text-gray-400 text-lg">Policy not found.</p>
      </div>
    );
  }

  const category = policyCategories.find(c => c.id === policy.category) || { name: 'Other' };
  const getPolicyLink = () => `/${(user?.role || 'employee')}/public/policies`;

  /* ------------------------------- Sections ------------------------------ */
  const Overview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#161616] to-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] grid sm:grid-cols-2 gap-4 text-sm">
        <Meta icon={<DocumentIcon className="h-4 w-4 text-blue-400" />} label="Category" value={category.name} />
        <Meta icon={<CalendarIcon className="h-4 w-4 text-green-400" />} label="Updated" value={new Date(policy.lastUpdated).toLocaleDateString()} />
        <Meta icon={<VersionIcon className="h-4 w-4 text-yellow-400" />} label="Version" value={`v${policy.version}`} />
        <Meta icon={<CalendarIcon className="h-4 w-4 text-blue-400" />} label="Effective" value={policy.effectiveDate} />
        <Meta icon={<PeopleIcon className="h-4 w-4 text-purple-400" />} label="Applies To" value={policy.appliesTo} />
        <Meta icon={<PersonIcon className="h-4 w-4 text-green-400" />} label="Owner" value={policy.owner} />
        <Meta icon={<ListIcon className="h-4 w-4 text-orange-400" />} label="Type" value={policy.documentType} />
      </div>

      <SectionCard title="Overview">
        <div className="prose prose-invert max-w-none text-gray-300">
          {policy.summary ? (
            <p className="leading-relaxed">{policy.summary}</p>
          ) : (
            <p className="leading-relaxed">This policy outlines key expectations, responsibilities, and procedures. Use the tabs above to read details, access resources, contact the owner, and review revisions.</p>
          )}
          {policy.keyPoints?.length ? (
            <ul className="mt-4 list-disc pl-5">
              {policy.keyPoints.map((p, i) => <li key={i} className="mb-1">{p}</li>)}
            </ul>
          ) : null}
        </div>
      </SectionCard>

      {!!(policy.relatedPolicies?.length) && (
        <SectionCard title="Related Policies">
          <div className="flex flex-wrap gap-2">
            {policy.relatedPolicies.map((rp, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-[#161616]/70 border border-[#2a2a2a] text-sm text-gray-300">{rp}</span>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );

  const PolicyView = () => (
    <div className="prose prose-invert prose-blue max-w-none leading-relaxed text-gray-300
      [&_h2]:font-bold [&_h2]:text-white [&_h2]:border-l-4 [&_h2]:border-blue-500 [&_h2]:pl-4 [&_h2]:mb-4 [&_h2]:mt-8
      [&_h3]:font-semibold [&_h3]:text-blue-200 [&_h3]:mt-6 [&_h3]:mb-3
      [&_p]:text-gray-300 [&_p]:text-base [&_p]:mb-4
      [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2
      [&_strong]:text-white [&_em]:text-blue-200 [&_code]:bg-gray-800 [&_code]:text-blue-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm
      [&_a]:text-blue-400 hover:[&_a]:text-blue-300"
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: policy.processedContent }}
    />
  );

  const Resources = () => (
    <div className="space-y-6">
      <SectionCard title="Documents & Downloads" subtitle="PDFs, spreadsheets, and reference files">
        {policy.attachments?.length ? (
          <div className="space-y-3">
            {policy.attachments.map((file, i) => (
              <div key={i}
                   className="flex items-center justify-between p-4 bg-[#161616]/60 rounded-lg border border-[#2a2a2a] hover:bg-[#1a1a1a] transition">
                <div className="flex items-center gap-3 min-w-0">
                  <DocumentTextIcon className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-200 truncate">{file.name}</span>
                </div>
                <a href={file.url || '#'} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 px-3 py-1 rounded hover:bg-blue-500/10">
                  <DownloadIcon className="h-4 w-4" /> Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No files attached.</p>
        )}
      </SectionCard>

      <SectionCard title="Links" subtitle="Helpful references and related sites">
        {policy.relatedLinks?.length ? (
          <ul className="space-y-3">
            {policy.relatedLinks.map((lnk, i) => (
              <li key={i} className="flex items-center gap-3">
                <LinkIcon className="h-4 w-4 text-blue-400 shrink-0" />
                <a className="text-blue-400 hover:text-blue-300 underline break-all" href={lnk.url} target="_blank" rel="noreferrer">
                  {lnk.label || lnk.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No external links added.</p>
        )}
      </SectionCard>
    </div>
  );

  const Contact = () => (
    <SectionCard title="Contact HR / Policy Owner" subtitle="Send a quick query">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={(e) => { e.preventDefault(); alert('Thanks! Your message was sent.'); }}
      >
        <div className="sm:col-span-1">
          <label className="block text-sm text-gray-400 mb-1">Your Name</label>
          <input type="text" required className="w-full rounded-lg bg-[#141414] border border-[#2a2a2a] px-3 py-2 text-gray-100 outline-none focus:border-blue-600" defaultValue={user?.name || ''} />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input type="email" required className="w-full rounded-lg bg-[#141414] border border-[#2a2a2a] px-3 py-2 text-gray-100 outline-none focus:border-blue-600" defaultValue={user?.email || ''} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Topic</label>
          <input type="text" className="w-full rounded-lg bg-[#141414] border border-[#2a2a2a] px-3 py-2 text-gray-100 outline-none focus:border-blue-600" placeholder="e.g., Clarification about retaliation process" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Message</label>
          <textarea rows={5} className="w-full rounded-lg bg-[#141414] border border-[#2a2a2a] px-3 py-2 text-gray-100 outline-none focus:border-blue-600" placeholder="Write your question..." />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <button type="submit" className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
            Send
          </button>
          <a href={policy.ownerEmail ? `mailto:${policy.ownerEmail}` : '#'} className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
            <CallIcon className="h-4 w-4" /> Email Policy Owner
          </a>
        </div>
      </form>
    </SectionCard>
  );

  const Revisions = () => (
    <SectionCard title="Revision History" subtitle="Changes across versions">
      {policy.revisions?.length ? (
        <div className="overflow-hidden rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-sm">
            <thead className="bg-[#121212]">
              <tr className="text-left text-gray-300">
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">By</th>
              </tr>
            </thead>
            <tbody>
              {policy.revisions.map((r, i) => (
                <tr key={i} className="border-t border-[#2a2a2a] text-gray-300">
                  <td className="px-4 py-3">{r.version}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">{r.summary}</td>
                  <td className="px-4 py-3">{r.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="text-gray-400">No revision history available.</p>}
    </SectionCard>
  );

  /* ------------------------------ UI Helpers ----------------------------- */
  function Meta({ icon, label, value }) {
    return (
      <div className="flex items-center gap-2">
        {icon}
        <strong className="text-white">{label}:</strong>
        <span className="text-gray-300">{value || '-'}</span>
      </div>
    );
  }

  function SectionCard({ title, subtitle, children }) {
    return (
      <section className="bg-[#1e1e1e]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] shadow-2xl shadow-black/50 hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mb-4">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }
// 
  /* -------------------------------- Render ------------------------------- */
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative font-jakarta">
      {/* <CosmicBackground /> */}

      {/* Top crumbs / header */}
      <header className="bg-[#111111]/80 backdrop-blur-lg border-b border-[#2a2a2a] shadow-lg sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-[#1e1e1e] transition group"
              aria-label="Back"
            >
              <ArrowLeftIcon className="h-5 w-5 group-hover:text-blue-400" />
            </button>
            <span className="text-gray-600">/</span>
            <Link to={getPolicyLink()} className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Policies
            </Link>
            <span className="text-gray-600">/</span>
            <span className="font-semibold truncate text-white">{policy.title}</span>
          </div>
        </div>

        {/* Actions row */}
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
              <PrinterIcon className="h-4 w-4" /> Print
            </button>
            <button onClick={toggleBookmark}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition 
              ${isBookmarked ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-yellow-500/30' : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#404040]'}`}>
              <BookmarkIcon className="h-4 w-4" /> {isBookmarked ? 'Saved' : 'Save'}
            </button>
            <button onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] text-gray-300 border border-[#404040] rounded-lg text-sm hover:bg-[#3a3a3a]">
              <ShareIcon className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* Tabs (sticky) */}
        <div className="border-t border-[#2a2a2a] bg-[#0f0f0f]/80 backdrop-blur sticky top-[56px] z-40">
          <div className="max-w-7xl mx-auto px-2">
            <div className="flex items-center justify-between">
              <nav className="flex overflow-x-auto scrollbar-thin gap-1 py-2">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
                      ${activeTab === tab
                        ? 'bg-blue-600 text-white shadow-blue-500/30 shadow'
                        : 'text-gray-300 hover:text-white hover:bg-[#1c1c1c] border border-transparent'}`}
                    aria-current={activeTab === tab ? 'page' : undefined}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              {/* Mobile TOC trigger (only in Policy tab and if headings) */}
              {activeTab === 'Policy' && headings.length > 0 && (
                <button
                  onClick={() => setTocOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[#1c1c1c] text-gray-200 border border-[#2a2a2a] mr-1"
                >
                  <MenuIcon className="h-4 w-4" /> Contents
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 py-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar (TOC) — desktop only & Policy tab */}
          {activeTab === 'Policy' && headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-[128px] bg-[#1e1e1e]/80 backdrop-blur-lg p-5 rounded-xl border border-[#2a2a2a] shadow-xl shadow-black/50">
                <h2 className="text-sm font-bold flex items-center mb-3 text-white uppercase tracking-wider">
                  <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-400" />
                  Table of Contents
                </h2>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-600">
                  {headings.map(h => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition truncate
                        ${activeHeading === h.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-blue-500/30 shadow border-l-2 border-blue-300'
                          : 'text-gray-300 hover:bg-[#2a2a2a]/60 hover:text-white' }
                        ${h.level === 3 ? 'ml-4 text-xs' : ''}`}
                    >
                      {h.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Content column */}
          <div className={`${activeTab === 'Policy' && headings.length > 0 ? 'lg:col-span-3' : 'col-span-full'}`}>
            {/* Title & meta */}
            <article className="bg-[#1e1e1e]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] shadow-2xl shadow-black/50 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {policy.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2 bg-[#141414]/60 px-3 py-1.5 rounded-lg">
                    <DocumentIcon className="h-4 w-4 text-blue-400" />
                    <strong className="text-white">{category.name}</strong>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#141414]/60 px-3 py-1.5 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-green-400" />
                    Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#141414]/60 px-3 py-1.5 rounded-lg">
                    <VersionIcon className="h-4 w-4 text-yellow-400" />
                    v{policy.version}
                  </span>
                </div>

                {/* Tab content */}
                <div className="mt-6">
                  {activeTab === 'Overview' && <Overview />}
                  {activeTab === 'Policy' && <PolicyView />}

                  {activeTab === 'Resources' && <Resources />}
                  {activeTab === 'Contact' && <Contact />}
                  {activeTab === 'Revisions' && <Revisions />}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Mobile TOC Drawer */}
      {activeTab === 'Policy' && headings.length > 0 && (
        <div
          className={`fixed inset-0 z-50 lg:hidden transition ${
            tocOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden={!tocOpen}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity ${tocOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setTocOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[#141414] border-l border-[#2a2a2a] p-5
            transition-transform ${tocOpen ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog" aria-modal="true" aria-label="Table of contents"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-blue-400" /> Contents
              </h3>
              <button onClick={() => setTocOpen(false)} aria-label="Close contents"
                className="p-2 rounded-lg hover:bg-[#1f1f1f]">
                <CloseIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <nav className="space-y-1">
              {headings.map(h => (
                <button
                  key={h.id}
                  onClick={() => scrollToSection(h.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition truncate
                    ${activeHeading === h.id ? 'bg-blue-600 text-white font-semibold' : 'text-gray-300 hover:bg-[#1f1f1f]' }
                    ${h.level === 3 ? 'ml-4 text-xs' : ''}`}
                >
                  {h.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Global scrollbar tweaks */}
      <style jsx global>{`
        .scrollbar-thin{ scrollbar-width:thin; }
        .scrollbar-thin::-webkit-scrollbar{ height:8px; width:8px }
        .scrollbar-thin::-webkit-scrollbar-thumb{ background:#4b5563; border-radius:6px }
        .scrollbar-thin::-webkit-scrollbar-track{ background:transparent }

        @media (prefers-reduced-motion: reduce){
          .animate-twinkle,.animate-float-sparkle,.animate-pulse-drift,.animate-drift-slow,.animate-drift-reverse,.animate-scale-pulse { animation:none !important; }
        }
      `}</style>
    </div>
  );
}
