// app/about/page.tsx - 关于我们页面
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Xinjiang Travel',
  description: 'Learn about Xinjiang Travel and our mission to showcase the beauty of Xinjiang.',
};

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">About Xinjiang Travel</h1>
          
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Welcome to Xinjiang Travel, your gateway to discovering the breathtaking landscapes and rich cultural heritage of Xinjiang, China's largest region.
            </p>
            
            <p>
              Founded with a passion for authentic travel experiences, we specialize in curating unforgettable journeys through the ancient Silk Road, pristine mountain ranges, and vibrant local communities.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p>
              To provide travelers with immersive, sustainable, and culturally respectful experiences that showcase the true beauty and diversity of Xinjiang while supporting local communities.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Expert local guides with deep knowledge of Xinjiang</li>
              <li>Customizable tour packages tailored to your interests</li>
              <li>Sustainable and responsible tourism practices</li>
              <li>Competitive pricing with transparent costs</li>
              <li>24/7 customer support during your journey</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              Have questions? We'd love to hear from you! Reach out to our team to start planning your Xinjiang adventure.
            </p>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Get in Touch
              </Link>
            </div>
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
