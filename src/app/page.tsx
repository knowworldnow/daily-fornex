import { Metadata } from 'next';
import HomePage from './HomePage';
import { getLatestPosts } from '../lib/faust-api';
import { Post } from '../types';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const latestPosts: Post[] = await getLatestPosts({ first: 5 });
  const postTitles = latestPosts.map(post => post.title).join(', ');

  return {
    title: 'Daily Fornex - Your daily dose of informative updates',
    description: `Stay informed with the latest forex news and analysis. Recent topics: ${postTitles}`,
    openGraph: {
      title: 'Daily Fornex - Your daily dose of informative updates',
      description: `Stay informed with the latest forex news and analysis. Recent topics: ${postTitles}`,
      url: 'https://dailyfornex.com',
      siteName: 'Daily Fornex',
      images: [
        {
          url: 'https://dailyfornex.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Daily Fornex - Your daily dose of informative updates',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Daily Fornex - Your daily dose of informative updates',
      description: `Stay informed with the latest forex news and analysis. Recent topics: ${postTitles}`,
      images: ['https://dailyfornex.com/og-image.jpg'],
    },
  };
}

export default async function Home() {
  const initialPosts: Post[] = await getLatestPosts({ first: 20 });
  return <HomePage initialPosts={initialPosts} />;
}