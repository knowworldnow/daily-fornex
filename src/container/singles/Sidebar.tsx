import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import WidgetAddSubscriberForm from '@/components/WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import WidgetCategories from '@/components/WidgetCategories/WidgetCategories'
import WidgetSocialsFollow from '@/components/WidgetSocialsFollow/WidgetSocialsFollow'
import TableContentAnchor from './TableContentAnchor'
import React, { FC } from 'react'

export interface SidebarProps {
    className?: string
    categories: TCategoryCardFull[] | null
    content: string  // Add this line
}

export const Sidebar: FC<SidebarProps> = ({
    className = 'space-y-6 ',
    categories,
    content,  // Add this line
}) => {
    return (
        <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
            <TableContentAnchor 
                content={content} 
                className="text-sm text-neutral-700 dark:text-neutral-300 mb-6"
            />
            <WidgetAddSubscriberForm />
            <WidgetSocialsFollow />
            <WidgetCategories categories={categories || []} />
        </div>
    )
}
