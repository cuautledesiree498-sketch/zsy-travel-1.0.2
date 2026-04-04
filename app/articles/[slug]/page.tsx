// app/articles/[slug]/page.tsx - 攻略文章详情页
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, imageUrlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article ? `${article.title} - Travel Guide` : 'Article Not Found',
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '';

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-2xl font-bold text-gray-800">Xinjiang Travel</h1>
          </Link>
          <Link href="/#articles" className="text-gray-700 hover:text-blue-600 font-medium">
            ← Back to Articles
          </Link>
        </div>
      </nav>

      {/* 封面图 */}
      <div className="relative h-[40vh] mt-16">
        <Image
          src={imageUrlFor(article.mainImage, 1600)}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{article.title}</h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              {article.author && <span>By {article.author}</span>}
              {formattedDate && <span>• {formattedDate}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* 文章正文 */}
      <div className="container mx-auto max-w-3xl px-4 py-12">
        {article.content ? (
          <div className="prose prose-lg prose-gray max-w-none">
            <PortableText value={article.content} />
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No content available yet.</p>
        )}

        {/* 返回按钮 */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/#articles"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            ← More Articles
          </Link>
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
