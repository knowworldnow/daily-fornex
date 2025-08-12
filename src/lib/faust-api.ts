import { gql } from '@apollo/client';
import { client } from './apollo-client';
import { Post, Category, Page, GetAllPostsResult, GetPageBySlugResult, GetPostBySlugResult, GetCategoriesResult, GetPostsByCategoryResult, GetCategoryBySlugResult, GetAllCategoriesResult, SearchPostsResult } from '../types';

// Helper function to handle GraphQL errors gracefully
const handleGraphQLError = (error: any, operation: string, fallback: any = null) => {
  console.error(`GraphQL ${operation} failed:`, {
    message: error.message,
    networkError: error.networkError,
    graphQLErrors: error.graphQLErrors,
  });
  
  // In production/build environment, return fallback instead of throwing
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    console.warn(`Returning fallback for ${operation} to prevent build failure`);
    return fallback;
  }
  
  // In development, throw the error for debugging
  throw error;
};

export async function getLatestPosts({ first = 20, after = null }: { first?: number; after?: string | null } = {}): Promise<GetAllPostsResult> {
  try {
    const { data } = await client.query<GetAllPostsResult>({
      query: gql`
        query GetLatestPosts($first: Int!, $after: String) {
          posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              excerpt
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `,
      variables: { first, after },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data;
  } catch (error) {
    return handleGraphQLError(error, 'getLatestPosts', {
      posts: {
        pageInfo: { hasNextPage: false, endCursor: null },
        nodes: []
      }
    });
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log(`Fetching post by slug: ${slug}`);
    
    const { data } = await client.query<GetPostBySlugResult>({
      query: gql`
        query GetPostBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
            id
            title
            content
            date
            excerpt
            slug
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                id
                name
                slug
              }
            }
            comments(where: { status: "APPROVE" }) {
              nodes {
                id
                content
                date
                author {
                  node {
                    name
                    email
                    isRestricted
                    avatar {
                      url
                    }
                  }
                }
              }
            }
            faqItems {
              question
              answer
            }
          }
        }
      `,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
      context: {
        fetchOptions: {
          timeout: 15000,
        },
      },
    });

    return data.post;
  } catch (error) {
    return handleGraphQLError(error, `getPostBySlug(${slug})`, null);
  }
}

export async function getRelatedPosts(categoryId: string, currentPostId: string, first: number = 4): Promise<Post[]> {
  if (!categoryId) {
    console.error('categoryId is undefined or null');
    return [];
  }

  console.log('Fetching related posts with:', { categoryId, currentPostId, first });

  try {
    const { data } = await client.query<{ posts: { nodes: Post[] } }>({
      query: gql`
        query GetRelatedPosts($categoryId: ID!, $currentPostId: ID!, $first: Int!) {
          posts(
            first: $first,
            where: { categoryIn: [$categoryId], notIn: [$currentPostId] }
          ) {
            nodes {
              id
              title
              slug
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                }
              }
            }
          }
        }
      `,
      variables: { categoryId, currentPostId, first },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    console.log('Related posts fetched:', data.posts.nodes);
    return data.posts.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'getRelatedPosts', []);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await client.query<GetCategoriesResult>({
      query: gql`
        query GetCategories {
          categories(first: 100) {
            nodes {
              id
              name
              slug
              count
              description
            }
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.categories.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'getCategories', []);
  }
}

export async function getPostsByCategory(categorySlug: string, first: number, after: string | null = null) {
  try {
    const { data } = await client.query<GetPostsByCategoryResult>({
      query: gql`
        query GetPostsByCategory($categorySlug: String!, $first: Int!, $after: String) {
          posts(where: { categoryName: $categorySlug }, first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `,
      variables: { categorySlug, first, after },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data;
  } catch (error) {
    return handleGraphQLError(error, 'getPostsByCategory', {
      posts: {
        pageInfo: { hasNextPage: false, endCursor: null },
        nodes: []
      }
    });
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data } = await client.query<GetCategoryBySlugResult>({
      query: gql`
        query GetCategoryBySlug($slug: ID!) {
          category(id: $slug, idType: SLUG) {
            id
            name
            slug
            count
            description
          }
        }
      `,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.category;
  } catch (error) {
    return handleGraphQLError(error, `getCategoryBySlug(${slug})`, null);
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const { data } = await client.query<GetAllCategoriesResult>({
      query: gql`
        query GetAllCategories {
          categories(first: 100) {
            nodes {
              id
              name
              slug
              count
              description
            }
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.categories.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'getAllCategories', []);
  }
}

export async function searchPosts(searchTerm: string, first: number = 10): Promise<Post[]> {
  try {
    const { data } = await client.query<SearchPostsResult>({
      query: gql`
        query SearchPosts($searchTerm: String!, $first: Int!) {
          posts(first: $first, where: { search: $searchTerm }) {
            nodes {
              id
              title
              slug
              date
              excerpt
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `,
      variables: { searchTerm, first },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.posts.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'searchPosts', []);
  }
}

export async function submitComment(postId: string, name: string, email: string, content: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: postId,
        author_name: name,
        author_email: email,
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit comment: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    console.log(`Fetching page by slug: ${slug}`);
    
    const { data } = await client.query<GetPageBySlugResult>({
      query: gql`
        query GetPageBySlug($slug: ID!) {
          page(id: $slug, idType: URI) {
            id
            title
            content
            date
            slug
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      `,
      variables: { slug },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
      context: {
        fetchOptions: {
          timeout: 15000,
        },
      },
    });

    console.log(`Page data fetched for ${slug}:`, data.page ? 'found' : 'not found');
    return data.page;
  } catch (error) {
    return handleGraphQLError(error, `getPageBySlug(${slug})`, null);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data } = await client.query<GetAllPostsResult>({
      query: gql`
        query GetAllPosts {
          posts(first: 1000) {
            nodes {
              id
              title
              slug
              excerpt
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.posts.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'getAllPosts', []);
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    const { data } = await client.query<{ pages: { nodes: Page[] } }>({
      query: gql`
        query GetAllPages {
          pages(first: 1000) {
            nodes {
              id
              title
              slug
              date
              excerpt
            }
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    return data.pages.nodes;
  } catch (error) {
    return handleGraphQLError(error, 'getAllPages', []);
  }
}

// Helper function to test GraphQL connection
export async function testGraphQLConnection(): Promise<boolean> {
  try {
    const { data } = await client.query({
      query: gql`
        query TestConnection {
          generalSettings {
            title
            url
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    });
    
    console.log('GraphQL connection test successful:', data?.generalSettings);
    return true;
  } catch (error) {
    console.error('GraphQL connection test failed:', error);
    return false;
  }
}
