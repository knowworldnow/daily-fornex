'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../lib/faust-api';
import { Post } from '../../types';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const searchResults = await searchPosts(query);
        setResults(searchResults);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div>
      {results.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
