import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';
import { Quote } from './Quote';
import { PullQuote } from './PullQuote';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const processContent = (content: string) => {
    // Process tables
    content = content.replace(
      /<table[^>]*>([\s\S]*?)<\/table>/g,
      (_, tableContent) => {
        const processedTable = tableContent
          .replace(/<thead>([\s\S]*?)<\/thead>/g, (_, headContent) => `<TableHead>${headContent}</TableHead>`)
          .replace(/<tbody>([\s\S]*?)<\/tbody>/g, (_, bodyContent) => `<TableBody>${bodyContent}</TableBody>`)
          .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/g, (_, rowContent) => `<TableRow>${rowContent}</TableRow>`)
          .replace(/<th[^>]*>([\s\S]*?)<\/th>/g, (_, headerContent) => `<TableHeader>${headerContent}</TableHeader>`)
          .replace(/<td[^>]*>([\s\S]*?)<\/td>/g, (_, cellContent) => `<TableCell>${cellContent}</TableCell>`);
        
        return `<Table>${processedTable}</Table>`;
      }
    );

    // Process quotes
    content = content.replace(
      /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g,
      (_, quoteContent) => `<Quote>${quoteContent}</Quote>`
    );

    // Process pull quotes
    content = content.replace(
      /<p[^>]*class="[^"]*wp-block-pullquote[^"]*"[^>]*>([\s\S]*?)<\/p>/g,
      (_, pullQuoteContent) => `<PullQuote>${pullQuoteContent}</PullQuote>`
    );

    // Process alignments and other custom styles
    content = content.replace(
      /<([a-z]+)\s+class="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/g,
      (_, tag, classes, innerContent) => {
        const processedClasses = classes.split(' ').map(cls => `wp-${cls}`).join(' ');
        return `<${tag} class="${processedClasses}">${innerContent}</${tag}>`;
      }
    );

    return content;
  };

  const processedContent = processContent(content);

  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none wp-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
