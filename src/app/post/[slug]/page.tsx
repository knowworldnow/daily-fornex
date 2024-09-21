import Image from 'next/image';
import { Metadata } from 'next';
import { getPostBySlug, getLatestPosts } from '../../../lib/faust-api';
import { notFound } from 'next/navigation';
import CommentForm from '../../../components/CommentForm';
import CommentList from '../../../components/CommentList';
import PostHeader from '../../../components/PostHeader';
import TableOfContents from '../../../components/TableOfContents';
import SocialSharePanel from '../../../components/SocialSharePanel';
import { Post as PostType } from '../../../types';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getLatestPosts({ first: 20 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post: PostType | null = await getPostBySlug(params.slug);
  
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
      url: `https://dailyfornex.com/post/${post.slug}`,
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
  const post: PostType | null = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://dailyfornex.com/post/${post.slug}`;
  const imageUrl = post.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';

  return (
    <div className="container mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col lg:flex-row">
        <article className="lg:w-3/4 lg:pr-8">
          {post.featuredImage && (
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-lg mb-8"
              priority
            />
          )}
          <PostHeader
            title={post.title}
            author={post.author.node}
            date={post.date}
            category={post.categories.nodes[0]}
          />
          <div 
            className="prose max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.comments && <CommentList comments={post.comments.nodes} />}
          <CommentForm postId={post.id} />
        </article>
        <aside className="lg:w-1/4 mt-8 lg:mt-0">
          <TableOfContents content={post.content} />
        </aside>
      </div>
      <SocialSharePanel 
        url={postUrl}
        title={post.title}
        description={post.excerpt || ''}
        imageUrl={imageUrl}
      />
    </div>
  );
}
