import React from 'react';

// Helper function to extract headings from the content
const extractHeadings = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headingElements = Array.from(
    doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );

  return headingElements.map((element) => ({
    id: element.id,
    text: element.textContent || '',
    level: parseInt(element.tagName[1]),
  }));
};

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const headings = extractHeadings(content);

  if (headings.length === 0) {
    return null; // If no headings, don't show TOC
  }

  return (
    <nav aria-label="Table of contents">
      <h2>On this page</h2>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: `${heading.level - 1}rem` }}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
