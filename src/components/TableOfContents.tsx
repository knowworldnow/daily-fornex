// src/components/TableOfContents.tsx
import React from "react";

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // Extract headings (h2, h3, etc.)
  const headings = Array.from(doc.querySelectorAll("h2, h3"));

  return (
    <nav className="toc">
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.textContent}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
