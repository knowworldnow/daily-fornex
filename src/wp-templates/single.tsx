import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import PageLayout from "@/container/PageLayout";
import { Sidebar } from "@/container/singles/Sidebar";
import dynamic from "next/dynamic";

const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  // Type casting _post to ensure TypeScript knows what fields are present
  const _post = props.data?.post as {
    title: string;
    ncPostMetaData?: { showRightSidebar: boolean };
    featuredImage?: { node: { sourceUrl: string } };
    content: string;
    databaseId: number;
    excerpt: string;
  } || {};

  const {
    title = "",
    ncPostMetaData,
    featuredImage,
    content = "",
    databaseId,
    excerpt = "",
  } = _post;

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImage?.node?.sourceUrl || ""}
      pageTitle={title}
      pageDescription={excerpt}
      generalSettings={props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment}
    >
      {ncPostMetaData?.showRightSidebar ? (
        <div className="relative">
          <div className="container flex flex-col my-10 lg:flex-row">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
              <SingleContent post={_post} />
            </div>
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
              <Sidebar content={content} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SingleContent post={_post} />
        </div>
      )}

      <DynamicSingleRelatedPosts postId={databaseId} />
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
  query GetPostSiglePage($databaseId: ID!, $post_databaseId: Int, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      ncPostMetaData {
        showRightSidebar
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
      databaseId
      excerpt
    }
    posts(where: {isRelatedOfPostId: $post_databaseId}) {
      nodes {
        title
        uri
      }
    }
    generalSettings {
      title
      description
    }
    primaryMenuItems: menuItems(where: {location: PRIMARY}) {
      nodes {
        label
        url
      }
    }
    footerMenuItems: menuItems(where: {location: FOOTER}) {
      nodes {
        label
        url
      }
    }
  }
`);

export default Component;
