import React, { useEffect, useMemo, useState } from 'react';
import {
  Users, FileText, BarChart3, Book, Shield, Calendar, Clock,
  AlertCircle, TrendingUp, Award, ChevronLeft, ChevronRight,
  Play, Pause
} from 'lucide-react';

const AdminHomepage = () => {
  const user = { name: 'Sarah Johnson', role: 'Admin' };

  // ---------------- STATE ----------------
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isAutoPlayingAnnouncements, setIsAutoPlayingAnnouncements] = useState(true);
  const [isAutoPlayingSuggestions, setIsAutoPlayingSuggestions] = useState(true);

  // Responsive slides for Quick Actions
  const [qaSlide, setQaSlide] = useState(0);
  const [qaItemsPerSlide, setQaItemsPerSlide] = useState(1);

  // ---------------- DATA ----------------
  const quickActions = [
    'Employee Management',
    'Compliance Reports',
    'Analytics Dashboard',
    'Policy Updates',
    'Training Modules',
    'Performance Reviews',
    'Team Analytics',
    'HR Tools',
    'System Settings',
    'Audit Logs',
  ];

  const awaitingActions = [
    { icon: Users,   title: 'Approve New Employee Onboarding: John Doe', subtitle: 'Submitted • 3 days ago',            priority: 'high'   },
    { icon: FileText,title: 'Review Monthly Compliance Report',          subtitle: 'Due • in 5 days',                   priority: 'normal' },
    { icon: Calendar,title: 'Schedule Annual Performance Reviews',       subtitle: 'FY25 Performance Review Season',    priority: 'high'   },
    { icon: Book,    title: 'Update Training Modules',                   subtitle: 'DUE 15/08/2025',                    priority: 'urgent' },
    { icon: Shield,  title: 'Security Audit Review',                     subtitle: 'Quarterly review pending',          priority: 'high'   },
  ];

  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=400&fit=crop&crop=center',
      title: 'New HR Policies Effective September 1, 2025',
      description: 'Review and approve updates to company policies for compliance.',
      badge: 'Policy Update',
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop&crop=center',
      title: 'Q3 Performance Analytics Available',
      description: 'Access detailed performance metrics and team insights.',
      badge: 'Analytics',
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop&crop=center',
      title: 'Company All-Hands Meeting',
      description: 'Join us for the quarterly company update and strategy session.',
      badge: 'Meeting',
    },
    {
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=400&fit=crop&crop=center',
      title: 'New Employee Benefits Package',
      description: 'Enhanced benefits package now available for all team members.',
      badge: 'Benefits',
    },
  ];

  const timelySuggestions = [
    { icon: Shield,      title: 'Compliance Audit Preparation', description: 'Review audit checklist and ensure all documentation is ready', action: 'Start Preparation', progress: 75 },
    { icon: TrendingUp,  title: 'Team Performance Analytics',   description: 'New insights available for Q3 performance trends and metrics', action: 'View Analytics',   progress: 90 },
    { icon: Award,       title: 'Employee Recognition Program', description: 'Launch the monthly recognition program for outstanding performers', action: 'Launch Program', progress: 60 },
    { icon: Calendar,    title: 'Q4 Planning Session',         description: 'Schedule strategic planning sessions for the upcoming quarter', action: 'Schedule Now',     progress: 30 },
  ];

  // ---------------- HELPERS ----------------
  const chunk = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  // compute items per slide responsively
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setQaItemsPerSlide(1);
      else if (w < 1024) setQaItemsPerSlide(2);
      else setQaItemsPerSlide(3);
      setQaSlide(0);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const qaSlides = useMemo(() => chunk(quickActions, qaItemsPerSlide), [quickActions, qaItemsPerSlide]);

  // ---------------- AUTOPLAY (respect reduced motion) ----------------
  const prefersReduce = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (prefersReduce || !isAutoPlayingAnnouncements) return;
    const id = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcements.length);
      setQaSlide((i) => (i + 1) % qaSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [prefersReduce, isAutoPlayingAnnouncements, announcements.length, qaSlides.length]);

  useEffect(() => {
    if (prefersReduce || !isAutoPlayingSuggestions) return;
    const id = setInterval(() => setSuggestionIndex((i) => (i + 1) % timelySuggestions.length), 6000);
    return () => clearInterval(id);
  }, [prefersReduce, isAutoPlayingSuggestions, timelySuggestions.length]);

  const todayStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // ---------------- COSMIC BG ----------------
  const cosmicBg = {
    background: `
      radial-gradient(circle at 15% 35%, rgba(37,99,235,0.07) 0%, transparent 45%),
      radial-gradient(circle at 85% 20%, rgba(99,102,241,0.05) 0%, transparent 45%),
      radial-gradient(circle at 40% 85%, rgba(59,130,246,0.04) 0%, transparent 50%),
      #000000
    `,
  };

  // 🔧 MOBILE SHELL: lock compact width on mobile, expand on sm+
  const shell = 'mx-auto w-full max-w-[420px] px-2 sm:max-w-7xl sm:px-6 md:px-8';

  return (
    <div
      className="
        min-h-screen font-jakarta text-white
        text-[13px] sm:text-sm md:text-base
      "
      style={cosmicBg}
    >
      {/* Header strip */}
      <div className="border-b border-gray-800/70 bg-black/60 backdrop-blur-sm">
        <div className={`${shell} py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Hello,</span>
            <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              {user?.name || 'Admin'}
            </span>
            <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full border border-gray-700 text-gray-300">
              {user?.role || 'Admin'}
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#111]/80 border border-gray-800 text-gray-400">
            {todayStr}
          </span>
        </div>
      </div>

      {/* Main grid */}
      <section className={`${shell} py-6 sm:py-10 lg:py-14 grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 `}>
        {/* Left (admin focus) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-10 min-w-96 px-2 w-min lg:w-full">
          {/* Focus header + QA controls */}
          <div className="rounded-xl border border-gray-800 bg-[#0b0b0b] p-3 sm:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-gray-600/10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-white">
                  Let’s Focus on Administration
                </h2>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setIsAutoPlayingAnnouncements((v) => !v)}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Toggle announcements autoplay"
                  >
                    {isAutoPlayingAnnouncements ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={() => setQaSlide((s) => (s === 0 ? qaSlides.length - 1 : s - 1))}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Previous quick actions"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setQaSlide((s) => (s + 1) % qaSlides.length)}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Next quick actions"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Quick Actions carousel (responsive 1/2/3 per slide) */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${qaSlide * 100}%)` }}
                >
                  {qaSlides.map((group, gi) => (
                    <div key={gi} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                      {group.map((label, li) => (
                        <button
                          key={li}
                          className="
                            text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg
                            bg-[#121212] border border-gray-700
                            text-gray-300 hover:text-white hover:border-[#2563eb]
                            transition
                          "
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* QA indicators */}
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 ">
                {qaSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQaSlide(i)}
                    className={`h-1.5 sm:h-2 rounded-full transition ${i === qaSlide ? 'bg-[#2563eb] w-6 sm:w-8' : 'bg-gray-600 w-2'}`}
                    aria-label={`Go to quick actions slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Awaiting Your Action */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-xl font-semibold text-white">Awaiting Your Action</h3>
            {awaitingActions.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="
                  flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl
                  bg-[#0f0f0f] border border-gray-800 hover:border-[#2563eb] transition
                "
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-blue-500/40">
                  <item.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white leading-snug">{item.title}</p>
                  <p className="text-[12px] sm:text-sm text-gray-400">{item.subtitle}</p>
                </div>
                <div className="whitespace-nowrap">
                  {item.priority === 'urgent' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs bg-red-800/40 text-red-300 border border-red-600/40 inline-flex items-center gap-1">
                      <Clock size={12} /> Urgent
                    </span>
                  )}
                  {item.priority === 'high' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs bg-yellow-700/30 text-yellow-300 border border-yellow-500/40 inline-flex items-center gap-1">
                      <AlertCircle size={12} /> High
                    </span>
                  )}
                  {item.priority === 'normal' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs bg-green-700/30 text-green-300 border border-green-500/40">
                      Normal
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button className="text-[12px] sm:text-sm text-[#2563eb] hover:text-blue-400 inline-flex items-center gap-1.5 mt-1">
              <Clock size={16} /> Go to My Tasks ({awaitingActions.length})
            </button>
          </div>
        </div>

        {/* Right (Announcements + Suggestions) */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 min-w-96 px-2 w-min lg:w-full">
          {/* Announcements */}
          <div className="rounded-xl border border-gray-800 bg-[#0b0b0b] py-3  overflow-hidden relative lg:max-w-7xl max-w-80 mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 lg:pb-20 font-jakarta">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Announcements
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setAnnouncementIndex((i) => (i === 0 ? announcements.length - 1 : i - 1))}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Prev announcement"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setAnnouncementIndex((i) => (i + 1) % announcements.length)}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Next announcement"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-800">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${announcementIndex * 100}%)` }}
                >
                  {announcements.map((a, i) => (
                    <div key={i} className="min-w-full">
                      <div className="relative">
                        <img src={a.image} alt="" className="w-full h-32 sm:h-40 object-cover" />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[11px] bg-blue-600 text-white">
                          {a.badge}
                        </span>
                      </div>
                      <div className="p-3 sm:p-4 bg-[#121212]">
                        <h4 className="text-sm font-medium text-white leading-snug">{a.title}</h4>
                        <p className="text-[12px] sm:text-sm text-gray-400">{a.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <span className="text-[11px] text-gray-500">
                  {announcementIndex + 1} of {announcements.length}
                </span>
                <div className="flex gap-1">
                  {announcements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setAnnouncementIndex(i)}
                      className={`w-2 h-2 rounded-full transition ${i === announcementIndex ? 'bg-[#2563eb]' : 'bg-gray-600'}`}
                      aria-label={`Go to announcement ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timely Suggestions */}
          <div className="rounded-xl border border-gray-800 bg-[#0b0b0b] py-3  overflow-hidden relative mx-auto lg:max-w-7xl max-w-80  px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 lg:pb-20 font-jakarta">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Timely Suggestions
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setIsAutoPlayingSuggestions((v) => !v)}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Toggle suggestions autoplay"
                  >
                    {isAutoPlayingSuggestions ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button
                    onClick={() => setSuggestionIndex((i) => (i === 0 ? timelySuggestions.length - 1 : i - 1))}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Prev suggestion"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setSuggestionIndex((i) => (i + 1) % timelySuggestions.length)}
                    className="p-1.5 sm:p-2 rounded-lg bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition"
                    aria-label="Next suggestion"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${suggestionIndex * 100}%)` }}
                >
                  {timelySuggestions.map((s, i) => (
                    <div key={i} className="min-w-full p-3 sm:p-4 rounded-lg bg-[#111111] border border-gray-800">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                          <s.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">{s.title}</h4>
                          <p className="text-[12px] sm:text-sm text-gray-400 mb-3">{s.description}</p>

                          {/* Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-gray-400">Progress</span>
                              <span className="text-[11px] text-gray-400">{s.progress}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                                style={{ width: `${s.progress}%` }}
                              />
                            </div>
                          </div>

                          <button className="text-[12px] sm:text-sm text-[#2563eb] hover:text-blue-400">{s.action} →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <span className="text-[11px] text-gray-500">
                  {suggestionIndex + 1} of {timelySuggestions.length}
                </span>
                <div className="flex gap-1">
                  {timelySuggestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSuggestionIndex(i)}
                      className={`w-2 h-2 rounded-full transition ${i === suggestionIndex ? 'bg-[#2563eb]' : 'bg-gray-600'}`}
                      aria-label={`Go to suggestion ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <div className="bg-black/80 border-t border-b border-gray-800">
        <div className={`${shell} py-6 sm:py-8`}>
          <div className="rounded-xl border border-gray-800 bg-[#0d0d0d] p-5 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <img
                  src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png"
                  alt="naxrita"
                  className="h-10 sm:h-12 w-auto"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Leading Innovation • Empowering Teams • Driving Success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-black py-10 sm:py-16">
        <div className={`${shell}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[11px] sm:text-xs text-blue-400 font-semibold tracking-wide uppercase mb-1.5">
              Your Admin Tools
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-blue-300">
              Everything you need to manage your team
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { name: 'Employee Management',  description: 'Onboard, manage, and track employee details.', icon: Users },
              { name: 'Compliance Reports',   description: 'Generate and review compliance reports.',      icon: FileText },
              { name: 'Analytics Dashboard',  description: 'Access real-time insights and analytics.',     icon: BarChart3 },
              { name: 'Policy Updates',       description: 'Manage and update company policies.',          icon: Book },
            ].map((f) => (
              <div
                key={f.name}
                className="
                  group rounded-2xl border border-gray-700 bg-[#1e1e1e]
                  p-4 sm:p-6 hover:border-[#2563eb] transition
                "
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white grid place-items-center shadow-lg">
                  <f.icon size={22} className="sm:hidden" />
                  <f.icon size={26} className="hidden sm:block" />
                </div>
                <h4 className="text-base sm:text-xl font-semibold text-white group-hover:text-[#2563eb]">
                  {f.name}
                </h4>
                <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-sm text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#000] border-t border-gray-800">
        <div className={`${shell} text-center`}>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Drive <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff6600] via-white to-[#0066ff]">Success</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-xl text-gray-300 mb-6 sm:mb-8 px-2 sm:px-0">
            Empower your team, lead with data.
          </p>
          <button className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 lg:px-10 py-2.5 sm:py-3.5 lg:py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-sm sm:text-base lg:text-lg font-medium shadow-lg hover:shadow-blue-500/40 transition">
            <BarChart3 size={18} /> Access Analytics
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminHomepage;
