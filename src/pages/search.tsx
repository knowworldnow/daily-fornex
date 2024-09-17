import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getApolloClient } from '@faustwp/core';
import PageLayout from '@/container/PageLayout';
import Link from 'next/link';
import PostCardMetaV2 from '@/components/PostCardMeta/PostCardMetaV2';
import Image from 'next/image';
import { FragmentType, useFragment } from '@/__generated__';
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  uri: string;
  date: string;
  author: {
    node: FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>;
  };
  categories: {
    nodes: Array<{
      name: string;
      uri: string;
    }>;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
}

interface SearchResultsProps {
  posts: Post[];
  searchTerm: string;
}

const SEARCH_POSTS_QUERY = `
  query SearchPosts($search: String!) {
    posts(where: { search: $search }, first: 10) {
      nodes {
        id
        title
        excerpt
        uri
        date
        author {
          node {
            ...NcUserFullFieldsFragment
          }
        }
        categories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
  ${NC_USER_FULL_FIELDS_FRAGMENT}
`;

const SearchResults: React.FC<SearchResultsProps> = ({ posts, searchTerm }) => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Search Results for "{searchTerm}"</h1>
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => {
              const author = useFragment(NC_USER_FULL_FIELDS_FRAGMENT, post.author.node);
              return (
                <div key={post.id} className="flex border-b pb-8">
                  {post.featuredImage?.node?.sourceUrl && (
                    <div className="flex-shrink-0 mr-4 relative w-32 h-32">
                      <Image 
                        src={post.featuredImage.node.sourceUrl} 
                        alt={post.featuredImage.node.altText || post.title} 
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <PostCardMetaV2
                      meta={{
                        date: post.date,
                        author: author,
                        title: post.title,
                        uri: post.uri,
                      }}
                      hiddenAvatar={false}
                      className="mb-2"
                      titleClassName="text-xl"
                      avatarSize="h-10 w-10"
                      disableAuthorLink={true}
                    />
                    <div 
                      dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                      className="text-gray-700 mt-2"
                    />
                    <div className="mt-2">
                      {post.categories.nodes.map((category) => (
                        <Link 
                          key={category.uri}
                          href={category.uri}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg">No results found.</p>
        )}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const searchTerm = context.query.q as string || '';
  const client = getApolloClient();
  
  try {
    const { data } = await client.query({
      query: gql(SEARCH_POSTS_QUERY),
      variables: { search: searchTerm },
    });

    return {
      props: {
        posts: data.posts.nodes,
        searchTerm,
      },
    };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return {
      props: {
        posts: [],
        searchTerm,
      },
    };
  }
};

export default SearchResults;
