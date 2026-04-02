import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ========== 顶部导航栏 ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏔️</span>
              <h1 className="text-2xl font-bold text-gray-800">Xinjiang Travel</h1>
            </div>
            
            {/* 导航菜单 */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#destinations" className="text-gray-700 hover:text-blue-600 font-medium">Destinations</a>
              <a href="#tours" className="text-gray-700 hover:text-blue-600 font-medium">Tour Packages</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-600 font-medium">Why Us</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </div>
            
            {/* CTA 按钮 */}
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg">
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* ========== 主视觉区域（大图背景） ========== */}
      <main className="relative h-screen flex items-center justify-center">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=1600"
            alt="Xinjiang Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* 文字内容 */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Discover the Magic of Xinjiang
          </h2>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg text-gray-200">
            Ancient Silk Road • Stunning Landscapes • Rich Culture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-2xl">
              Explore Tours
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white/30 transition border-2 border-white">
              Plan My Trip
            </button>
          </div>
        </div>
        
        {/* 向下滚动提示 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </main>

      {/* ========== 热门目的地 ========== */}
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h3>
            <p className="text-xl text-gray-600">Explore the most breathtaking places in Xinjiang</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 喀纳斯 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
                  alt="Kanas Lake"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Kanas Lake</h4>
                <p className="text-gray-300">"God's Garden" - Alpine pearl lake</p>
              </div>
            </div>

            {/* 天山天池 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
                  alt="Tianchi Lake"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Tianchi Lake</h4>
                <p className="text-gray-300">Heavenly Lake of Tianshan Mountains</p>
              </div>
            </div>

            {/* 喀什古城 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1590059390239-0d2505f7fa83?w=800"
                  alt="Kashgar Old City"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Kashgar Old City</h4>
                <p className="text-gray-300">Pearl of the Silk Road</p>
              </div>
            </div>

            {/* 吐鲁番 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800"
                  alt="Turpan"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Turpan</h4>
                <p className="text-gray-300">Land of Fire • Ancient Uyghur Culture</p>
              </div>
            </div>

            {/* 那拉提草原 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
                  alt="Nalati Grassland"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Nalati Grassland</h4>
                <p className="text-gray-300">"Sky Grassland" - Alpine meadow paradise</p>
              </div>
            </div>

            {/* 独库公路 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                  alt="Duku Highway"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Duku Highway</h4>
                <p className="text-gray-300">Most Beautiful Mountain Road in China</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 旅游套餐 ========== */}
      <section id="tours" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Featured Tour Packages</h3>
            <p className="text-xl text-gray-600">Handpicked itineraries for unforgettable experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 套餐 1 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=800"
                  alt="5 Days Xinjiang Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Best Seller
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">5 Days</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Group Tour</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-800">Essential Xinjiang Highlights</h4>
                <p className="text-gray-600 mb-4">Urumqi • Tianchi • Turpan • Kashgar</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span>🏨 4 Nights Hotel</span>
                  <span>🚌 All Transport</span>
                  <span>🍽️ 4 Breakfasts</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <span className="text-gray-400 line-through text-sm">$899</span>
                    <span className="text-3xl font-bold text-blue-600 ml-2">$699</span>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* 套餐 2 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
                  alt="7 Days Xinjiang Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">7 Days</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Private Tour</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-800">Silk Road Adventure</h4>
                <p className="text-gray-600 mb-4">Kashgar • Kanas • Yining • Sayram Lake</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span>🏨 6 Nights Hotel</span>
                  <span>🚗 Private Car</span>
                  <span>🍽️ 6 Breakfasts, 3 Dinners</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <span className="text-gray-400 line-through text-sm">$1,299</span>
                    <span className="text-3xl font-bold text-blue-600 ml-2">$999</span>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* 套餐 3 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
                  alt="10 Days Xinjiang Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Luxury
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">10 Days</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Luxury Tour</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-800">Complete Xinjiang Discovery</h4>
                <p className="text-gray-600 mb-4">All Highlights • Local Experiences • Photography</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span>🏨 9 Nights 5★ Hotel</span>
                  <span>🚗 Private Car + Guide</span>
                  <span>🍽️ All Meals Included</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <span className="text-gray-400 line-through text-sm">$2,199</span>
                    <span className="text-3xl font-bold text-blue-600 ml-2">$1,799</span>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 查看行程按钮 */}
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition">
              View All 15 Tour Packages →
            </button>
          </div>
        </div>
      </section>

      {/* ========== 为什么选择我们 ========== */}
      <section id="why-us" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Xinjiang Travel</h3>
            <p className="text-xl text-gray-600">We make your journey unforgettable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏔️</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Local Experts</h4>
              <p className="text-gray-600">Born and raised in Xinjiang, we know every hidden gem</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">💰</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Best Price Guarantee</h4>
              <p className="text-gray-600">Direct local operator, no middleman fees</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🛡️</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Safe & Secure</h4>
              <p className="text-gray-600">Fully licensed, insured, and verified guides</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">24/7 Support</h4>
              <p className="text-gray-600">We're here for you before, during, and after your trip</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 客户评价 ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">What Travelers Say</h3>
            <p className="text-xl text-gray-600">Real experiences from real adventurers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 评价 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 italic">"The most amazing trip of my life! Kanas Lake was absolutely breathtaking. Our guide was knowledgeable and friendly. Highly recommend!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl">👨</div>
                <div>
                  <p className="font-bold text-gray-800">John Smith</p>
                  <p className="text-sm text-gray-500">California, USA</p>
                </div>
              </div>
            </div>
            
            {/* 评价 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 italic">"Xinjiang exceeded all my expectations. The culture, the food, the landscapes - everything was perfect. Thank you for an unforgettable journey!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl">👩</div>
                <div>
                  <p className="font-bold text-gray-800">Emma Wilson</p>
                  <p className="text-sm text-gray-500">London, UK</p>
                </div>
              </div>
            </div>
            
            {/* 评价 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 italic">"As a photographer, I was in paradise. Every turn revealed a new stunning view. The itinerary was perfectly planned for golden hour shots!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-xl">📷</div>
                <div>
                  <p className="font-bold text-gray-800">Michael Chen</p>
                  <p className="text-sm text-gray-500">Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA 区域 ========== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Explore Xinjiang?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect journey. Get a free custom itinerary within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-2xl">
              Get Free Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
              Chat with Expert
            </button>
          </div>
        </div>
      </section>

      {/* ========== 底部 ========== */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 公司信息 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🏔️</span>
                <h4 className="text-xl font-bold">Xinjiang Travel</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted local expert for unforgettable Xinjiang adventures since 2026.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📸</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">🐦</a>
              </div>
            </div>
            
            {/* 快速链接 */}
            <div>
              <h5 className="text-lg font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Destinations</a></li>
                <li><a href="#" className="hover:text-white transition">Tour Packages</a></li>
                <li><a href="#" className="hover:text-white transition">Custom Tours</a></li>
                <li><a href="#" className="hover:text-white transition">Travel Guide</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>
            
            {/* 热门路线 */}
            <div>
              <h5 className="text-lg font-bold mb-4">Popular Tours</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">5 Days Essential</a></li>
                <li><a href="#" className="hover:text-white transition">7 Days Silk Road</a></li>
                <li><a href="#" className="hover:text-white transition">10 Days Complete</a></li>
                <li><a href="#" className="hover:text-white transition">Photography Tour</a></li>
                <li><a href="#" className="hover:text-white transition">Adventure Trekking</a></li>
              </ul>
            </div>
            
            {/* 联系方式 */}
            <div>
              <h5 className="text-lg font-bold mb-4">Contact Us</h5>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>hello@xinjiang-travel.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+86 123 4567 8900</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>💬</span>
                  <span>WeChat: XinjiangTravel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Urumqi, Xinjiang, China</span>
                </li>
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