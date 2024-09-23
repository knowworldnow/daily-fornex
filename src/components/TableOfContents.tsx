'use client'

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3, h4, h5, h6');
    const tocItems: TOCItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setToc(tocItems);
  }, [content]);

  return (
    <nav className="sticky top-8 hidden md:block max-h-[calc(100vh-4rem)] overflow-auto pt-8 pl-8">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Table of Contents</h2>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li 
              key={item.id} 
              className={`py-1 ${item.level === 2 ? 'font-semibold' : 'font-normal'}`}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a 
                href={`#${item.id}`} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
