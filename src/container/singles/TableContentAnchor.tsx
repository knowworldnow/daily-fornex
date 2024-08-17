// src/components/TableOfContents.tsx

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Parse the HTML content and extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3');

    const headingArray: Heading[] = [];
    headingElements.forEach((heading) => {
      headingArray.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setHeadings(headingArray);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="font-bold text-lg mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${(heading.level - 1) * 4}`}>
            <a href={`#${heading.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
