import React, { FC } from 'react';
import TableContent from './TableContentAnchor';

export interface SidebarProps {
  className?: string;
  content: string;
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6 ',
  content,
}) => {
  return (
    <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
      <TableContent content={content} />
    </div>
  );
};

export default Sidebar;
