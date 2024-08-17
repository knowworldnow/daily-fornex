import { FC, useEffect, useState } from "react";

interface HeadingNode {
  id: string;
  text: string;
  level: number;
}

interface TableContentAnchorProps {
  content: string;
  className?: string;
}

const TableContentAnchor: FC<TableContentAnchorProps> = ({
  content,
  className = "",
}) => {
  const [headings, setHeadings] = useState<HeadingNode[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = Array.from(
      doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const extractedHeadings = headingElements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: parseInt(element.tagName.replace("H", "")),
    }));

    setHeadings(extractedHeadings);
  }, [content]);

  if (!headings.length) return null;

  const renderHeadings = (headings: HeadingNode[]) => {
    return (
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`ml-${heading.level * 2} text-sm text-neutral-700 dark:text-neutral-300`}
          >
            <a href={`#${heading.id}`} className="hover:underline">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}>
      <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
        On This Page
      </h2>
      {renderHeadings(headings)}
    </div>
  );
};

export default TableContentAnchor;
