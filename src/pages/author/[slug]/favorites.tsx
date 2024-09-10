import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import { PageAuthorFavoritesGetDataQuery } from "@/__generated__/graphql";
import React from "react";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import AuthorFavoritesChild from "@/container/author/AuthorFavoritesChild";

const Page: FaustPage<PageAuthorFavoritesGetDataQuery> = (props) => {
  const { data } = props;

  if (!data?.user) {
    return <div>User not found</div>; // Basic error handling
  }

  return (
    <>
      <Head>
        {/* Add noindex meta tag to prevent indexing */}
        <meta name="robots" content="noindex, follow" />
      </Head>
      
      <AuthorFavoritesChild {...(props as object)} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = ({ params }) => {
  return {
    id: params?.slug,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query PageAuthorFavoritesGetData($id: ID!, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      ...NcmazFcUserFullFields
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Page;
