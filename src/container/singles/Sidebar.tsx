import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1';
import WidgetAddSubscriberForm from '@/components/WidgetAddSubscriberForm/WidgetAddSubscriberForm';
import WidgetCategories from '@/components/WidgetCategories/WidgetCategories';
import WidgetSocialsFollow from '@/components/WidgetSocialsFollow/WidgetSocialsFollow';
import React, { FC, useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface SidebarProps {
  className?: string;
  categories: TCategoryCardFull[] | null;
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6 ',
  categories,
}) => {

  useEffect(() => {
    // Initialize Google AdSense script
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
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
  );
};

export default Sidebar;
