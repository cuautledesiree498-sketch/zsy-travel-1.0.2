'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '@/lib/sanity';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-2xl font-bold text-gray-800">{settings?.siteTitle || 'Xinjiang Travel'}</h1>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">← Back Home</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24 mt-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg mb-8">Have questions about our tours? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>

          {submitted && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"><p className="text-green-700 font-semibold">✓ Thank you! Your message has been sent successfully.</p><p className="text-green-600 text-sm mt-1">We'll contact you shortly.</p></div>}

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
            <div><label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name *</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="John Doe" /></div>
            <div><label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="john@example.com" /></div>
            <div><label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="+1 (555) 123-4567" /></div>
            <div><label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject *</label><select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"><option value="">Select a subject...</option><option value="tour-inquiry">Tour Inquiry</option><option value="booking-question">Booking Question</option><option value="custom-package">Custom Package Request</option><option value="feedback">Feedback</option><option value="other">Other</option></select></div>
            <div><label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" placeholder="Tell us more about your inquiry..." /></div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400">{loading ? 'Sending...' : 'Send Message'}</button>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg"><div className="text-3xl mb-2">📧</div><h3 className="font-semibold text-gray-800 mb-1">Email</h3><p className="text-gray-600">{settings?.contactEmail || 'info@example.com'}</p></div>
            <div className="text-center p-6 bg-gray-50 rounded-lg"><div className="text-3xl mb-2">📱</div><h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3><p className="text-gray-600">{settings?.contactPhone || settings?.whatsappNumber || '+86 123 4567 8900'}</p></div>
            <div className="text-center p-6 bg-gray-50 rounded-lg"><div className="text-3xl mb-2">📍</div><h3 className="font-semibold text-gray-800 mb-1">Location</h3><p className="text-gray-600">{settings?.address || 'Urumqi, Xinjiang, China'}</p></div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12"><div className="container mx-auto px-4 text-center text-gray-500"><p>&copy; 2026 {settings?.siteTitle || 'Xinjiang Travel'}. All rights reserved.</p></div></footer>
    </div>
  );
}
