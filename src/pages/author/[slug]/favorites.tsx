import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql, DocumentNode } from "@apollo/client";
import { GetAuthorWithPostsQuery, User } from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import AuthorPostsChild from "@/container/author/AuthorPostsChild";
import Page404Content from "@/container/404Content";
import SEO from "@/components/SEO/SEO";

const Page: FaustPage<GetAuthorWithPostsQuery> = (props) => {
  const author = props.data?.user as User | undefined;

  if (!author) {
    return <Page404Content />;
  }

  return (
    <>
      <SEO 
        title={`${author.name} - Author at Daily Fornex`} 
        description={`Explore articles written by ${author.name} on Daily Fornex.`}
        url={`https://dailyfornex.com/author/${author.slug}/`}
        // Add noindex meta tag to prevent indexing
        noindex={true}
      />
      {/* @ts-ignore */}
      <AuthorPostsChild {...(props || [])} />
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
    first: GET_POSTS_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query GetAuthorWithPosts($id: ID!, $first: Int, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      name
      slug
      posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          title
          excerpt
          slug
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
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
`) as DocumentNode;

export default Page;
