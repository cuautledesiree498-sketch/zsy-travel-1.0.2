// app/debug/page.tsx - 临时调试页面，列出所有可用的 slug
import Link from 'next/link';
import { getTours, getArticles } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
  const tours = await getTours();
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🔧 Debug Page - Available Slugs</h1>

        {/* 返回首页 */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Home
          </Link>
        </div>

        {/* 旅游套餐列表 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🏔️ Tour Packages ({tours.length})</h2>
          {tours.length > 0 ? (
            <div className="grid gap-4">
              {tours.map((tour: any) => (
                <div key={tour._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        <strong>Slug:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{tour.slug}</code>
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Price:</strong> ${tour.price} | <strong>Duration:</strong> {tour.duration} days
                      </p>
                    </div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 bg-yellow-50 p-4 rounded">No tours found. Please add tours in Sanity CMS.</p>
          )}
        </section>

        {/* 攻略文章列表 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Articles ({articles.length})</h2>
          {articles.length > 0 ? (
            <div className="grid gap-4">
              {articles.map((article: any) => (
                <div key={article._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-green-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        <strong>Slug:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{article.slug}</code>
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Author:</strong> {article.author || 'Unknown'} | <strong>Date:</strong> {new Date(article.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 bg-yellow-50 p-4 rounded">No articles found. Please add articles in Sanity CMS.</p>
          )}
        </section>

        {/* 其他页面链接 */}
        <section className="mt-12 pt-8 border-t border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Other Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-blue-600">
              Home
            </Link>
            <Link href="/about" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-blue-600">
              About
            </Link>
            <Link href="/contact" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-blue-600">
              Contact
            </Link>
            <Link href="/faq" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-blue-600">
              FAQ
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
