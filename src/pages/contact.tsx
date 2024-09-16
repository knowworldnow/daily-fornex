import React from 'react';
import { gql } from '@/__generated__';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Input from '@/components/Input/Input';
import Label from '@/components/Label/Label';
import Textarea from '@/components/Textarea/Textarea';
import { FaustPage, getNextStaticProps } from '@faustwp/core';
import PageLayout from '@/container/PageLayout';
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql';
import getTrans from '@/utils/getTrans';
import Heading from '@/components/Heading/Heading';
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu';
import { GetStaticPropsContext } from 'next';
import { NC_SITE_SETTINGS } from '@/contains/site-settings';
import MyImage from '@/components/MyImage';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@apollo/client';
import { MUTATION_ADD_CONTACT_MESS_TO_WP } from '@/fragments/mutations';
import toast from 'react-hot-toast';
import Page404Content from '@/container/404Content';
import Error from '@/components/Error';
import Link from 'next/link';
import SEO from '@/components/SEO/SEO';

const PageContact = () => {
  const T = getTrans();
  const info = NC_SITE_SETTINGS.contact_page?.my_contact_info;

  const [mutationAddSubscriber, { data, loading, error, called }] =
    useMutation(MUTATION_ADD_CONTACT_MESS_TO_WP);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const user_full_name = formData.get('user_full_name') as string;
    const user_email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    if (!user_full_name || !user_email || !message) {
      toast.error(T['Please fill all fields']);
      return;
    }

    if (!user_email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      toast.error(T['Email are required!']);
      return;
    }

    mutationAddSubscriber({
      variables: { user_full_name, user_email, message },
    });
  };

  const renderResult = () => {
    if (!called) return null;
    
    if (data?.ncmazFaustAddSentMessContactForm?.success) {
      return (
        <div className="mt-2">
          <p className="text-xs italic text-green-600">
            {NC_SITE_SETTINGS.contact_page?.form?.success_message || 'Thank you!'}
          </p>
          <Link className="mt-5 flex items-center text-xs font-medium" href="/">
            <ArrowLeftIcon className="me-1 inline-block h-4 w-4" />
            {T['Back to home']}
          </Link>
        </div>
      );
    }

    const errorMessage = error?.message || 
      data?.ncmazFaustAddSentMessContactForm?.errors || 
      NC_SITE_SETTINGS.contact_page?.form?.error_message || 
      'Error';
    
    return <Error className="mt-2 text-xs" error={errorMessage} />;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Contact Info */}
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

      {/* Contact Form */}
      <div>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <label className="block">
            <Label htmlFor="user_full_name">{T['Full name']}</Label>
            <Input
              name="user_full_name"
              id="user_full_name"
              required
              type="text"
              className="mt-1"
            />
          </label>
          <label className="block">
            <Label htmlFor="user_email">{T['Email address']}</Label>
            <Input
              required
              name="user_email"
              id="user_email"
              type="email"
              className="mt-1"
            />
          </label>
          <label className="block">
            <Label htmlFor="message">{T['Message']}</Label>
            <Textarea
              name="message"
              id="message"
              required
              className="mt-1"
              rows={6}
            />
          </label>
          <ButtonPrimary type="submit" loading={loading}>
            <span>{T['Send Message']}</span>
            <PaperAirplaneIcon className="ms-2 h-5 w-5 -rotate-[30deg]" />
          </ButtonPrimary>
        </form>

        {renderResult()}
      </div>
    </div>
  );
};

const Page: FaustPage<GetReadingListPageQuery> = (props) => {
  if (NC_SITE_SETTINGS.contact_page?.enable === false) {
    return <Page404Content />;
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={undefined}
      pageTitle={NC_SITE_SETTINGS.contact_page?.title}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
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

Page.variables = () => ({
  headerLocation: PRIMARY_LOCATION,
  footerLocation: FOOTER_LOCATION,
});

Page.query = gql(`
  query GetReadingListPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

export default Page;
