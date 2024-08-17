import { gql } from "@apollo/client";
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
import TableOfContents from "@/components/TableOfContents";

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
    content,
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

  const renderHeaderTy
