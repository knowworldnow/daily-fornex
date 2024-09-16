import { gql } from "@apollo/client";
import { FaustTemplate } from "@faustwp/core";
import React, { ErrorInfo } from 'react';
import {
  GetPostSiglePageQuery,
} from "../__generated__/graphql";
import SingleContent from "@/container/singles/SingleContent";
import PageLayout from "@/container/PageLayout";
import { Sidebar } from "@/container/singles/Sidebar";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const Component: FaustTemplate<GetPostSiglePageQuery> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  console.log("Props received:", props);

  const post = props.data?.post;
  const generalSettings = props.data?.generalSettings;

  if (!post) {
    console.error("No post data received");
    return <div>Error: Post not found</div>;
  }

  console.log("Post data:", post);

  return (
    <ErrorBoundary>
      <PageLayout
        headerMenuItems={[]}
        footerMenuItems={[]}
        pageTitle={post.title || ""}
        pageDescription={post.excerpt || ""}
        generalSettings={generalSettings}
      >
        <div className="container flex flex-col my-10 lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>By {post.author?.node?.name || "Unknown Author"}</span>
            </div>
            <SingleContent post={post} />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <Sidebar content={post.content || ""} />
          </div>
        </div>
      </PageLayout>
    </ErrorBoundary>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: "PRIMARY",
    footerLocation: "FOOTER",
  };
};

Component.query = gql`
  query GetPostSiglePage($databaseId: ID!, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID) {
      title
      content
      date
      excerpt
      author {
        node {
          name
        }
      }
    }
    generalSettings {
      title
      description
    }
  }
`;

export default Component;
