import React from 'react';
import PageLayout from '@/container/PageLayout';
import Heading from '@/components/Heading/Heading';
import MyImage from '@/components/MyImage';
import SEO from '@/components/SEO/SEO';
import { NC_SITE_SETTINGS } from '@/contains/site-settings';

const PageContact = () => {
  const info = NC_SITE_SETTINGS.contact_page?.my_contact_info;

  return (
    <div className="max-w-sm space-y-6">
      {info?.map((item, index) => (
        <div key={index}>
          <h3
            className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200"
            dangerouslySetInnerHTML={{ __html: item?.title || '' }}
          />
          {item?.desc && (
            <span
              className="mt-2 block text-neutral-500 dark:text-neutral-400"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            />
          )}
          {item?.name === 'socials' && (
            <div className="mt-3 flex flex-wrap gap-4 md:order-2">
              {NC_SITE_SETTINGS.site_socials?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="relative block"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="absolute -inset-0.5 hidden rounded-lg bg-neutral-400 dark:block"></span>
                  <span className="sr-only">{social?.name}</span>
                  <MyImage
                    width={20}
                    height={20}
                    className="max-h-5 opacity-60 hover:opacity-100"
                    src={social?.icon || ''}
                    alt={social?.name || ''}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title={NC_SITE_SETTINGS.contact_page?.title}
        description={NC_SITE_SETTINGS.contact_page?.sub_title}
        url="https://dailyfornex.com/contact/"
      />
      <div className="container pb-20 pt-10 sm:py-20">
        <main className="mx-auto max-w-5xl">
          <Heading desc={NC_SITE_SETTINGS.contact_page?.sub_title}>
            {NC_SITE_SETTINGS.contact_page?.title}
          </Heading>
          <div className="my-10 border-t border-neutral-100 dark:border-neutral-700"></div>
          <PageContact />
        </main>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
