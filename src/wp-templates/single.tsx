import { gql } from "../__generated__";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const _post = props.data?.post || {};
  const {
    title,
    featuredImage,
    content,
    databaseId,
    excerpt,
  } = getPostDataFromPostFragment(_post);

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImage?.sourceUrl}
      pageTitle={title}
      pageDescription={excerpt || ""}
      generalSettings={props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment}
    >
      <div>
        <SingleContent post={_post} />
      </div>
    </PageLayout>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    post_databaseId: Number(databaseId || 0),
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Component.query = gql(`
  query GetPostSiglePage($databaseId: ID!, $post_databaseId: Int,$asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...NcmazFcPostFullFields
    }
    posts(where: {isRelatedOfPostId:$post_databaseId}) {
      nodes {
        ...PostCardFieldsNOTNcmazMEDIA
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
    primaryMenuItems: menuItems(where: {location:$headerLocation}, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: {location:$footerLocation}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Component;
