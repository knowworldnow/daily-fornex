import { FC } from 'react';

export interface SocialsShareProps {
  link: string;
  className?: string;
}

const SocialsShare: FC<SocialsShareProps> = ({ link, className = '' }) => {
  const SOCIALS_DATA = [
    {
      id: 'Facebook',
      name: 'Facebook',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.594 0 0 .594 0 1.325v21.351C0 23.407.594 24 1.325 24h11.495v-9.294H9.689V11.22h3.131V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.764v2.312h3.587l-.467 3.486h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .594 23.406 0 22.675 0z" /></svg>`,
      href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
    },
    {
      id: 'Twitter',
      name: 'Twitter',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.391-1.83.654-2.825.775a4.93 4.93 0 0 0 2.163-2.724 9.864 9.864 0 0 1-3.127 1.2 4.924 4.924 0 0 0-8.384 4.487A13.978 13.978 0 0 1 1.675 3.149a4.923 4.923 0 0 0 1.524 6.573 4.9 4.9 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.946 4.89a4.932 4.932 0 0 1-2.224.085 4.928 4.928 0 0 0 4.6 3.417 9.867 9.867 0 0 1-6.102 2.104c-.395 0-.786-.023-1.174-.068a13.933 13.933 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.006-.42-.017-.63A9.936 9.936 0 0 0 24 4.59z" /></svg>`,
      href: `https://twitter.com/intent/tweet?url=${link}`,
    },
    {
      id: 'Instagram',
      name: 'Instagram',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.053.072 5.775.131 4.497.385 3.432 1.45 2.367 2.515 2.113 3.794 2.054 5.072 1.995 6.351 1.981 6.761 1.981 12c0 5.239.014 5.649.072 6.928.059 1.278.313 2.556 1.378 3.621 1.065 1.065 2.343 1.319 3.621 1.378 1.279.059 1.688.072 6.928.072s5.649-.014 6.928-.072c1.278-.059 2.556-.313 3.621-1.378 1.065-1.065 1.319-2.343 1.378-3.621.059-1.279.072-1.688.072-6.928s-.014-5.649-.072-6.928c-.059-1.278-.313-2.556-1.378-3.621C19.556 1.835 18.278 1.581 17 1.522 15.721 1.463 15.311 1.449 12 1.449zm0 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.17a4.007 4.007 0 1 1 0-8.014 4.007 4.007 0 0 1 0 8.014zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" /></svg>`,
      href: `https://www.instagram.com/?url=${link}`,
    },
    {
      id: 'LinkedIn',
      name: 'LinkedIn',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.757 0-5 2.243-5 5v14c0 2.757 2.243 5 5 5h14c2.757 0 5-2.243 5-5v-14c0-2.757-2.243-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.357c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.357h-3v-5.5c0-3.005-4-2.777-4 0v5.5h-3v-10h3v1.375c1.396-2.586 7-2.777 7 2.476v6.149z" /></svg>`,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${link}`,
    },
    {
      id: 'Pinterest',
      name: 'Pinterest',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.01 0c-6.627 0-12 5.373-12 12 0 5.052 3.766 9.282 8.741 10.462-.119-1.045-.226-2.648.045-3.792.247-1.013 1.594-6.841 1.594-6.841s-.406-.814-.406-2.017c0-1.892 1.099-3.305 2.464-3.305 1.162 0 1.725.872 1.725 1.916 0 1.166-.744 2.906-1.128 4.524-.321 1.346.679 2.445 2.008 2.445 2.41 0 4.261-2.54 4.261-6.198 0-3.236-2.326-5.503-5.646-5.503-3.848 0-6.292 2.885-6.292 5.855 0 1.165.45 2.419 1.014 3.099.112.134.128.251.095.387-.103.407-.334 1.346-.38 1.535-.06.241-.194.293-.451.178-1.681-.736-2.731-3.043-2.731-4.908 0-3.994 3.221-8.787 9.633-8.787 5.082 0 8.437 3.674 8.437 7.616 0 5.215-2.908 9.104-7.171 9.104-1.441 0-2.795-.765-3.255-1.631l-.887 3.392c-.319 1.216-1.18 2.736-1.76 3.665 1.327.407 2.73.631 4.195.631 6.627 0 12-5.373 12-12s-5.373-12-12-12z" /></svg>`,
      href: `https://pinterest.com/pin/create/button/?url=${link}`,
    },
  ];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="font-semibold text-white">Feel free to share:</span>
      {SOCIALS_DATA.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: getBackgroundColor(item.id) }}
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
      ))}
    </div>
  );
};

// Helper function to get background color based on the social platform
const getBackgroundColor = (platform: string) => {
  switch (platform) {
    case 'Facebook':
      return '#1877F2'; // Facebook blue
    case 'Twitter':
      return '#1DA1F2'; // Twitter blue
    case 'Instagram':
      return '#E1306C'; // Instagram gradient
    case 'LinkedIn':
      return '#0077B5'; // LinkedIn blue
    case 'Pinterest':
      return '#E60023'; // Pinterest red
    default:
      return '#000'; // Default color if not matched
  }
};

export default SocialsShare;
