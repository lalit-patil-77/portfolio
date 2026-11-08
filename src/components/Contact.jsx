import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

const contactInfo = [
  { icon: User, label: 'Lalit Patil', color: 'text-red-500', href: null },
  {
    icon: Phone,
    label: '+91 7447746511',
    color: 'text-purple-500',
    href: 'tel:+917447746511',
    hoverColor: 'hover:text-purple-400',
  },
  {
    icon: Mail,
    label: 'patillalit215@gmail.com',
    color: 'text-blue-500',
    href: 'mailto:patillalit215@gmail.com',
    hoverColor: 'hover:text-blue-400',
  },
  {
    icon: MapPin,
    label: 'Jalgaon, Maharashtra, India',
    color: 'text-cyan-500',
    href: null,
  },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/lalit-patil-77', label: 'GitHub' },
  { icon: Mail, href: 'mailto:patillalit215@gmail.com', label: 'Email' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(
      'Thank you for your message! This form is for demonstration purposes. Please contact me directly via email.'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const inputClasses =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition';

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
          Let's Work Together
        </h2>
        <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
          Have an interesting project or opportunity? Let's connect and create
          something amazing.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        {/* Left Column - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
            <h3 className="text-xl font-display font-bold text-white mb-6">
              Contact Information
            </h3>

            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              const content = (
                <div key={index} className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-gray-300 ${item.hoverColor || ''} transition-colors`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.label}</span>
                  )}
                </div>
              );
              return content;
            })}

            {/* Social Links */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-all duration-300 hover:border-white/40"
                  >
                    <SocialIcon className="w-4 h-4 text-gray-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
