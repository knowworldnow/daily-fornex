import { FC } from 'react';
import WidgetHeading1 from '../WidgetHeading1/WidgetHeading1';
import Image from 'next/image';

interface WidgetSocialsFollowProps {
  className?: string;
}

const WidgetSocialsFollow: FC<WidgetSocialsFollowProps> = ({
  className = 'rounded-3xl border border-neutral-100 dark:border-neutral-700',
}) => {
  const socials = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/dailyfornex',
      icon: '/images/socials/facebook.svg', // Path to the Facebook icon
      description: 'Follow us on Facebook',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/dailyfornex',
      icon: '/images/socials/x-twitter.svg', // Path to the Twitter icon
      description: 'Follow us on Twitter',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/dailyfornex',
      icon: '/images/socials/instagram.svg', // Path to the Instagram icon
      description: 'Follow us on Instagram',
    },
    {
      name: 'Pinterest',
      url: 'https://pinterest.com/dailyfornex',
      icon: '/images/socials/pinterest.svg', // You need to add the Pinterest icon if it’s missing
      description: 'Follow us on Pinterest',
    },
  ];

  return (
    <div className={`nc-WidgetSocialsFollow overflow-hidden ${className}`}>
      <WidgetHeading1 title="🧬 We are on socials" />
      <div className="grid grid-cols-2">
        {socials.map((social, index) => (
          <a
            key={index}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-400 dark:ring-0">
              <Image
                src={social.icon}
                alt={social.name}
                width={36}
                height={36}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-full flex-none text-sm font-medium capitalize text-neutral-900 dark:text-neutral-100">
                {social.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                <span className="line-clamp-1">{social.description}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WidgetSocialsFollow;
