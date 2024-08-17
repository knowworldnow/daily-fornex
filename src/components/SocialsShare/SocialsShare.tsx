import { FC } from 'react';
import { NcDropDownItem } from '../NcDropDown/NcDropDown';

export interface SocialsShareProps {
  className?: string;
  itemClass?: string;
  link: string;
}

export type TSocialShareItem = 'Facebook' | 'Twitter' | 'Linkedin' | 'Instagram' | 'Pinterest';

interface SocialShareType extends NcDropDownItem<TSocialShareItem> {}

export const SOCIALS_DATA: SocialShareType[] = [
  {
    id: 'Facebook',
    name: 'Facebook',
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Twitter',
    name: 'Twitter',
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M459.37 151.716a169.344 169.344 0 01-48.57 13.323 84.914 84.914 0 0037.46-46.92 170.01 170.01 0 01-53.81 20.56 85.24 85.24 0 00-145.07 77.69 241.632 241.632 0 01-175.39-89.02 85.244 85.244 0 0026.4 113.91 84.91 84.91 0 01-38.56-10.64v1.06a85.258 85.258 0 0068.37 83.67 85.567 85.567 0 01-38.39 1.45 85.224 85.224 0 0079.61 59.16 170.9 170.9 0 01-105.79 36.43 171.513 171.513 0 01-20.3-1.18 241.255 241.255 0 00130.84 38.34c157.24 0 243.16-130.22 243.16-243.12 0-3.71-.08-7.39-.23-11.06A173.588 173.588 0 00459.37 151.716z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Instagram',
    name: 'Instagram',
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9-51.3-114.9-114.9-114.9zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.3-93.7s-58-34.6-93.7-36.3c-37-2.1-147.8-2.1-184.8 0-35.7 1.7-67.3 9.9-93.7 36.3s-34.6 58-36.3 93.7c-2.1 37-2.1 147.8 0 184.8 1.7 35.7 9.9 67.3 36.3 93.7s58 34.6 93.7 36.3c37 2.1 147.8 2.1 184.8 0 35.7-1.7 67.3-9.9 93.7-36.3s34.6-58 36.3-93.7c2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.5-22.8 34.5-42.3 42.3-29.3 11.6-99 8.9-132.5 8.9s-103.2 2.6-132.5-8.9c-19.5-7.8-34.5-22.8-42.3-42.3-11.6-29.3-8.9-99-8.9-132.5s-2.6-103.2 8.9-132.5c7.8-19.5 22.8-34.5 42.3-42.3 29.3-11.6 99-8.9 132.5-8.9s103.2-2.6 132.5 8.9c19.5 7.8 34.5 22.8 42.3 42.3 11.6 29.3 8.9 99 8.9 132.5s2.6 103.2-8.9 132.5zm-174.7-85.4c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm100.3-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9 26.9 12 26.9 26.9z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Linkedin',
    name: 'Linkedin',
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Pinterest',
    name: 'Pinterest',
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M248.3 8C111 8 0 119.2 0 256.6c0 99.7 58.8 185 143.4 224.4-1.8-19.1-3.4-48.5.7-69 3.7-15.8 24.7-104.4 24.7-104.4s-6.2-12.4-6.2-30.7c0-28.8 16.7-50.4 37.4-50.4 17.7 0 26.3 13.3 26.3 29.3 0 17.9-11.4 44.7-17.3 69.5-4.9 20.9 10.4 37.9 31 37.9 37.2 0 66-39.2 66-95.7 0-50.1-36-85.2-87.3-85.2-59.5 0-94.6 44.5-94.6 90.4 0 17.9 7 37.1 15.8 47.5 1.8 2.2 2 4.2 1.5 6.5-1.7 7-5.4 22.3-6.1 25.5-.9 3.8-3.1 4.6-7.1 2.8-26.2-10.8-42.5-44.5-42.5-71.9 0-58.4 42.5-112.2 123-112.2 64.5 0 114.6 45.9 114.6 107.2 0 64.1-40.3 116-96.2 116-18.8 0-36.4-9.7-42.4-21.1 0 0-10.1 39.4-12.2 48.9-4.4 17.5-13 35-21.1 48.4 19.2 5.9 39.5 9 60.6 9 137.3 0 248.3-111.2 248.3-248.6S385.6 8 248.3 8z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
];

const SocialsShare: FC<SocialsShareProps> = ({
  className = 'grid gap-[6px]',
  itemClass = 'w-7 h-7 text-base hover:bg-neutral-100',
  link = '',
}) => {
  const actions = SOCIALS_DATA.map((item) => {
    if (item.id === 'Facebook') {
      item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    } else if (item.id === 'Twitter') {
      item.href = `https://twitter.com/intent/tweet?url=${link}`;
    } else if (item.id === 'Linkedin') {
      item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
    } else if (item.id === 'Instagram') {
      // Instagram does not support direct link sharing like the others.
      // Instead, users can be directed to a profile or a specific post.
      item.href = `https://www.instagram.com/`;
    } else if (item.id === 'Pinterest') {
      item.href = `https://pinterest.com/pin/create/button/?url=${link}`;
    }
    return item;
  });

  const renderItem = (item: SocialShareType, index: number) => {
    return (
      <a
        key={index}
        href={item.href}
        className={`flex items-center justify-center rounded-full leading-none text-neutral-600 ${itemClass}`}
        title={`Share on ${item.name}`}
        target={item.isTargetBlank ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsShare ${className}`}>
      {actions.map(renderItem)}
    </div>
  );
};

export default SocialsShare;
