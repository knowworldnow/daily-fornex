import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEO from '../../components/Seo';
import { getPageBySlug } from '../../lib/faust-api';

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.page);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const ogImageUrl = page.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg';

  return {
    title: `${page.title} | Daily Fornex`,
    description: page.excerpt || '',
    openGraph: {
      type: 'website',
      url: `https://dailyfornex.com/${page.slug}`,
      title: page.title,
      description: page.excerpt || '',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      siteName: 'Daily Fornex',
    },
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPageBySlug(params.page);

  if (!page) {
    notFound();
  }

  return (
    <>
      <SEO 
        title={`${page.title} | Daily Fornex`}
        description={page.excerpt || ''}
        canonicalUrl={`https://dailyfornex.com/${page.slug}`}
        ogType="website"
        ogImage={page.featuredImage?.node.sourceUrl || 'https://dailyfornex.com/default-og-image.jpg'}
        ogImageAlt={page.title}
        siteName="Daily Fornex"
      />
      <article className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </>
  );
}
