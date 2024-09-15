import { gql } from "graphql-tag";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import SingleType1 from "@/container/singles/single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SocialsShare from "@/components/SocialsShare/SocialsShare";

const DynamicSingleRelatedPosts = dynamic(() =>
  import("@/container/singles/SingleRelatedPosts")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();
  const _post = props.data?.post || {};
  const { title, ncPostMetaData, featuredImage, databaseId, excerpt, content } =
    getPostDataFromPostFragment(_post);

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
      {ncPostMetaData?.showRightSidebar ? (
        <div>
          <div className={`relative`}>
            <SingleType1 showRightSidebar={!!ncPostMetaData?.showRightSidebar} post={_post} />
            <div className="container flex flex-col my-10 lg:flex-row ">
              <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
                <SingleContent post={_post} />
                <SocialsShare link={router.asPath} />
              </div>
              <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
                <Sidebar content={content || ""} /> {/* Pass the content to Sidebar */}
              </div>
            </div>
            <DynamicSingleRelatedPosts posts={props.data?.posts?.nodes || []} postDatabaseId={databaseId} />
          </div>
        </div>
      ) : (
        <div>
          <SingleType1 showRightSidebar={!!ncPostMetaData?.showRightSidebar} post={_post} />
          <div className="container mt-10">
            <SingleContent post={_post} />
            <SocialsShare link={router.asPath} />
          </div>
          <DynamicSingleRelatedPosts posts={props.data?.posts?.nodes || []} postDatabaseId={databaseId} />
        </div>
      )}
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
      id
      title
      excerpt
      content
      featuredImage {
        sourceUrl
      }
      ncPostMetaData {
        showRightSidebar
      }
    }
    posts(where: { isRelatedOfPostId: $post_databaseId }) {
      nodes {
        id
        title
        uri
        excerpt
      }
    }
    generalSettings {
      title
      description
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        id
        label
        url
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 40) {
      nodes {
        id
        label
        url
      }
    }
  }
`);

export default Component;
