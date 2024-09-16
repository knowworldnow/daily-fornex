import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import { getApolloClient } from '@faustwp/core';
import PageLayout from '@/components/PageLayout';
import PostCard from '@/components/PostCard';

const SEARCH_POSTS = gql`
  query SearchPosts($search: String!) {
    posts(first: 10, where: { search: $search }) {
      nodes {
        id
        title
        excerpt
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

const SearchResults = ({ posts, searchTerm }) => {
  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold">Search Results for "{searchTerm}"</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {posts.length === 0 && <p className="text-center text-lg">No results found.</p>}
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
