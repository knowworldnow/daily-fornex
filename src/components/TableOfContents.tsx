'use client'

import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

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
  const [activeId, setActiveId] = useState<string>('');

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

  const handleScroll = useCallback(debounce(() => {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    const scrollPosition = window.scrollY;

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i] as HTMLElement;
      if (heading.offsetTop <= scrollPosition + 100) {
        setActiveId(heading.id);
        break;
      }
    }
  }, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  return (
    <nav className="sticky top-8 hidden lg:block max-h-[calc(100vh-4rem)] overflow-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
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
                className={`block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  activeId === item.id ? 'text-blue-600 dark:text-blue-400' : ''
                }`}
                onClick={(e) => handleClick(e, item.id)}
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
