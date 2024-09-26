import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const processContent = (content: string): string => {
    // Process tables
    content = content.replace(
      /<table[^>]*>([\s\S]*?)<\/table>/g,
      (_, tableContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableContent, 'text/html');
        const rows = doc.querySelectorAll('tr');
        let tableJsx = '<Table>';

        rows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll('th, td');
          let rowJsx = rowIndex === 0 ? '<TableHead><TableRow>' : '<TableRow>';

          cells.forEach((cell) => {
            const cellContent = cell.innerHTML;
            if (cell.tagName.toLowerCase() === 'th') {
              rowJsx += `<TableHeader>${cellContent}</TableHeader>`;
            } else {
              rowJsx += `<TableCell>${cellContent}</TableCell>`;
            }
          });

          rowJsx += '</TableRow>';
          if (rowIndex === 0) rowJsx += '</TableHead>';
          
          if (rowIndex === 1) tableJsx += '<TableBody>';
          tableJsx += rowJsx;
        });

        tableJsx += '</TableBody></Table>';
        return tableJsx;
      }
    );

    // Process quotes
    content = content.replace(
      /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g,
      (_, quoteContent) => `<blockquote class="wp-block-quote">${quoteContent}</blockquote>`
    );

    // Process pull quotes
    content = content.replace(
      /<p[^>]*class="[^"]*wp-block-pullquote[^"]*"[^>]*>([\s\S]*?)<\/p>/g,
      (_, pullQuoteContent) => `<aside class="wp-block-pullquote">${pullQuoteContent}</aside>`
    );

    // Process alignments and other custom styles
    content = content.replace(
      /<([a-z]+)\s+class="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/g,
      (_, tag: string, classes: string, innerContent: string) => {
        const processedClasses = classes.split(' ').map((cls: string) => `wp-${cls}`).join(' ');
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
