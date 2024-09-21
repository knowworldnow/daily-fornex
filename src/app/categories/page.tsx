import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts } from '../../lib/faust-api';
import { getAllCategories } from '../../lib/faust-api';
import { Post as PostType, Category, Comment, CommentAuthor } from '../../types';

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getLatestPosts({ first: 20 }); // Adjust the number as needed
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface CategoryWithImage extends Category {
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  color?: string;
}

export default async function CategoriesPage() {
  const categories: CategoryWithImage[] = await getAllCategories();
  
  // Sort categories by post count in descending order
  categories.sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/${category.slug}`} key={category.id} className="block">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <Image
                src={category.featuredImage?.node.sourceUrl || '/placeholder-category.jpg'}
                alt={category.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4" style={{ backgroundColor: category.color || '#f3f4f6' }}>
                <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                <p className="text-white">{category.count} Articles</p>
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
