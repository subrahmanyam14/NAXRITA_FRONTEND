import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, Building2, MessageSquare, Send } from 'lucide-react';

const EmployeeContactPage = () => {
  const [formData, setFormData] = useState({
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
    // Handle form submission logic here
    setFormData({ subject: '', message: '', priority: 'normal' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-gray-900 mb-2">Contact Directory</h1>
          <p className="text-sm text-gray-600 font-normal">Internal employee contact information and messaging</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* HR Department */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-gray-900 mb-1">Human Resources</h3>
                    <p className="text-xs text-gray-500 mb-4">Employee support and services</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">hr@company.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">Mon-Fri, 9:00-17:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IT Support */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-gray-900 mb-1">IT Support</h3>
                    <p className="text-xs text-gray-500 mb-4">Technical assistance and support</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">support@company.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">+1 (555) 123-4568</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">24/7 Support Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finance */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Building2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-gray-900 mb-1">Finance Department</h3>
                    <p className="text-xs text-gray-500 mb-4">Payroll and financial inquiries</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">finance@company.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">+1 (555) 123-4569</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">Mon-Fri, 8:30-17:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-gray-900 mb-1">Main Office</h3>
                    <p className="text-xs text-gray-500 mb-4">Corporate headquarters</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                        <div className="text-xs text-gray-600 font-normal">
                          <div>123 Business Street</div>
                          <div>Suite 400</div>
                          <div>New York, NY 10001</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-normal">+1 (555) 123-4500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-normal text-gray-900 mb-4">Send Quick Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-normal text-gray-700 mb-2">Department</label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Human Resources</option>
                    <option>IT Support</option>
                    <option>Finance</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-normal text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-gray-700 mb-2">Priority</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-normal text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-normal py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h4 className="text-xs font-normal text-blue-900 mb-3">Quick Tips</h4>
              <ul className="space-y-2 text-xs text-blue-800">
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="font-normal">For urgent IT issues, call directly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="font-normal">HR responds within 24-48 hours</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="font-normal">Finance inquiries processed on business days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeContactPage;