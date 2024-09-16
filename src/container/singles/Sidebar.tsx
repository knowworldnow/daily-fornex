import React, { FC, useEffect } from 'react'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import WidgetAddSubscriberForm from '@/components/WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import WidgetCategories from '@/components/WidgetCategories/WidgetCategories'
import WidgetSocialsFollow from '@/components/WidgetSocialsFollow/WidgetSocialsFollow'
import TableContent from './TableContent'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export interface SidebarProps {
  className?: string
  categories: TCategoryCardFull[] | null
  content: string
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6 ',
  categories,
  content,
}) => {
  useEffect(() => {
    // Initialize Google AdSense script
    if (window) {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    }
  }, [])

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
      <WidgetAddSubscriberForm />
      <WidgetSocialsFollow />
      {/* Google AdSense Ad */}
      <div className="adsense-widget sticky">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7892867039237421"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7892867039237421"
          data-ad-slot="3608941742"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <WidgetCategories categories={categories || []} />
    </div>
  )
}

export default Sidebar
