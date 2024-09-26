import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const processContent = (content: string): React.ReactNode => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const processNode = (node: Node): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const children = Array.from(element.childNodes).map(processNode);

        if (element.tagName.toLowerCase() === 'table') {
          return (
            <Table>
              {children}
            </Table>
          );
        }

        if (element.tagName.toLowerCase() === 'thead') {
          return <TableHead>{children}</TableHead>;
        }

        if (element.tagName.toLowerCase() === 'tbody') {
          return <TableBody>{children}</TableBody>;
        }

        if (element.tagName.toLowerCase() === 'tr') {
          return <TableRow>{children}</TableRow>;
        }

        if (element.tagName.toLowerCase() === 'th') {
          return <TableHeader>{children}</TableHeader>;
        }

        if (element.tagName.toLowerCase() === 'td') {
          return <TableCell>{children}</TableCell>;
        }

        if (element.tagName.toLowerCase() === 'blockquote') {
          return <blockquote className="wp-block-quote">{children}</blockquote>;
        }

        if (element.classList.contains('wp-block-pullquote')) {
          return <aside className="wp-block-pullquote">{children}</aside>;
        }

        const Tag = element.tagName.toLowerCase() as keyof JSX.IntrinsicElements;
        const classes = Array.from(element.classList).map(cls => `wp-${cls}`).join(' ');

        return React.createElement(Tag, { className: classes }, children);
      }

      return null;
    };

    return processNode(doc.body);
  };

  const processedContent = processContent(content);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none wp-content">
      {processedContent}
    </div>
  );
}
