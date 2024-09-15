import React, { FC } from 'react';
import TableContentAnchor from './TableContentAnchor';  // Assuming this is your TOC component

export interface SidebarProps {
  content: string;
}

export const Sidebar: FC<SidebarProps> = ({ content }) => {
  return (
    <div className="nc-SingleSidebar lg:sticky lg:top-24">
      <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
        <TableContentAnchor 
          content={content} 
          className="text-sm text-neutral-700 dark:text-neutral-300"
        />
      </div>
    </div>
  );
};

export default Sidebar;
