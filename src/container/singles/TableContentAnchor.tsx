import { flatListToHierarchical } from '@faustwp/core';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

type HeadingNode = {
  tag: string;
  id: string;
  text: string;
  level: number;
  parentIndex: number;
  parentId: string;
  children?: HeadingNode[];
};

interface TableContentProps {
  content: string;
  className?: string;
}

const TableContent: React.FC<TableContentProps> = ({ content, className = '' }) => {
  function extractHeadings(content: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = Array.from(
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );

    let headingsWithId: HeadingNode[] = headingElements.map((element, index) => {
      let id = element.getAttribute('id') || '';
      return {
        tag: element.tagName.toLowerCase(),
        id,
        level: parseInt(element.tagName.charAt(1)),
        parentIndex: -1,
        parentId: '',
        text: element.textContent || '',
      };
    });

    headingsWithId = headingsWithId.filter(item => !!item.id);

    headingsWithId = headingsWithId.map((item, index) => {
      let parentIndex = index - 1;
      while (parentIndex >= 0) {
        if (item.level > headingsWithId[parentIndex].level) {
          item.parentIndex = parentIndex;
          item.parentId = headingsWithId[parentIndex].id;
          break;
        }
        parentIndex--;
      }
      return item;
    });

    return flatListToHierarchical(headingsWithId, {
      idKey: 'id',
      parentKey: 'parentId',
    }) as HeadingNode[] | [];
  }

  const headingsWrapList = extractHeadings(content);

  const renderHeadings = (headings: HeadingNode[]) => {
    return (
      <>
        {headings.map(heading => (
          <li key={heading.id} className={`level-${heading.level}`}>
            <a
              className="inline-flex gap-2 hover:text-neutral-800 dark:hover:text-neutral-200"
              href={`#${heading.id}`}
            >
              <ArrowRightIcon className="h-3 w-3 flex-shrink-0 self-center rtl:rotate-180" />
              {heading.text}
            </a>
            {heading?.children?.length ? (
              <ol className="mt-2 space-y-3 ps-4 text-neutral-500 dark:text-neutral-300">
                {renderHeadings(heading.children)}
              </ol>
            ) : null}
          </li>
        ))}
      </>
    );
  };

  if (!headingsWrapList?.length) {
    return null;
  }

  return (
    <div className={className}>
      <nav>
        <h2 className="font-display text-sm font-medium text-slate-900 dark:text-white">
          On this page
        </h2>
        <div className="">
          <ol className="mt-4 space-y-3 text-sm">
            {renderHeadings(headingsWrapList)}
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default TableContent;
