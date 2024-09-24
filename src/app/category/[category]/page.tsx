import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategoryBySlug } from '../../../lib/faust-api';
import { Post, Category } from '../../../types';

const POSTS_PER_PAGE = 20;

function PostCard({ post }: { post: Post }) {
  return (
    <article className="mb-8">
      <Link href={`/${post.slug}`}>
        <Image
          src={post.featuredImage?.node.sourceUrl || '/placeholder.svg'}
          alt={post.featuredImage?.node.altText || post.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-lg mb-4"
        />
      </Link>
      <div className="flex items-center mb-2">
        {post.categories?.nodes[0] && (
          <Link href={`/category/${post.categories.nodes[0].slug}`} className="text-blue-600 text-sm font-semibold mr-4">
            {post.categories.nodes[0].name}
          </Link>
        )}
        <span className="text-sm text-gray-600">{post.author?.node.name}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <time className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</time>
    </article>
  );
}

function Pagination({ currentPage, totalPages, baseUrl }: { currentPage: number; totalPages: number; baseUrl: string }) {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          key={pageNum}
          href={`${baseUrl}?page=${pageNum}`}
          className={`mx-1 px-3 py-2 rounded ${
            pageNum === currentPage ? 'bg-primary text-primary-foreground' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {pageNum}
        </Link>
      ))}
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: { params: { category: string }; searchParams: { page?: string } }) {
  const categorySlug = params.category;
  const page = Number(searchParams.page) || 1;
  const category: Category | null = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const after = page > 1 ? ((page - 1) * POSTS_PER_PAGE).toString() : null;
  const result = await getPostsByCategory(categorySlug, POSTS_PER_PAGE, after);
  const posts: Post[] = result.posts.nodes;
  const totalPosts = category.count;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (posts.length === 0 && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 capitalize">{category.name}</h2>
        <p className="text-center">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/category/${categorySlug}`} />
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Daily Fornex`,
    description: `Latest posts in the ${category.name} category on Daily Fornex`,
  };
}
