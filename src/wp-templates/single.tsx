import { gql } from "@apollo/client";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcPostFullFieldsFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();

  const _post = props.data?.post || {};
  const _relatedPosts = (props.data?.posts?.nodes as NcmazFcPostFullFieldsFragment[]) || [];

  const {
    title,
    ncPostMetaData,
    featuredImage,
    databaseId,
    excerpt,
    content,  // Ensure content is being extracted for the Sidebar
  } = _post;

  const renderHeaderType = () => {
    // Simplified logic here, assuming SingleType1 for demonstration purposes
    return (
      <SingleType1
        showRightSidebar={!!ncPostMetaData?.showRightSidebar}
        post={_post}
      />
    );
  };

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.sourceUrl || ""}
        pageTitle={title || ""}
        pageDescription={excerpt || ""}
        generalSettings={props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment}
      >
        {ncPostMetaData?.showRightSidebar ? (
          <div>
            <div className={`relative`}>
              {renderHeaderType()}

              <div className="container flex flex-col my-10 lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
                  <SingleContent post={_post} />
                  <SocialsShare link={router.asPath} />
                </div>
                <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
                  <Sidebar content={content || ""} />
                </div>
              </div>

              {/* RELATED POSTS */}
              <DynamicSingleRelatedPosts
                posts={_relatedPosts}
                postDatabaseId={databaseId}
              />
            </div>
          </div>
        ) : (
          <div>
            {renderHeaderType()}

            <div className="container mt-10">
              {/* SINGLE MAIN CONTENT */}
              <SingleContent post={_post} />
              <SocialsShare link={router.asPath} />
            </div>

            {/* RELATED POSTS */}
            <DynamicSingleRelatedPosts
              posts={_relatedPosts}
              postDatabaseId={databaseId}
            />
          </div>
        )}
      </PageLayout>
    </>
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

Component.query = gql`
  query GetPostSiglePage(
    $databaseId: ID!
    $post_databaseId: Int
    $asPreview: Boolean = false
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...NcmazFcPostFullFieldsFragment
    }
    posts(where: { isRelatedOfPostId: $post_databaseId }) {
      nodes {
        ...NcmazFcPostFullFieldsFragment
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`;

export default Component;
