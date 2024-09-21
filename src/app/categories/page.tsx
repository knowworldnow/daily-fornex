import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts, getAllCategories } from '../../lib/faust-api';
import { Category, GetAllPostsResult } from '../../types';

export const revalidate = 300;

export async function generateStaticParams() {
  const result = await getLatestPosts({ first: 20 }) as GetAllPostsResult;
  return result.posts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories();
  
  // Sort categories by post count in descending order
  categories.sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.id} className="block">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <Image
                src="/placeholder-category.jpg"
                alt={category.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-primary">
                <h2 className="text-xl font-semibold text-primary-foreground">{category.name}</h2>
                <p className="text-primary-foreground">{category.count} Articles</p>
                {category.description && (
                  <p className="text-sm text-primary-foreground mt-2">{category.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Categories - Daily Fornex',
  description: 'Explore all categories on Daily Fornex',
};
