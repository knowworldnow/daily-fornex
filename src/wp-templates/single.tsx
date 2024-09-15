import { gql } from "graphql-tag";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcImageHasDetailFieldsFragment,
  NcmazFcUserFullFieldsFragment,
  NcmazFcPostFullFieldsFragment,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import SingleType1 from "@/container/singles/single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import dynamic from "next/dynamic";
import SocialsShare from "@/components/SocialsShare/SocialsShare";
import { useRouter } from "next/router";

const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();

  const _post = props.data?.post;

  if (!_post) {
    return <div>Error: Post not found</div>;
  }

  const {
    title,
    ncPostMetaData,
    featuredImage,
    databaseId,
    excerpt,
    content,
    date,
    author,
    categories,
    tags,
  } = getPostDataFromPostFragment(_post);

  const getFeaturedImageUrl = (image: NcmazFcImageHasDetailFieldsFragment | null | undefined): string => {
    return image?.sourceUrl || "";
  };

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={getFeaturedImageUrl(featuredImage)}
      pageTitle={title}
      pageDescription={excerpt || ""}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <SingleType1
        showRightSidebar={!!ncPostMetaData?.showRightSidebar}
        post={_post}
      />
      <div className="container flex flex-col my-10 lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {featuredImage && featuredImage.sourceUrl && (
            <img
              src={featuredImage.sourceUrl}
              alt={featuredImage.altText || title}
              className="w-full h-auto mb-6 rounded-lg"
            />
          )}
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <span>{new Date(date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>By {(author as NcmazFcUserFullFieldsFragment)?.name || "Unknown Author"}</span>
          </div>
          {categories?.nodes && categories.nodes.length > 0 && (
            <div className="mb-4">
              {categories.nodes.map((category) => (
                <span key={category.databaseId} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {category.name}
                </span>
              ))}
            </div>
          )}
          <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: excerpt || "" }} />
          <SingleContent post={_post} />
          {tags?.nodes && tags.nodes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Tags:</h3>
              {tags.nodes.map((tag) => (
                <span key={tag.databaseId} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <SocialsShare link={router.asPath} />
        </div>
        {ncPostMetaData?.showRightSidebar && (
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <Sidebar content={content || ""} />
          </div>
        )}
      </div>
      <DynamicSingleRelatedPosts
        posts={props.data?.posts?.nodes as NcmazFcPostFullFieldsFragment[] || []}
        postDatabaseId={databaseId}
      />
    </PageLayout>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    post_databaseId: Number(databaseId || 0),
    asPreview: ctx?.asPreview,
    headerLocation: "PRIMARY",
    footerLocation: "FOOTER",
  };
};

Component.query = gql`
  query GetPostSiglePage($databaseId: ID!, $post_databaseId: Int, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      databaseId
      excerpt
      featuredImage {
        ...NcmazFcImageHasDetailFields
      }
      date
      author {
        ...NcmazFcUserFullFields
      }
      categories {
        nodes {
          databaseId
          name
        }
      }
      tags {
        nodes {
          databaseId
          name
        }
      }
      ncPostMetaData {
        showRightSidebar
      }
    }
    posts(where: { isRelatedOfPostId: $post_databaseId }) {
      nodes {
        ...NcmazFcPostFullFields
      }
    }
    generalSettings {
      title
      description
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        label
        url
        uri
        order
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 40) {
      nodes {
        label
        url
        uri
        order
      }
    }
  }
  
  fragment NcmazFcImageHasDetailFields on NcmazFcImageHasDetailFieldsFragment {
    sourceUrl
    altText
    caption
  }

  fragment NcmazFcUserFullFields on NcmazFcUserFullFieldsFragment {
    name
    username
    uri
    featuredImageMeta {
      ...NcmazFcImageFields
    }
    bgImageMeta {
      ...NcmazFcImageFields
    }
  }

  fragment NcmazFcImageFields on NcmazFcImageFieldsFragment {
    sourceUrl
    altText
  }

  fragment NcmazFcPostFullFields on Post {
    databaseId
    title
    uri
    date
    modified
    status
    featuredImage {
      ...NcmazFcImageHasDetailFields
    }
    author {
      ...NcmazFcUserFullFields
    }
    categories {
      nodes {
        databaseId
        name
        uri
      }
    }
    excerpt
    commentCount
    commentStatus
    postFormats {
      nodes {
        name
        slug
      }
    }
    ncmazVideoUrl {
      videoUrl
    }
    ncmazAudioUrl {
      audioUrl
    }
    ncPostMetaData {
      fieldGroupName
      favoriteButtonShortcode
      frontendDate
      likesCount
      marchConfirm
      newLikesCount
      showRightSidebar
      timeUpdate
      viewsCount
    }
    ncmazGalleryImgs {
      image0 {
        ...NcmazFcImageHasDetailFields
      }
      image1 {
        ...NcmazFcImageHasDetailFields
      }
      image2 {
        ...NcmazFcImageHasDetailFields
      }
      image3 {
        ...NcmazFcImageHasDetailFields
      }
      image4 {
        ...NcmazFcImageHasDetailFields
      }
      image5 {
        ...NcmazFcImageHasDetailFields
      }
      image6 {
        ...NcmazFcImageHasDetailFields
      }
      image7 {
        ...NcmazFcImageHasDetailFields
      }
    }
  }
`;

export default Component;
