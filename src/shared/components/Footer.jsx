import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Heart,
  Star
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press & Media', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ],
    services: [
      { name: 'HR Management', href: '/services/hr' },
      { name: 'Employee Analytics', href: '/services/analytics' },
      { name: 'Performance Management', href: '/services/performance' },
      { name: 'Compliance Solutions', href: '/services/compliance' },
      { name: 'Training & Development', href: '/services/training' }
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Blog', href: '/blog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
      { name: 'Security', href: '/security' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[#2a2a2a] font-jakarta overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Starfield */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            />
          ))}
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <Star
                size={Math.random() * 8 + 4}
                className="text-[#2563eb] opacity-40"
                fill="currentColor"
              />
            </div>
          ))}
        </div>

        {/* Animated Dots */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: ['rgba(37, 99, 235, 0.2)', 'rgba(163, 163, 163, 0.1)', 'rgba(107, 114, 128, 0.08)'][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#111111] to-[#1a1a1a] border-b border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated with Nexrita</h3>
                <p className="text-[#a3a3a3] text-lg">Get the latest insights on HR technology and workforce management.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full lg:w-80 px-4 py-3 bg-[#161616] border border-[#404040] rounded-xl text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition-all duration-300"
                  />
                  <Mail className="absolute right-4 top-3.5 h-5 w-5 text-[#6b7280]" />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2">
                  <Send size={16} />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                  alt="Nexrita Logo"
                  className="h-10 w-auto"
                  onError={(e) => {e.target.style.display = 'none';}}
                />
                <h2 className="text-2xl font-bold text-white tracking-tight">Nexrita</h2>
              </div>
              <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">
                Empowering organizations with innovative HR technology solutions. We help businesses manage their workforce efficiently while fostering growth and success.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-[#a3a3a3]">
                  <div className="p-2 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                    <Mail size={14} className="text-[#2563eb]" />
                  </div>
                  <span>contact@nexrita.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[#a3a3a3]">
                  <div className="p-2 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                    <Phone size={14} className="text-[#2563eb]" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[#a3a3a3]">
                  <div className="p-2 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                    <MapPin size={14} className="text-[#2563eb]" />
                  </div>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-3 bg-[#161616] hover:bg-[#1e1e1e] border border-[#2a2a2a] hover:border-[#404040] rounded-lg transition-all duration-300 text-[#a3a3a3] ${social.color} hover:shadow-lg hover:shadow-black/20 group`}
                      aria-label={social.name}
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#a3a3a3] hover:text-white text-sm transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2563eb]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#a3a3a3] hover:text-white text-sm transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2563eb]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#a3a3a3] hover:text-white text-sm transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2563eb]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#a3a3a3] hover:text-white text-sm transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2563eb]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications & Trust Badges */}
          <div className="border-t border-[#2a2a2a] pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#161616] rounded-xl border border-[#2a2a2a] flex items-center justify-center mb-2">
                    <span className="text-xs text-[#2563eb] font-bold">ISO</span>
                  </div>
                  <p className="text-xs text-[#6b7280]">ISO 27001</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#161616] rounded-xl border border-[#2a2a2a] flex items-center justify-center mb-2">
                    <span className="text-xs text-[#22c55e] font-bold">SOC</span>
                  </div>
                  <p className="text-xs text-[#6b7280]">SOC 2 Type II</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#161616] rounded-xl border border-[#2a2a2a] flex items-center justify-center mb-2">
                    <span className="text-xs text-[#f59e0b] font-bold">GDPR</span>
                  </div>
                  <p className="text-xs text-[#6b7280]">GDPR Ready</p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-[#a3a3a3] mb-1">Trusted by 10,000+ companies worldwide</p>
                <div className="flex items-center justify-center md:justify-end space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#f59e0b] fill-current" />
                  ))}
                  <span className="text-sm text-[#a3a3a3] ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#2a2a2a] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-sm text-[#6b7280]">
                <p>&copy; {currentYear} Nexrita. All rights reserved.</p>
                <span className="hidden md:inline">•</span>
                <p className="hidden md:inline">Leading the charge with CMMI DEV Level-3 ISO 9001 and ISO 27001 Certifications</p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-[#a3a3a3]">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 fill-current animate-pulse" />
                <span>for the future of work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes cosmicFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-cosmic-float {
          animation: cosmicFloat 8s ease-in-out infinite;
        }
        
        .animate-cosmic-pulse {
          animation: cosmicPulse 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
