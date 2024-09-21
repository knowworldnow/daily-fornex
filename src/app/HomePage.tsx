'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts } from '../lib/faust-api';

const POSTS_PER_PAGE = 20;

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories: {
    nodes: { name: string; slug: string }[];
  };
}

const PostCard = ({ post }: { post: Post }) => (
  <article className="mb-8">
    <Link href={`/post/${post.slug}`}>
      <Image
        src={post.featuredImage?.node.sourceUrl || '/placeholder.jpg'}
        alt={post.featuredImage?.node.altText || post.title}
        width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg mb-4"
      />
    </Link>
    <div className="flex items-center mb-2">
      {post.categories?.nodes[0] && (
        <Link href={`/${post.categories.nodes[0].slug}`} className="text-blue-600 text-sm font-semibold mr-4">
          {post.categories.nodes[0].name}
        </Link>
      )}
      {post.author?.node.avatar && (
        <Image
          src={post.author.node.avatar.url}
          alt={post.author.node.name}
          width={24}
          height={24}
          className="rounded-full mr-2"
        />
      )}
      <span className="text-sm text-gray-600">{post.author?.node.name}</span>
    </div>
    <h2 className="text-xl font-bold mb-2">
      <Link href={`/post/${post.slug}`} className="hover:underline">
        {post.title}
      </Link>
    </h2>
    <time className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</time>
  </article>
);

interface HomePageProps {
  initialPosts: Post[];
}

export default function HomePage({ initialPosts }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastCursor, setLastCursor] = useState<string | null>(null);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newPosts = await getLatestPosts({
        first: POSTS_PER_PAGE,
        after: lastCursor
      });
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
        setLastCursor(newPosts[newPosts.length - 1].cursor);
        setHasMore(newPosts.length === POSTS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center mb-8">Latest and Hottest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
