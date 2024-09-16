import React, { FC } from 'react'
import TableContent from './TableContentAnchor'

export interface SidebarProps {
  className?: string
  content: string
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6 ',
  content,
}) => {
  return (
    <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
      <TableContent
        content={content}
        className="mb-6"
        renderTOC={(headings) => (
          <div className="bg-neutral-100 p-4 rounded-lg dark:bg-neutral-800">
            <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
            <ol className="space-y-2 text-sm">
              {headings.map((heading, index) => (
                <li key={index} className={`pl-${heading.level * 2}`}>
                  <a href={`#${heading.id}`} className="text-blue-600 hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      />
    </div>
  )
}

export default Sidebar
