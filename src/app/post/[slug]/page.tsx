import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../../lib/faust-api';
import { Post } from '../../../types';
import CommentForm from '../../../components/CommentForm';
import CommentList from '../../../components/CommentList';
import PostHeader from '../../../components/PostHeader';
import TableOfContents from '../../../components/TableOfContents';
import SocialSharePanel from '../../../components/SocialSharePanel';
import AuthorBox from '../../../components/AuthorBox';
import RelatedPosts from '../../../components/RelatedPosts';

export const revalidate = 3600; // Revalidate this page every hour

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImageUrl = post.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';

  return {
    title: `${post.title} | Daily Fornex`,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://dailyfornex.com/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.node.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Daily Fornex',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post | null = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://dailyfornex.com/${post.slug}`;
  const imageUrl = post.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';

  let relatedPosts: Post[] = [];
  if (post.categories.nodes.length > 0) {
    const categoryId = post.categories.nodes[0].id;
    console.log('Fetching related posts for category:', categoryId);
    try {
      relatedPosts = await getRelatedPosts(categoryId, post.id);
      console.log('Related posts:', relatedPosts);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  } else {
    console.log('No categories found for this post');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (previous content remains the same) ... */}
      
      {relatedPosts.length > 0 ? (
        <RelatedPosts posts={relatedPosts} />
      ) : (
        <p>No related posts found.</p>
      )}
    </div>
  );
}
