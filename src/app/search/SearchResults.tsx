'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../lib/faust-api';
import { Post } from '../../types';
import Link from 'next/link';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get('q') || '' : '';
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setIsLoading(true);
        setError(null);
        try {
          const searchResults = await searchPosts(query);
          setResults(searchResults);
        } catch (err) {
          setError('Failed to fetch search results. Please try again.');
          console.error('Search error:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (results.length === 0 && query) {
    return <div className="text-center py-4">No results found for &quot;{query}&quot;</div>;
  }

  return (
    <div className="space-y-4">
      {results.map((post) => (
        <div key={post.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <Link href={`/post/${post.slug}`} className="block">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:text-blue-800">{post.title}</h2>
            {post.excerpt && (
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            )}
            <div className="mt-2 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()} | {post.author.node.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
