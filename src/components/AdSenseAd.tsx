import React from 'react';
import Script from 'next/script';

const AdSenseAd = () => {
  return (
    <div className="adsense-widget">
      {/* Load the AdSense script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7892867039237421"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* AdSense ad slot */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7892867039237421"
        data-ad-slot="7560629194"
      ></ins>

      {/* Initialize the ad slot */}
      <Script id="ads-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
};

export default AdSenseAd;
