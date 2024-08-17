import React, { useEffect, useState } from "react";

// Define the shape of the headings
interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string; // The raw HTML content of your post
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Parse the HTML content and extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = Array.from(
      doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const extractedHeadings: Heading[] = headingElements.map((element) => ({
      id: element.id || "",
      text: element.textContent || "",
      level: parseInt(element.tagName.replace("H", "")),
    }));

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null; // If there are no headings, don't render the TOC
  }

  return (
    <nav className="toc-container mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700">
      <h3 className="font-semibold mb-4">On This Page</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${heading.level * 10}`}>
            <a href={`#${heading.id}`} className="hover:text-blue-600">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
