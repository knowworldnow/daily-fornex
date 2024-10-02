'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SocialSharePanelProps {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

const SocialSharePanel: React.FC<SocialSharePanelProps> = ({ url, title, description, imageUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: '/facebook.svg',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: '/twitter.svg',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: '/linkedin.svg',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
    },
    {
      name: 'WhatsApp',
      icon: '/whatsapp.svg',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    },
    {
      name: 'Pinterest',
      icon: '/pinterest.svg',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`
    },
  ];

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed z-50 md:left-4 md:top-1/2 md:-translate-y-1/2 bottom-0 left-0 right-0">
      <div className="w-full md:w-auto flex md:flex-col justify-around items-center bg-teal-800 py-2 px-2 md:rounded-lg md:py-3 md:px-3 shadow-lg">
        <span className="text-white text-xs md:text-sm font-semibold md:mb-2">Share:</span>
        <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label={`Share on ${link.name}`}
            >
              <Image 
                src={link.icon} 
                alt={`${link.name} icon`} 
                width={24} 
                height={24} 
                className="w-6 h-6 md:w-7 md:h-7" 
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialSharePanel;
