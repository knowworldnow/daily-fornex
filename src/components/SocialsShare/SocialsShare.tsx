import { FC } from 'react';
import Image from 'next/image';

export interface SocialsShareProps {
  link: string;
}

const SocialsShare: FC<SocialsShareProps> = ({ link }) => {
  const socials = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      icon: '/images/socials/facebook.svg', // Corrected path for Facebook
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${link}`,
      icon: '/images/socials/x-twitter.svg', // Corrected path for Twitter
    },
    {
      name: 'Instagram',
      href: `https://instagram.com/`, // Instagram doesn’t allow direct link sharing
      icon: '/images/socials/instagram.svg', // Corrected path for Instagram
    },
    {
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${link}`,
      icon: '/images/socials/pinterest.svg', // Corrected path for Pinterest
    },
  ];

  return (
    <div className="flex items-center space-x-3">
      <span className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
        Feel free to share:
      </span>
      <div className="flex space-x-4">
        {socials.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialsShare;
