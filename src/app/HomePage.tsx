'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts } from '../lib/faust-api';
import { Post, GetAllPostsResult } from '../types';

const POSTS_PER_PAGE = 20;

const PostCard = ({ post }: { post: Post }) => (
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
      <Link href={`/${post.slug}`} className="hover:underline">
        {post.title}
      </Link>
    </h2>
    <time className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</time>
  </article>
);

interface HomePageProps {
  initialPosts: Post[];
  initialPageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export default function HomePage({ initialPosts, initialPageInfo }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    if (loading || !pageInfo.hasNextPage) return;
    setLoading(true);
    try {
      const result = await getLatestPosts({
        first: POSTS_PER_PAGE,
        after: pageInfo.endCursor
      }) as GetAllPostsResult;
      
      setPosts((prevPosts) => [...prevPosts, ...result.posts.nodes]);
      setPageInfo(result.posts.pageInfo);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Latest and Hottest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
