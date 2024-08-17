import { FC } from 'react';
import { NcDropDownItem } from '../NcDropDown/NcDropDown';

export interface SocialsShareProps {
    className?: string;
    itemClass?: string;
    link: string;
}

export type TSocialShareItem = 'Facebook' | 'Twitter' | 'Instagram' | 'Linkedin' | 'Pinterest';

interface SocialShareType extends NcDropDownItem<TSocialShareItem> {}

export const SOCIALS_DATA: SocialShareType[] = [
    {
        id: 'Facebook',
        name: 'Facebook',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>`,
        href: '#',
        isTargetBlank: true,
        bgClass: 'bg-blue-600'
    },
    {
        id: 'Twitter',
        name: 'Twitter',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M512 97.248c-19.04 8.354-39.32 14-60.248 16.554 21.66-12.98 38.34-33.555 46.184-58.008-20.28 12.032-42.688 20.78-66.616 25.452C414.73 59.555 388.38 48 359.92 48c-54.625 0-98.96 44.33-98.96 98.96 0 7.76.88 15.3 2.56 22.52C172.3 165.955 91.375 121.725 42.984 57.578 31.6 80.345 31.6 106.53 47.716 125.445 33.276 124.945 20.588 121.015 9.92 114.425c-2.28 39.46 27.64 76.16 70.832 84.195-13.44 3.62-27.6 4.2-42.248 1.58C72.636 211.715 114.79 227.75 160 228.555c-34.164 26.76-77.62 42.68-124.8 42.68-8.12 0-16.12-.48-24-.99C54.792 285.495 111.905 304 175.92 304c211.6 0 327.2-175.335 327.2-327.2 0-4.96-.11-9.895-.34-14.8 22.68-16.38 42.08-36.93 57.52-60.75z"/></svg>`,
        href: '#',
        isTargetBlank: true,
        bgClass: 'bg-blue-400'
    },
    {
        id: 'Instagram',
        name: 'Instagram',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M224 109.2c63.6 0 71.2 0 96.1.5 20.3.4 31.5 9.1 38.9 15.7 8.3 7.7 14.2 18.6 15.9 38.8.5 24.9.5 32.5.5 96.1s0 71.2-.5 96.1c-1.7 20.3-7.6 31.2-15.9 38.9-7.5 6.5-18.7 15.2-38.9 15.7-24.9.5-32.5.5-96.1.5s-71.2 0-96.1-.5c-20.3-.5-31.5-9.1-38.9-15.7-8.3-7.7-14.2-18.6-15.9-38.8-.5-24.9-.5-32.5-.5-96.1s0-71.2.5-96.1c1.7-20.3 7.6-31.2 15.9-38.9 7.5-6.5 18.7-15.2 38.9-15.7 24.9-.5 32.5-.5 96.1-.5m0-32.1c-64.2 0-72.2 0-97.4.5-26.4.6-44.9 5.6-61.1 18.2-15.8 12.3-26.9 30.2-32.8 55.8-1.3 5.8-2.1 12.1-2.6 27.4-.5 25.1-.5 33-.5 97.4s0 72.2.5 97.4c.5 15.2 1.3 21.6 2.6 27.4 5.9 25.6 17 43.5 32.8 55.8 16.2 12.6 34.7 17.6 61.1 18.2 25.1.5 33.1.5 97.4.5s72.2 0 97.4-.5c26.4-.6 44.9-5.6 61.1-18.2 15.8-12.3 26.9-30.2 32.8-55.8 1.3-5.8 2.1-12.1 2.6-27.4.5-25.1.5-33 .5-97.4s0-72.2-.5-97.4c-.5-15.2-1.3-21.6-2.6-27.4-5.9-25.6-17-43.5-32.8-55.8-16.2-12.6-34.7-17.6-61.1-18.2-25.1-.5-33.1-.5-97.4-.5zm0 80.7c-50.7 0-91.8 41.1-91.8 91.8s41.1 91.8 91.8 91.8 91.8-41.1 91.8-91.8-41.1-91.8-91.8-91.8zm0 151.4c-32.8 0-59.5-26.7-59.5-59.5s26.7-59.5 59.5-59.5 59.5 26.7 59.5 59.5-26.7 59.5-59.5 59.5zm122.4-140.9c-14.7 0-26.7-12-26.7-26.7s12-26.7 26.7-26.7 26.7 12 26.7 26.7-12 26.7-26.7 26.7z"/></svg>`,
        href: '#',
        isTargetBlank: true,
        bgClass: 'bg-pink-500'
    },
    {
        id: 'Linkedin',
        name: 'Linkedin',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>`,
        href: '#',
        isTargetBlank: true,
        bgClass: 'bg-blue-700'
    },
    {
        id: 'Pinterest',
        name: 'Pinterest',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" height="1em" viewBox="0 0 496 512"><path d="M248 8C111.033 8 0 119.033 0 256c0 99.96 64.645 185.266 155.037 218.693-2.16-18.527-4.103-47.01.437-67.226 4.47-18.663 29.868-118.868 29.868-118.868s-7.5-15.003-7.5-37.142c0-34.836 20.228-60.836 45.423-60.836 21.415 0 31.735 16.111 31.735 35.366 0 21.535-13.737 53.635-20.799 83.465-5.893 24.951 12.5 45.283 37.092 45.283 44.566 0 74.946-57.338 74.946-125.241 0-51.557-34.754-90.162-98.072-90.162-71.457 0-116.078 53.3-116.078 112.73 0 20.586 6.047 34.892 15.523 45.986 4.33 5.155 4.94 7.215 3.38 13.107-1.131 4.325-3.723 14.707-4.82 18.859-1.58 6.14-6.48 8.315-11.937 6.045-33.272-13.582-48.379-50.158-48.379-91.382 0-67.84 57.167-149.416 170.412-149.416 91.065 0 150.96 65.685 150.96 136.444 0 93.779-52.287 163.811-129.953 163.811-26.128 0-50.706-14.127-59.065-30.326 0 0-14.066 55.734-17.44 69.167-5.27 20.563-15.598 41.136-25.072 57.287 22.444 6.562 46.165 10.15 70.844 10.15 136.967 0 248-111.033 248-248C496 119.033 384.967 8 248 8z"/></svg>`,
        href: '#',
        isTargetBlank: true,
        bgClass: 'bg-red-600'
    }
];

const SocialsShare: FC<SocialsShareProps> = ({
    className = 'flex space-x-4',
    itemClass = 'w-10 h-10 flex items-center justify-center rounded-full text-white',
    link = ''
}) => {
    const actions = SOCIALS_DATA.map(item => {
        if (item.id === 'Facebook') {
            item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        } else if (item.id === 'Twitter') {
            item.href = `https://twitter.com/intent/tweet?url=${link}`;
        } else if (item.id === 'Instagram') {
            item.href = `https://www.instagram.com/?url=${link}`;
        } else if (item.id === 'Linkedin') {
            item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
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
                target={item.isTargetBlank ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`${itemClass} ${item.bgClass}`}
                title={`Share on ${item.name}`}
            >
                <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
            </a>
        );
    };

    return <div className={`nc-SocialsShare ${className}`}>{actions.map(renderItem)}</div>;
};

export default SocialsShare;
