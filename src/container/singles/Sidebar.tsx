import React, { FC } from 'react';
import TableContentAnchor from './TableContentAnchor';

export interface SidebarProps {
  className?: string;
  content: string;
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6',
  content,
}) => {
  return (
    <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
      <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
        <TableContentAnchor 
          content={content} 
          className="text-sm text-neutral-700 dark:text-neutral-300"
        />
      </div>
    </div>
  );
};

export default Sidebar;
