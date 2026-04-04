// app/faq/page.tsx - 常见问题页面
import Link from 'next/link';

export const metadata = {
  title: 'FAQ - Xinjiang Travel',
  description: 'Frequently asked questions about our tours and services.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is the best time to visit Xinjiang?',
      answer: 'The best time to visit Xinjiang is from May to October when the weather is mild and pleasant. Summer (July-August) is peak season with warm temperatures, while spring and autumn offer comfortable conditions with fewer crowds.'
    },
    {
      question: 'Do I need a visa to visit Xinjiang?',
      answer: 'Visa requirements depend on your nationality. Most international visitors need a Chinese visa. We recommend checking with your nearest Chinese embassy or consulate for specific requirements. Our team can provide guidance on the visa application process.'
    },
    {
      question: 'What is included in the tour packages?',
      answer: 'Our tour packages typically include accommodation, meals, transportation, and guided tours. Specific inclusions vary by package. Please check the detailed itinerary for each tour to see what\'s included.'
    },
    {
      question: 'Can I customize a tour package?',
      answer: 'Absolutely! We offer custom tour packages tailored to your interests, budget, and schedule. Contact us with your preferences, and our team will create a personalized itinerary for you.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer free cancellation up to 7 days before your tour starts. Cancellations made within 7 days may incur a fee. For specific details, please refer to our terms and conditions or contact our support team.'
    },
    {
      question: 'Is travel insurance recommended?',
      answer: 'Yes, we strongly recommend purchasing travel insurance that covers trip cancellation, medical emergencies, and evacuation. This provides peace of mind and financial protection during your journey.'
    },
    {
      question: 'What should I pack for a Xinjiang tour?',
      answer: 'Pack comfortable walking shoes, weather-appropriate clothing, sunscreen, and a hat. In summer, bring light clothing; in winter, bring warm layers. Don\'t forget a camera, power bank, and any necessary medications.'
    },
    {
      question: 'How many people are in a typical tour group?',
      answer: 'Our tour groups typically range from 2 to 12 people, allowing for a personalized experience while maintaining group dynamics. Larger groups can be accommodated with advance notice.'
    },
    {
      question: 'Do you offer private tours?',
      answer: 'Yes, we offer private tours for individuals, families, or groups. Private tours provide flexibility in scheduling and a more personalized experience. Contact us for pricing and availability.'
    },
    {
      question: 'What languages do your guides speak?',
      answer: 'Our guides are fluent in English and Mandarin Chinese. We can arrange guides in other languages upon request with advance notice.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-2xl font-bold text-gray-800">Xinjiang Travel</h1>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            ← Back Home
          </Link>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="container mx-auto px-4 py-24 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg mb-12">
            Find answers to common questions about our tours, booking process, and travel tips.
          </p>

          {/* FAQ 列表 */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-800 hover:text-blue-600 transition">
                  <span>{faq.question}</span>
                  <span className="text-2xl text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* 联系支持 */}
          <div className="mt-12 pt-8 border-t border-gray-200 bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Didn't find your answer?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Feel free to reach out with any questions.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 Xinjiang Travel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
