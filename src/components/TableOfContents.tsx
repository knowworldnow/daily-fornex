import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    // Create a DOM parser to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Extract h2 and h3 elements
    const headingElements = Array.from(
      doc.querySelectorAll("h2, h3")
    ) as HTMLElement[];

    // Create a list of headings with their text and IDs
    const extractedHeadings = headingElements.map((heading) => {
      const id = heading.innerText.toLowerCase().replace(/\s+/g, "-");
      heading.id = id; // Assign an ID if it doesn’t exist
      return {
        id,
        text: heading.innerText,
      };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null; // Don't render if no headings
  }

  return (
    <div className="toc-container mb-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Table of Contents</h3>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-blue-500 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
