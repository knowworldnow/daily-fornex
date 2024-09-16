import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

const Single: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const post = props.data?.post;
  const relatedPosts = props.data?.posts?.nodes || [];

  const {
    title,
    featuredImage,
    excerpt,
  } = getPostDataFromPostFragment(post || {});

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImage?.sourceUrl}
      pageTitle={title}
      pageDescription={excerpt || ""}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <SingleContent post={post} relatedPosts={relatedPosts} />
    </PageLayout>
  );
};

Single.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Single.query = gql(`
  query GetPostSiglePage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...NcmazFcPostFullFields
    }
    posts(where: {orderby: {field: DATE, order: DESC}}, first: 3) {
      nodes {
        ...PostCardFieldsNOTNcmazMEDIA
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: {location: $headerLocation}, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: {location: $footerLocation}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Single;
