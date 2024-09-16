import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import { getApolloClient } from '@faustwp/core';
import PageLayout from '@/container/PageLayout';
import Link from 'next/link';
import PostCardMetaV2 from '@/components/PostCardMeta/PostCardMetaV2';
import MyImage from '@/components/MyImage';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  uri: string;
  date: string;
  author: {
    node: {
      name: string;
      uri: string;
    };
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
  };
}

interface SearchResultsProps {
  posts: Post[];
  searchTerm: string;
}

const SEARCH_POSTS = gql`
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
            name
            uri
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
`;

const SearchResults: React.FC<SearchResultsProps> = ({ posts, searchTerm }) => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Search Results for "{searchTerm}"</h1>
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="flex border-b pb-8">
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="flex-shrink-0 mr-4">
                    <MyImage 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title} 
                      className="w-32 h-32 object-cover rounded"
                      sizes="128px"
                      fill
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <PostCardMetaV2
                    meta={{
                      ...post,
                      author: post.author.node,
                    }}
                    hiddenAvatar={false}
                    className="mb-2"
                    titleClassName="text-xl"
                    avatarSize="h-10 w-10"
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
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No results found.</p>
        )}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchTerm = context.query.q as string || '';
  const client = getApolloClient(context);
  
  const { data } = await client.query({
    query: SEARCH_POSTS,
    variables: { search: searchTerm },
  });

  return {
    props: {
      posts: data.posts.nodes,
      searchTerm,
    },
  };
};

export default SearchResults;
