import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { WordPressTemplateProps } from "../types";
import { GetStaticProps } from "next";
import SEO from '../components/SEO/SEO'; // Import the SEO component

export default function Page(props: WordPressTemplateProps) {
  return (
    <>
      <SEO 
        title="Home - Daily Fornex" 
        description="Welcome to Daily Fornex, your go-to resource for daily news, tips, and more."
        url="https://dailyfornex.com/"
      />
      <WordPressTemplate {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getWordPressProps({ ctx, revalidate: 900 });
};
