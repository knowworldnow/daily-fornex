import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { TPostCard } from "@/components/Card2/Card2";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";

const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const _post = props.data?.post;

  // Check if _post exists and has the necessary fields
  if (!_post) {
    return <>Post data is missing.</>;
  }

  const {
    title,
    ncPostMetaData,
    featuredImage,
    content,
    databaseId,
    excerpt,
  } = _post;

  const router = useRouter();

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
        <div className="relative">
          <div className="container flex flex-col my-10 lg:flex-row">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
              <SingleContent post={_post} />
            </div>
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
              <Sidebar content={content || ""} />
            </div>
          </div>
          <DynamicSingleRelatedPosts
            posts={(props.data?.posts?.nodes as TPostCard[]) || []}
            postDatabaseId={databaseId}
          />
        </div>
      ) : (
        <div>
          <SingleContent post={_post} />
          <DynamicSingleRelatedPosts
            posts={(props.data?.posts?.nodes as TPostCard[]) || []}
            postDatabaseId={databaseId}
          />
        </div>
      )}
    </PageLayout>
  );
};

Component.variables = ({ databaseId }) => {
  return {
    databaseId,
    post_databaseId: Number(databaseId || 0),
  };
};

Component.query = gql(`
  query GetPostSiglePage($databaseId: ID!, $post_databaseId: Int) {
    post(id: $databaseId, idType: DATABASE_ID) {
      title
      ncPostMetaData {
        showRightSidebar
      }
      featuredImage {
        sourceUrl
      }
      content
      databaseId
      excerpt
    }
    posts(where: {isRelatedOfPostId:$post_databaseId}) {
      nodes {
        ...PostCardFieldsNOTNcmazMEDIA
      }
    }
    categories(first: 10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: {location:PRIMARY_LOCATION}, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: {location:FOOTER_LOCATION}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Component;
