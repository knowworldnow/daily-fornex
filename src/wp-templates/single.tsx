import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import SingleType1 from "@/container/singles/single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT } from "@/fragments/mutations";
import { useMutation } from "@apollo/client";
import { IS_DEV } from "@/contains/site-settings";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useGetPostsNcmazMetaByIds from "@/hooks/useGetPostsNcmazMetaByIds";
import { TPostCard } from "@/components/Card2/Card2";
import { useRouter } from "next/router";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import SingleTypeAudio from "@/container/singles/single-audio/single-audio";
import SingleTypeVideo from "@/container/singles/single-video/single-video";
import SingleTypeGallery from "@/container/singles/single-gallery/single-gallery";
import SocialsShare from "@/components/SocialsShare/SocialsShare";

// Dynamically loaded components for related posts and different single types
const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);
const DynamicSingleType2 = dynamic(
  () => import("../container/singles/single-2/single-2")
);
const DynamicSingleType3 = dynamic(
  () => import("../container/singles/single-3/single-3")
);
const DynamicSingleType4 = dynamic(
  () => import("../container/singles/single-4/single-4")
);
const DynamicSingleType5 = dynamic(
  () => import("../container/singles/single-5/single-5")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  // Loading state
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();
  const IS_PREVIEW = router.pathname === "/preview";

  // Viewer authentication and state management
  const { isReady, isAuthenticated } = useSelector(
    (state: RootState) => state.viewer.authorizedUser
  );
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const [isUpdateViewCount, setIsUpdateViewCount] = useState(false);

  useEffect(() => {
    const timeOutUpdateViewCount = setTimeout(() => {
      setIsUpdateViewCount(true);
    }, 5000);

    return () => {
      clearTimeout(timeOutUpdateViewCount);
    };
  }, []);

  // Data extraction from props
  const _post = props.data?.post || {};
  const _relatedPosts = (props.data?.posts?.nodes as TPostCard[]) || [];
  const _top10Categories =
    (props.data?.categories?.nodes as TCategoryCardFull[]) || [];

  const {
    title,
    ncPostMetaData,
    postFormats,
    featuredImage,
    databaseId,
    excerpt,
  } = getPostDataFromPostFragment(_post);

  useGetPostsNcmazMetaByIds({
    posts: (IS_PREVIEW ? [] : [_post]) as TPostCard[],
  });

  // Update view count mutation
  const [handleUpdateReactionCount, { reset }] = useMutation(
    NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT,
    {
      onCompleted: (data) => {
        IS_DEV && console.log("___update post view data: ", data);
        reset();
      },
    }
  );

  // Update view count logic
  useEffect(() => {
    if (!isReady || IS_PREVIEW || !isUpdateViewCount) {
      return;
    }

    // Update view count for unauthenticated users
    if (isAuthenticated === false) {
      handleUpdateReactionCount({
        variables: {
          post_id: databaseId,
          reaction: NcmazFcUserReactionPostActionEnum.View,
          number: NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
        },
      });
      return;
    }

    // Update view count for authenticated users
    if (!viewer?.databaseId) {
      return;
    }

    handleUpdateReactionCount({
      variables: {
        post_id: databaseId,
        reaction: NcmazFcUserReactionPostActionEnum.View,
        number: NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
        user_id: viewer?.databaseId,
      },
    });
  }, [
    databaseId,
    isReady,
    isAuthenticated,
    viewer?.databaseId,
    IS_PREVIEW,
    isUpdateViewCount,
  ]);

  const renderHeaderType = () => {
    const pData = { ...(_post || {}) };

    switch (postFormats) {
      case "audio":
        return <SingleTypeAudio post={pData} />;
      case "video":
        return <SingleTypeVideo post={pData} />;
      case "gallery":
        return <SingleTypeGallery post={pData} />;
      default:
        switch (ncPostMetaData?.template?.[0]) {
          case "style2":
            return <DynamicSingleType2 post={pData} />;
          case "style3":
            return <DynamicSingleType3 post={pData} />;
          case "style4":
            return <DynamicSingleType4 post={pData} />;
          case "style5":
            return <DynamicSingleType5 post={pData} />;
          default:
            return (
              <SingleType1
                showRightSidebar={!!ncPostMetaData?.showRightSidebar}
                post={pData}
              />
            );
        }
    }
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

              <div className="container flex flex-col my-10 lg:flex-row ">
                <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
                  <SingleContent post={_post} />
                  <SocialsShare link={router.asPath} />
                </div>
                <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
                  <Sidebar categories={_top10Categories} />
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

// Correct query with proper fragments
Component.query = gql`
  query GetPostSiglePage(
    $databaseId: ID!
    $post_databaseId: Int
    $asPreview: Boolean = false
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...NcmazFcPostFullFields
    }
    posts(where: { isRelatedOfPostId: $post_databaseId }) {
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
