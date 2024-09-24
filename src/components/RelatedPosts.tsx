import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../types';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  console.log('Rendering RelatedPosts component with:', posts);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/${post.slug}`} className="block">
              <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImage?.node.sourceUrl || '/placeholder.jpg'}
                  alt={post.featuredImage?.node.altText || post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {post.author.node.name}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
