import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
            {/* 顶部导航 */}
            <nav className="p-4 bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">🏔️ 昊昊旅游</h1>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                        立即预订
                    </button>
                </div>
            </nav>

            {/* 主标题区域 */}
            <main className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://picsum.photos/seed/china1/1600/900"
                        alt="风景背景"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">
                        探索中国最美风景
                    </h2>
                    <p className="text-2xl mb-8 drop-shadow">
                        张家界 | 桂林 | 九寨沟
                    </p>
                    <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition shadow-lg">
                        查看路线 →
                    </button>
                </div>
            </main>

            {/* 旅游产品卡片 */}
            <section className="container mx-auto px-4 py-16">
                <h3 className="text-4xl font-bold text-center text-white mb-12 drop-shadow">
                    热门路线
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 产品 1 - 张家界 */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
                        <div className="relative h-64">
                            <Image
                                src="https://picsum.photos/seed/zhangjiajie/800/600"
                                alt="张家界"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold mb-2 text-gray-800">张家界三日游</h4>
                            <p className="text-gray-600 mb-4">🏔️ 阿凡达取景地 · 天门山 · 玻璃栈道</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-gray-400 line-through text-sm">¥2599</span>
                                    <span className="text-3xl font-bold text-blue-600 ml-2">¥1999</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
                                    立即预订
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 产品 2 - 桂林 */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
                        <div className="relative h-64">
                            <Image
                                src="https://picsum.photos/seed/guilin/800/600"
                                alt="桂林"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold mb-2 text-gray-800">桂林山水四日游</h4>
                            <p className="text-gray-600 mb-4">🛶 漓江竹筏 · 象鼻山 · 阳朔西街</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-gray-400 line-through text-sm">¥3299</span>
                                    <span className="text-3xl font-bold text-blue-600 ml-2">¥2599</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
                                    立即预订
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 产品 3 - 九寨沟 */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
                        <div className="relative h-64">
                            <Image
                                src="https://picsum.photos/seed/jiuzhaigou/800/600"
                                alt="九寨沟"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold mb-2 text-gray-800">九寨沟五日游</h4>
                            <p className="text-gray-600 mb-4">🏞️ 人间仙境 · 五彩池 · 诺日朗瀑布</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-gray-400 line-through text-sm">¥4299</span>
                                    <span className="text-3xl font-bold text-blue-600 ml-2">¥3299</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
                                    立即预订
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 底部 */}
            <footer className="bg-gray-900 text-white text-center py-12 mt-16">
                <p className="text-lg">© 2026 昊昊旅游 | 探索中国之美 🇨🇳</p>
                <p className="text-gray-400 mt-2">📧 联系：haohao@travel.com</p>
            </footer>
        </div>
    );
}