// app/tours/[slug]/page.tsx - 旅游套餐详情页
import Image from 'next/image';
import Link from 'next/link';
import { getTourBySlug, getTours, imageUrlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 动态生成页面标题
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  return {
    title: tour ? `${tour.title} - Xinjiang Travel` : 'Tour Not Found',
    description: tour?.description || '',
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-2xl font-bold text-gray-800">Xinjiang Travel</h1>
          </Link>
          <Link href="/#tours" className="text-gray-700 hover:text-blue-600 font-medium">
            ← Back to Tours
          </Link>
        </div>
      </nav>

      {/* 封面图 */}
      <div className="relative h-[50vh] mt-16">
        <Image
          src={imageUrlFor(tour.image, 1600)}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tour.title}</h1>
            <div className="flex items-center gap-4 text-white">
              <span className="bg-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">
                {tour.duration} Days
              </span>
              <span className="text-3xl font-bold">${tour.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左侧：详情 */}
          <div className="lg:col-span-2 space-y-10">
            {/* 简介 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{tour.description}</p>
            </section>

            {/* 亮点 */}
            {tour.highlights && tour.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Highlights</h2>
                <ul className="space-y-3">
                  {tour.highlights.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-600 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 每日行程 */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        Day {day.day}
                      </div>
                      <div className="flex-1 pb-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 右侧：预订卡片 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <span className="text-gray-400 line-through text-lg">${tour.price ? tour.price + 99 : '899'}</span>
                <div className="text-4xl font-bold text-blue-600 mt-1">${tour.price || '699'}</div>
                <p className="text-gray-500 mt-1">per person</p>
              </div>
              <div className="space-y-3 mb-6 text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Duration</span>
                  <span className="font-semibold">{tour.duration} Days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Group Size</span>
                  <span className="font-semibold">2-12 People</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Availability</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                Book Now
              </button>
              <p className="text-center text-gray-400 text-sm mt-3">Free cancellation up to 7 days before</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 Xinjiang Travel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
