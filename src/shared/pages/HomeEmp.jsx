// src/pages/employee/HomeEmployee.jsx
import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Route, Book, User, Clock, Lightbulb, Trophy,
  Calendar, FileText, ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react';
import { FaTasks, FaGraduationCap, FaChartLine, FaUmbrellaBeach, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomeEmployee = () => {
  const { user } = useAuth();

  /* ---------------- STATE ---------------- */
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [currentSuggestionSlide, setCurrentSuggestionSlide] = useState(0);

  /* ---------------- AUTO-SCROLLERS (pause if user prefers reduced motion) ---------------- */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(
      () => setCurrentAnnouncementIndex(i => (i === announcements.length - 1 ? 0 : i + 1)),
      5000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(
      () => setCurrentSuggestionSlide(i =>
        i === Math.ceil(timelySuggestions.length / 3) - 1 ? 0 : i + 1
      ),
      6000
    );
    return () => clearInterval(id);
  }, []);

  /* ---------------- STATIC DATA ---------------- */
  const quickActions = [
    'Required Learning', 'Feedback HUB', 'Priorities Homepage',
    'Create Digital CV/Resume', 'Skills Engine', 'Performance Review'
  ];

  const awaitingActions = [
    {
      icon: MessageCircle, iconBg: 'bg-blue-600/20', iconColor: 'text-blue-400',
      title: 'Give Feedback: KASTURI VIKRAM', subtitle: 'My Tasks • 4 months ago', priority: 'normal'
    },
    {
      icon: User, iconBg: 'bg-green-600/20', iconColor: 'text-green-400',
      title: 'Clean Hands Conversation with New Joiner',
      subtitle: 'Packaged App Development Senior Analyst • 5 months ago', priority: 'normal'
    },
    {
      icon: Route, iconBg: 'bg-purple-600/20', iconColor: 'text-purple-400',
      title: 'You Have 2 Assigned Journeys',
      subtitle: 'Priorities & Reflections Journey • FY25 Prepare For Year-End', priority: 'high'
    },
    {
      icon: Book, iconBg: 'bg-red-600/20', iconColor: 'text-red-400',
      title: 'Required Learning Due', subtitle: 'DUE 23/12/2024', priority: 'urgent'
    }
  ];

  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=160&h=160&fit=crop&crop=center',
      title: 'Jobs Gateway is now integrated with Workday',
      description: 'Tailor your resume to the roles that matter.'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=160&h=160&fit=crop&crop=center',
      title: 'New Learning Platform Launch',
      description: 'Discover enhanced learning experiences on our updated platform.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=160&h=160&fit=crop&crop=center',
      title: 'Q4 Performance Reviews Starting',
      description: 'Prepare your achievements and goals for the upcoming cycle.'
    }
  ];

  const timelySuggestions = [
    {
      icon: Lightbulb, iconBg: 'bg-yellow-600/20', iconColor: 'text-yellow-400',
      title: 'Complete Your Skills Assessment',
      description: 'Update your skill profile to get personalized recommendations',
      action: 'Start Assessment'
    },
    {
      icon: Trophy, iconBg: 'bg-orange-600/20', iconColor: 'text-orange-400',
      title: 'Career Development Workshop',
      description: 'Join the leadership session—register by Friday',
      action: 'Register Now'
    },
    {
      icon: Calendar, iconBg: 'bg-indigo-600/20', iconColor: 'text-indigo-400',
      title: 'Q4 Performance Review Prep',
      description: 'Gather achievements and feedback for year-end review',
      action: 'View Guide'
    },
    {
      icon: FileText, iconBg: 'bg-purple-600/20', iconColor: 'text-purple-400',
      title: 'Update Your Profile',
      description: 'Keep professional info current for better opportunities',
      action: 'Update Now'
    },
    {
      icon: Book, iconBg: 'bg-blue-600/20', iconColor: 'text-blue-400',
      title: 'New Compliance Training',
      description: 'Complete compulsory security modules by month-end',
      action: 'Start Training'
    },
    {
      icon: TrendingUp, iconBg: 'bg-green-600/20', iconColor: 'text-green-400',
      title: 'Goal Setting Session',
      description: 'Define Q1 OKRs with your manager',
      action: 'Schedule Meeting'
    }
  ];

  /* ---------------- COSMIC BACKGROUND ---------------- */
  const cosmicStyles = {
    background: `
      radial-gradient(circle at 20% 50%, rgba(37,99,235,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(107,114,128,0.04) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(37,99,235,0.03) 0%, transparent 50%),
      #000000
    `
  };

  return (
    <div
      className="
        min-h-screen font-['Plus_Jakarta_Sans'] text-white
        text-[13px] sm:text-sm md:text-base
      "
      style={cosmicStyles}
    >
      {/* HERO (kept hidden as in your original) */}
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-8 pt-16 pb-20 lg:py-32 hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2800"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16">
          <div className="max-w-2xl">
            <h1
              className="inline-block text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent"
              style={{ background: 'linear-gradient(90deg,#ff6600 0%,#ffffff 50%,#0066ff 100%)' }}
            >
              Hello, {user?.name || 'Team Member'}
            </h1>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
              Welcome to your{' '}
              <span className="bg-clip-text text-transparent font-semibold" style={{ background: 'linear-gradient(90deg,#4f46e5 0%,#7c3aed 100%)' }}>
                cosmic HR workspace
              </span>
              . Manage tasks, learning and performance—all in one place.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Link
                to="/employee/dashboard"
                className="px-5 py-2.5 rounded-full font-medium text-sm sm:text-base bg-[#2563eb] hover:bg-[#1d4ed8] transition shadow-lg hover:shadow-blue-500/40"
              >
                Go to Dashboard
              </Link>
              <button className="px-5 py-2.5 rounded-full text-sm sm:text-base border border-gray-600 text-gray-300 hover:text-white hover:border-white transition">
                View Policies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LET’S FOCUS ON YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 lg:py-16 grid lg:grid-cols-3 gap-6 lg:gap-10 font-jakarta">
        {/* Column 1 & 2 */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
          {/* Banner */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-white bg-clip-text text-transparent">
              Let’s Focus on You
            </h2>
            <p className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-[#1e1e1e] border border-gray-700 whitespace-nowrap">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {quickActions.map((text, i) => (
              <button
                key={i}
                className="
                  px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm
                  text-gray-300 border border-gray-700 rounded-lg
                  bg-[#161616] hover:border-[#2563eb] hover:text-white transition
                "
              >
                {text}
                {i < 4 && <FaExternalLinkAlt className="inline ml-1.5 sm:ml-2 -mb-0.5 text-[10px] sm:text-xs" />}
              </button>
            ))}
          </div>

          {/* Awaiting Your Action */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Awaiting Your Action</h3>
            {awaitingActions.map((item, i) => (
              <div
                key={i}
                className="
                  flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl
                  bg-[#1e1e1e] border border-gray-700 hover:border-[#2563eb] transition
                "
              >
                <div className={`${item.iconBg} p-2.5 sm:p-3 rounded-xl border border-gray-600/40`}>
                  <item.icon className={`${item.iconColor}`} size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white leading-snug">{item.title}</p>
                  <p className="text-[12px] sm:text-sm text-gray-400">{item.subtitle}</p>
                </div>

                {item.priority === 'urgent' && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs bg-red-800/40 text-red-300 flex items-center gap-1 whitespace-nowrap">
                    <Clock size={12} /> Urgent
                  </span>
                )}
              </div>
            ))}
          </div>

          <Link
            to="#"
            className="inline-flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 text-[#2563eb] hover:text-blue-400 transition text-[12px] sm:text-sm"
          >
            <Clock size={16} /> Go to My Tasks (4)
          </Link>
        </div>

        {/* Column 3 — Announcements */}
        <div className="space-y-3 sm:space-y-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">Announcements</h3>

          {/* Carousel */}
          <div className="relative overflow-hidden rounded-xl border border-gray-700">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentAnnouncementIndex * 100}%)` }}
            >
              {announcements.map((a, i) => (
                <div key={i} className="min-w-full p-4 sm:p-6 bg-[#161616]">
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={a.image}
                      alt=""
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-600"
                    />
                    <div>
                      <p className="font-medium text-white leading-snug">{a.title}</p>
                      <p className="text-[12px] sm:text-sm text-gray-400">{a.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              onClick={() =>
                setCurrentAnnouncementIndex(i => (i === 0 ? announcements.length - 1 : i - 1))
              }
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 text-gray-300"
              aria-label="Previous announcement"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() =>
                setCurrentAnnouncementIndex(i => (i === announcements.length - 1 ? 0 : i + 1))
              }
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 text-gray-300"
              aria-label="Next announcement"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <Link
            to="#"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#2563eb] hover:text-blue-400 transition text-[12px] sm:text-sm"
          >
            <FaExternalLinkAlt size={12} /> View All Apps
          </Link>
        </div>
      </section>

      {/* TIMELY SUGGESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 lg:pb-20 font-jakarta">
        <div className="rounded-2xl border border-gray-700 bg-[#111111] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-white">
              Timely Suggestions
            </h3>
            <div className="space-x-1 sm:space-x-2">
              <button
                onClick={() =>
                  setCurrentSuggestionSlide(i =>
                    i === 0 ? Math.ceil(timelySuggestions.length / 3) - 1 : i - 1
                  )
                }
                className="p-1.5 sm:p-2 rounded-full bg-[#161616] hover:bg-[#1e1e1e] text-gray-300"
                aria-label="Previous suggestions"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setCurrentSuggestionSlide(i =>
                    i === Math.ceil(timelySuggestions.length / 3) - 1 ? 0 : i + 1
                  )
                }
                className="p-1.5 sm:p-2 rounded-full bg-[#161616] hover:bg-[#1e1e1e] text-gray-300"
                aria-label="Next suggestions"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Slides */}
          <div className="overflow-hidden font-jakarta">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSuggestionSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(timelySuggestions.length / 3) }).map((_, slide) => (
                <div key={slide} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {timelySuggestions.slice(slide * 3, slide * 3 + 3).map((s, i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 md:p-6 rounded-xl bg-[#1e1e1e] border border-gray-700 hover:border-[#2563eb] transition"
                    >
                      <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className={`${s.iconBg} p-2.5 sm:p-3 rounded-xl border border-gray-600/40`}>
                          <s.icon className={`${s.iconColor}`} size={20} />
                        </div>
                        <h4 className="text-base sm:text-lg font-medium text-white leading-snug">{s.title}</h4>
                      </div>
                      <p className="text-[12px] sm:text-sm text-gray-400 mb-3 sm:mb-4">{s.description}</p>
                      <button className="text-[12px] sm:text-sm text-[#2563eb] hover:text-blue-400">
                        {s.action} →
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 md:mt-8">
            {Array.from({ length: Math.ceil(timelySuggestions.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSuggestionSlide(i)}
                className={`h-1.5 sm:h-2 rounded-full transition ${
                  i === currentSuggestionSlide ? 'bg-[#2563eb] w-6 sm:w-8' : 'bg-gray-600 w-2'
                }`}
                aria-label={`Go to suggestions slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-black py-12 sm:py-16 lg:py-20 font-jakarta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {[
            { title: 'My Tasks', desc: 'Stay on top of your assignments and deadlines.', icon: FaTasks, color: 'bg-blue-600' },
            { title: 'Learning & Development', desc: 'Access personalized training paths.', icon: FaGraduationCap, color: 'bg-green-600' },
            { title: 'Performance Goals', desc: 'Track progress and celebrate achievements.', icon: FaChartLine, color: 'bg-purple-600' },
            { title: 'Time Off', desc: 'Request and manage your well-deserved breaks.', icon: FaUmbrellaBeach, color: 'bg-orange-600' }
          ].map(card => (
            <div
              key={card.title}
              className="group rounded-2xl border border-gray-700 bg-[#1e1e1e] p-4 sm:p-6 hover:border-[#2563eb] transition"
            >
              <div className={`${card.color} w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl text-white mb-4 sm:mb-6 shadow-lg`}>
                <card.icon size={22} className="sm:hidden" />
                <card.icon size={26} className="hidden sm:block" />
              </div>
              <h4 className="text-base sm:text-xl font-semibold text-white group-hover:text-[#2563eb]">
                {card.title}
              </h4>
              <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-sm text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 text-center bg-[#000000] border-t border-gray-800 font-jakarta">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
          Keep growing in the{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff6600] via-[#ffffff] to-[#0066ff]">
            cosmic workspace
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-10">
          Your journey matters—every step forward illuminates new possibilities.
        </p>
        <Link
          to="/employee/learning"
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3.5 lg:py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-sm sm:text-base lg:text-lg font-medium shadow-lg hover:shadow-blue-500/40 transition"
        >
          <FaGraduationCap /> Start Learning Journey
        </Link>
      </section>
    </div>
  );
};

export default HomeEmployee;
