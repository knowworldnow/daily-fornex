import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEO from '../../components/Seo';
import { PostContent } from '../../components/PostContent';
import { getPageBySlug } from '../../lib/faust-api';

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic';
// Alternative: Use ISR (uncomment this and comment the line above)
// export const revalidate = 3600; // Revalidate every hour

interface PageData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    console.log(`Fetching metadata for slug: ${params.slug}`);
    
    const page: PageData | null = await getPageBySlug(params.slug);
    
    if (!page) {
      console.log(`No page found for slug: ${params.slug}`);
      return {
        title: 'Page Not Found - Daily Fornex',
        description: 'The requested page could not be found.',
      };
    }

    const ogImageUrl = page.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';
    
    return {
      title: `${page.title} - Daily Fornex`,
      description: page.excerpt || page.title,
      openGraph: {
        type: 'website',
        url: `https://dailyfornex.com/${page.slug}`,
        title: page.title,
        description: page.excerpt || page.title,
        siteName: 'Daily Fornex',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: page.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: page.title,
        description: page.excerpt || page.title,
        images: [ogImageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch page metadata:', error);
    
    // Return fallback metadata instead of failing the build
    return {
      title: 'Daily Fornex',
      description: 'Your trusted source for daily news and updates',
      openGraph: {
        type: 'website',
        url: 'https://dailyfornex.com',
        title: 'Daily Fornex',
        description: 'Your trusted source for daily news and updates',
        siteName: 'Daily Fornex',
        images: [
          {
            url: 'https://dailyfornex.com/default-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Daily Fornex',
          },
        ],
      },
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  let page: PageData | null = null;
  let error: string | null = null;

  try {
    console.log(`Fetching page data for slug: ${params.slug}`);
    page = await getPageBySlug(params.slug);
    
    if (!page) {
      console.log(`Page not found for slug: ${params.slug}`);
      notFound();
    }
  } catch (fetchError) {
    console.error('Failed to fetch page data:', fetchError);
    error = 'Failed to load page content. Please try again later.';
  }

  // If there was an error but we still want to show something instead of crashing
  if (error && !page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-red-600">Error Loading Page</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    notFound();
  }

  const ogImageUrl = page.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';

  return (
    <>
      <SEO 
        title={page.title}
        description={page.excerpt || page.title}
        canonicalUrl={`https://dailyfornex.com/${page.slug}`}
        ogType="website"
        ogImage={ogImageUrl}
        ogImageAlt={page.title}
        siteName="Daily Fornex"
      />
      
      <article className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
            {page.title}
          </h1>
          
          {page.excerpt && (
            <div className="text-xl text-gray-600 mb-6 leading-relaxed">
              {page.excerpt}
            </div>
          )}
          
          {page.featuredImage?.node.sourceUrl && (
            <div className="mb-8">
              <img
                src={page.featuredImage.node.sourceUrl}
                alt={page.title}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="eager"
              />
            </div>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          <PostContent content={page.content} />
        </div>
      </article>
    </>
  );
}
