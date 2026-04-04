import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FAQ - Xinjiang Travel',
  description: 'Frequently asked questions about our tours and services.',
};

export default async function FAQPage() {
  const settings = await getSiteSettings();
  const faqs = settings?.faqItems?.length
    ? settings.faqItems
    : [
        { question: 'What is the best time to visit Xinjiang?', answer: 'The best time to visit Xinjiang is from May to October when the weather is mild and pleasant.' },
        { question: 'Do I need a visa to visit Xinjiang?', answer: 'Visa requirements depend on your nationality. Please check with the nearest Chinese embassy or consulate.' },
        { question: 'Can I customize a tour package?', answer: 'Absolutely! We offer custom tour packages tailored to your interests, budget, and schedule.' },
      ];

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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{settings?.faqTitle || 'Frequently Asked Questions'}</h1>
          <p className="text-gray-600 text-lg mb-12">{settings?.faqSubtitle || 'Find answers to common questions about our tours, booking process, and travel tips.'}</p>

          <div className="space-y-6">
            {faqs.map((faq: any, index: number) => (
              <details key={index} className="group bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-800 hover:text-blue-600 transition">
                  <span>{faq.question}</span>
                  <span className="text-2xl text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200">{faq.answer}</div>
              </details>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Didn't find your answer?</h2>
            <p className="text-gray-600 mb-6">Our support team is here to help. Feel free to reach out with any questions.</p>
            <Link href="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Contact Us</Link>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12"><div className="container mx-auto px-4 text-center text-gray-500"><p>&copy; 2026 {settings?.siteTitle || 'Xinjiang Travel'}. All rights reserved.</p></div></footer>
    </div>
  );
}
