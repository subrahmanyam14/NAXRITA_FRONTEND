import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, User, Building2, MessageSquare, Send, ChevronLeft, ChevronRight } from 'lucide-react';

// Animated Background Components
const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
          opacity: Math.random() * 0.6 + 0.2,
          twinkleDelay: Math.random() * 3
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animationDelay: `${star.twinkleDelay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

const SparkleEffect = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      const sparkleArray = [];
      for (let i = 0; i < 25; i++) {
        sparkleArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 8
        });
      }
      setSparkles(sparkleArray);
    };

    generateSparkles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-bounce"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: '8s',
            animationIterationCount: 'infinite'
          }}
        />
      ))}
    </div>
  );
};

// Carousel Component
const ContactCarousel = ({ contacts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === contacts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [contacts.length, isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? contacts.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === contacts.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div 
      className="relative bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 backdrop-blur-[10px] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      style={{
        background: 'rgba(30, 30, 30, 0.8)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
      }}
    >
      {/* Carousel Content */}
      <div className="relative h-64 overflow-hidden">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'translate-x-0' : 
              index < currentIndex ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="flex items-start space-x-4 h-full">
              <div className={`p-3 ${contact.bgColor} rounded-xl backdrop-blur-sm`}>
                <contact.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {contact.title}
                </h3>
                <p className="text-sm text-[#a3a3a3] mb-6 font-light">
                  {contact.description}
                </p>
                
                <div className="space-y-4">
                  {contact.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <detail.icon className="w-4 h-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3] font-light">
                        {detail.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#2563eb] hover:bg-[#1d4ed8] p-2 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:opacity-100 opacity-0"
        style={{ width: '40px', height: '40px' }}
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#2563eb] hover:bg-[#1d4ed8] p-2 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:opacity-100 opacity-0"
        style={{ width: '40px', height: '40px' }}
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {contacts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                : 'bg-[#404040] hover:bg-[#6b7280]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const EmployeeContactPage = () => {
  const [formData, setFormData] = useState({
    department: 'Human Resources',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Message sent:', formData);
    setFormData({ 
      department: 'Human Resources',
      subject: '', 
      message: '', 
      priority: 'normal' 
    });
  };

  const contactData = [
    {
      title: 'Human Resources',
      description: 'Employee support and services',
      icon: User,
      bgColor: 'bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]',
      details: [
        { icon: Mail, text: 'hr@naxrita.com' },
        { icon: Phone, text: '+1 (555) 123-4567' },
        { icon: Clock, text: 'Mon-Fri, 9:00-17:00' }
      ]
    },
    {
      title: 'IT Support',
      description: 'Technical assistance and support',
      icon: MessageSquare,
      bgColor: 'bg-gradient-to-br from-[#22c55e] to-[#16a34a]',
      details: [
        { icon: Mail, text: 'support@naxrita.com' },
        { icon: Phone, text: '+1 (555) 123-4568' },
        { icon: Clock, text: '24/7 Support Available' }
      ]
    },
    {
      title: 'Finance Department',
      description: 'Payroll and financial inquiries',
      icon: Building2,
      bgColor: 'bg-gradient-to-br from-[#a855f7] to-[#9333ea]',
      details: [
        { icon: Mail, text: 'finance@naxrita.com' },
        { icon: Phone, text: '+1 (555) 123-4569' },
        { icon: Clock, text: 'Mon-Fri, 8:30-17:30' }
      ]
    },
    {
      title: 'Main Office',
      description: 'Corporate headquarters',
      icon: MapPin,
      bgColor: 'bg-gradient-to-br from-[#f59e0b] to-[#d97706]',
      details: [
        { icon: MapPin, text: '123 Business Street, Suite 400, New York, NY 10001' },
        { icon: Phone, text: '+1 (555) 123-4500' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Background */}
      <StarfieldBackground />
      <SparkleEffect />
      
      {/* Main Content */}
      <div className="relative z-10 p-8" style={{ fontFamily: 'Plus Jakarta Sans' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-white mb-4">
              Contact Directory
            </h1>
            <p className="text-lg text-[#a3a3a3] font-light">
              Internal employee contact information and messaging
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Contact Carousel */}
            <div className="xl:col-span-2">
              <ContactCarousel contacts={contactData} />
              
              {/* Static Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {contactData.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 backdrop-blur-[10px] hover:transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300"
                    style={{
                      background: 'rgba(30, 30, 30, 0.8)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 ${contact.bgColor} rounded-xl backdrop-blur-sm`}>
                        <contact.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">
                          {contact.title}
                        </h3>
                        <p className="text-sm text-[#a3a3a3] mb-4 font-light">
                          {contact.description}
                        </p>
                        
                        <div className="space-y-3">
                          {contact.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <detail.icon className="w-4 h-4 text-[#6b7280]" />
                              <span className="text-sm text-[#a3a3a3] font-light">
                                {detail.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Form */}
            <div className="space-y-6">
              <div
                className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 backdrop-blur-[10px]"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-xl font-medium text-white mb-6">
                  Send Quick Message
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg text-white backdrop-blur-[5px] focus:border-[#2563eb] focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all duration-300"
                    >
                      <option>Human Resources</option>
                      <option>IT Support</option>
                      <option>Finance</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg text-white backdrop-blur-[5px] focus:border-[#2563eb] focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all duration-300"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg text-white backdrop-blur-[5px] focus:border-[#2563eb] focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all duration-300"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg text-white backdrop-blur-[5px] focus:border-[#2563eb] focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all duration-300 resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] flex items-center justify-center space-x-3"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>

              {/* Quick Tips */}
              <div
                className="bg-gradient-to-br from-[#2563eb]/10 to-[#1d4ed8]/5 border border-[#2563eb]/20 rounded-xl p-6 backdrop-blur-[10px]"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h4 className="text-lg font-medium text-[#2563eb] mb-4">
                  Quick Tips
                </h4>
                <ul className="space-y-3 text-sm text-[#a3a3a3]">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-light">For urgent IT issues, call directly</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-light">HR responds within 24-48 hours</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-light">Finance inquiries processed on business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeContactPage;
