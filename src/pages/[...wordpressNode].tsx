import { getWordPressProps, WordPressTemplate, getApolloClient } from "@faustwp/core";
import { GetStaticProps } from "next";
import { WordPressTemplateProps } from "../types";
import { gql } from "@apollo/client";

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

// Get the Apollo Client instance
const client = getApolloClient();

async function fetchAllPosts() {
  const { data } = await client.query({
    query: gql`
      query GetAllPostSlugs {
        posts(first: 1000) {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return data.posts.nodes.map((node: { uri: string }) => node.uri);
}

async function fetchAllCategories() {
  const { data } = await client.query({
    query: gql`
      query GetAllCategorySlugs {
        categories(first: 1000) {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return data.categories.nodes.map((node: { uri: string }) => node.uri);
}

export async function myGetPaths() {
  let posts = await fetchAllPosts();
  let categories = await fetchAllCategories();

  // Ensure there is at least one post and category to prevent errors
  if (!categories?.length) {
    categories = ["/category/uncategorized/"];
  }
  if (!posts?.length) {
    posts = ["/hello-world/"];
  }

  const paths = [...categories, ...posts];

  return paths.map((uri) => ({
    params: { wordpressNode: uri.replace(/^\/|\/$/g, "").split("/") },
  }));
}

export async function getStaticPaths() {
  const paths = await myGetPaths();

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return await getWordPressProps({ ctx, revalidate: 900 });
};
