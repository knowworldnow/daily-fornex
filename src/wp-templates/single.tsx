import { gql } from "@apollo/client";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
  NcmazFcPostFullFieldsFragment,
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
import TableContentAnchor from "@/container/singles/TableContentAnchor"; // Added TOC component

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
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();
  const IS_PREVIEW = router.pathname === "/preview";

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

  const _post = props.data?.post as NcmazFcPostFullFieldsFragment;
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
    content, // Extracted content for TOC
  } = getPostDataFromPostFragment(_post);

  useGetPostsNcmazMetaByIds({
    posts: IS_PREVIEW ? [] : [_post],
  });

  const [handleUpdateReactionCount, { reset }] = useMutation(
    NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT,
    {
      onCompleted: (data) => {
        IS_DEV && console.log("___update post view data: ", data);
        reset();
      },
    }
  );

  useEffect(() => {
    if (!isReady || IS_PREVIEW || !isUpdateViewCount) {
      return;
    }

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

    if (postFormats === "audio") {
      return <SingleTypeAudio post={pData} />;
    }
    if (postFormats === "video") {
      return <SingleTypeVideo post={pData} />;
    }
    if (postFormats === "gallery") {
      return <SingleTypeGallery post={pData} />;
    }

    if (ncPostMetaData?.template?.[0] === "style2") {
      return <DynamicSingleType2 post={pData} />;
    }
    if (ncPostMetaData?.template?.[0] === "style3") {
      return <DynamicSingleType3 post={pData} />;
    }
    if (ncPostMetaData?.template?.[0] === "style4") {
      return <DynamicSingleType4 post={pData} />;
    }
    if (ncPostMetaData?.template?.[0] === "style5") {
      return <DynamicSingleType5 post={pData} />;
    }
    return (
      <SingleType1
        showRightSidebar={!!ncPostMetaData?.showRightSidebar}
        post={pData}
      />
    );
  };

  return (
    <>
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
              {renderHeaderType()}

              <div className="container flex flex-col my-10 lg:flex-row ">
                <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
                  {/* Render the Table of Contents */}
                  <TableContentAnchor content={content || ""} className="mb-6" />

                  <SingleContent post={_post} />
                  <SocialsShare link={router.asPath} />
                </div>
                <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
                  <Sidebar categories={_top10Categories} />
                </div>
              </div>

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
              <TableContentAnchor content={content || ""} className="mb-6" />

              <SingleContent post={_post} />
              <SocialsShare link={router.asPath} />
            </div>

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
        ...PostCardFieldsNotNcmazMediaFragment
      }
    }
    categories(first: 10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    generalSettings {
      ...NcmazFcGeneralSettingsFieldsFragment
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
  ${NcmazFcPostFullFieldsFragment}
  ${PostCardFieldsNotNcmazMediaFragment}
  ${NcmazFcCategoryFullFieldsFragment}
  ${NcmazFcGeneralSettingsFieldsFragment}
`;

export default Component;
