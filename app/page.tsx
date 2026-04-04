// app/page.tsx - 动态首页（从 Sanity 读取数据）
import Image from 'next/image';
import Link from 'next/link';
import { getTours, getArticles, getSiteSettings, getHomeSettings, imageUrlFor } from '@/lib/sanity';

// 🚀 关键修复：强制每次请求都重新渲染，不缓存页面
export const dynamic = 'force-dynamic';

// 首页主组件（Server Component）
export default async function Home() {
  // 从 Sanity 动态获取数据
  const tours = await getTours();
  const articles = await getArticles();
  const settings = await getSiteSettings();
  const homeSettings = await getHomeSettings();

  // 使用 homeSettings 中的配置，如果没有则使用默认值
  const heroTitle = homeSettings?.heroTitle || `Discover the Magic of Xinjiang`;
  const heroSubtitle = homeSettings?.heroSubtitle || 'Ancient Silk Road • Stunning Landscapes • Rich Culture';
  const heroImage = homeSettings?.heroImage || settings?.heroImage;
  const showDestinations = homeSettings?.showDestinations !== false;
  const showTours = homeSettings?.showTours !== false;
  const showArticles = homeSettings?.showArticles !== false;

  return (
    <div className="min-h-screen">
      {/* ========== 顶部导航栏 ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏔️</span>
              <h1 className="text-2xl font-bold text-gray-800">
                {settings?.siteTitle || 'Xinjiang Travel'}
              </h1>
            </div>

            {/* 导航菜单 */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#destinations" className="text-gray-700 hover:text-blue-600 font-medium">
                Destinations
              </a>
              <a href="#tours" className="text-gray-700 hover:text-blue-600 font-medium">
                Tour Packages
              </a>
              <a href="#articles" className="text-gray-700 hover:text-blue-600 font-medium">
                Travel Guide
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </a>
            </div>

            {/* CTA 按钮 */}
            <a href="/contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg inline-block">
              Get a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* ========== 主视觉区域（动态背景图） ========== */}
      <main className="relative h-screen flex items-center justify-center">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          {settings?.heroImage ? (
            <Image
              src={imageUrlFor(settings.heroImage, 1600)}
              alt={settings?.siteTitle || 'Xinjiang Landscape'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=1600"
              alt="Xinjiang Landscape"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* 文字内容 */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            {heroTitle}
          </h2>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg text-gray-200">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tours" className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-2xl inline-block">
              Explore Tours
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white/30 transition border-2 border-white inline-block">
              Plan My Trip
            </a>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </main>

      {/* ========== 热门目的地（条件渲染） ========== */}
      {showDestinations && (
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h3>
            <p className="text-xl text-gray-600">Explore the most breathtaking places in Xinjiang</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              name="Kanas Lake"
              description="Kanas Lake - God's Garden"
              image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
            />
            <DestinationCard
              name="Tianchi Lake"
              description="Heavenly Lake of Tianshan Mountains"
              image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
            />
            <DestinationCard
              name="Kashgar Old City"
              description="Pearl of the Silk Road"
              image="https://images.unsplash.com/photo-1590059390239-0d2505f7fa83?w=800"
            />
          </div>
        </div>
      </section>
      )}

      {/* ========== 旅游套餐（条件渲染） ========== */}
      {showTours && (
      <section id="tours" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Featured Tour Packages</h3>
            <p className="text-xl text-gray-600">Handpicked itineraries for unforgettable experiences</p>
          </div>
          {tours && tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tours.map((tour: any) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl">No tour packages available yet.</p>
              <p className="mt-2">Check back soon or contact us for custom tours!</p>
            </div>
          )}
          <div className="text-center mt-12">
            <a href="/debug" className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition inline-block">
              View All Tours →
            </a>
          </div>
        </div>
      </section>
      )}

      {/* ========== 旅游攻略（条件渲染） ========== */}
      {showArticles && (
      <section id="articles" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Travel Guides</h3>
            <p className="text-xl text-gray-600">Tips and stories from the Silk Road</p>
          </div>
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl">No articles yet.</p>
              <p className="mt-2">Stay tuned for travel stories!</p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* ========== 底部 ========== */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 公司信息 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🏔️</span>
                <h4 className="text-xl font-bold">{settings?.siteTitle || 'Xinjiang Travel'}</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted local expert for unforgettable Xinjiang adventures since 2026.
              </p>
            </div>

            {/* 联系方式 */}
            <div>
              <h5 className="text-lg font-bold mb-4">Contact Us</h5>
              <ul className="space-y-3 text-gray-400">
                {settings?.contactEmail && (
                  <li className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{settings.contactEmail}</span>
                  </li>
                )}
                {settings?.contactPhone && (
                  <li className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{settings.contactPhone}</span>
                  </li>
                )}
                {settings?.wechat && (
                  <li className="flex items-center gap-2">
                    <span>💬</span>
                    <span>WeChat: {settings.wechat}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Xinjiang Travel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 目的地卡片组件
function DestinationCard({ name, description, image }: { name: string; description: string; image: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
      <div className="relative h-80">
        <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition duration-500" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h4 className="text-2xl font-bold mb-2">{name}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

// 旅游套餐卡片组件
function TourCard({ tour }: { tour: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition group cursor-pointer">
      <div className="relative h-56">
        <Image src={imageUrlFor(tour.image, 800)} alt={tour.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
        {tour.published && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Available
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {tour.duration} Days
          </span>
        </div>
        <h4 className="text-xl font-bold mb-2 text-gray-800">{tour.title}</h4>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <span className="text-gray-400 line-through text-sm">${tour.price ? tour.price + 99 : '899'}</span>
            <span className="text-3xl font-bold text-blue-600 ml-2">
              ${tour.price || '699'}
            </span>
          </div>
          <a 
            href={`/tours/${tour.slug}`}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold inline-block"
          >
            View →
          </a>
        </div>
      </div>
    </div>
  );
}

// 攻略文章卡片组件
function ArticleCard({ article }: { article: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer">
      <div className="relative h-48">
        <Image src={imageUrlFor(article.mainImage, 600)} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h4>
        {article.author && (
          <p className="text-sm text-gray-500 mb-4">By {article.author}</p>
        )}
        <a 
          href={`/articles/${article.slug}`}
          className="text-blue-600 font-semibold hover:text-blue-700 inline-block"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}