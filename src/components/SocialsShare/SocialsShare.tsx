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
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.405.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.794.714-1.794 1.76v2.309h3.588l-.467 3.622h-3.121V24h6.116c.73 0 1.324-.595 1.324-1.326V1.326C24 .595 23.405 0 22.675 0z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Twitter',
    name: 'Twitter',
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.993 9.993 0 01-2.828.775A4.943 4.943 0 0023.337 3.3a9.984 9.984 0 01-3.127 1.195A4.92 4.92 0 0016.616 3c-2.737 0-4.956 2.217-4.956 4.95 0 .388.044.764.13 1.125A14.014 14.014 0 011.675 3.149a4.95 4.95 0 001.529 6.606 4.92 4.92 0 01-2.246-.621v.063c0 2.455 1.746 4.506 4.057 4.976a4.95 4.95 0 01-2.24.086 4.928 4.928 0 004.604 3.42 9.902 9.902 0 01-6.136 2.113c-.4 0-.79-.022-1.175-.067a13.978 13.978 0 007.548 2.211c9.056 0 14.002-7.499 14.002-13.986 0-.213-.005-.426-.014-.637A9.936 9.936 0 0024 4.557z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Instagram',
    name: 'Instagram',
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.318 3.608 1.293.975.975 1.231 2.242 1.293 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.318 2.633-1.293 3.608-.975.975-2.242 1.231-3.608 1.293-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.318-3.608-1.293-.975-.975-1.231-2.242-1.293-3.608C2.175 15.636 2.163 15.256 2.163 12s.012-3.584.07-4.849c.062-1.366.318-2.633 1.293-3.608C4.501 2.481 5.768 2.225 7.134 2.163c1.265-.058 1.645-.07 4.849-.07m0-2.163C8.755 0 8.336.014 7.052.072c-1.503.068-2.899.31-4.002 1.413C1.943 2.578 1.701 3.974 1.633 5.477.573 7.759.563 8.978.563 12s.01 4.241 1.07 6.523c.068 1.503.31 2.899 1.413 4.002 1.103 1.103 2.399 1.345 4.002 1.413C8.336 23.986 8.755 24 12 24s3.664-.014 4.948-.072c1.503-.068 2.899-.31 4.002-1.413 1.103-1.103 1.345-2.399 1.413-4.002C23.986 15.664 24 15.245 24 12s-.014-3.664-.072-4.948c-.068-1.503-.31-2.899-1.413-4.002-1.103-1.103-2.399-1.345-4.002-1.413C15.664.014 15.245 0 12 0z"/><path d="M12 5.838a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm0 10.163a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Linkedin',
    name: 'Linkedin',
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .774 0 1.725v20.55C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.725V1.725C24 .774 23.208 0 22.23 0zM7.076 20.452H3.544V9h3.532v11.452zm-1.766-13.08c-1.136 0-2.058-.918-2.058-2.053 0-1.137.922-2.056 2.058-2.056 1.137 0 2.059.919 2.059 2.056 0 1.135-.922 2.053-2.059 2.053zM20.452 20.452h-3.532v-5.604c0-1.336-.027-3.056-1.86-3.056-1.863 0-2.15 1.454-2.15 2.957v5.703H9.378V9h3.391v1.561h.048c.472-.89 1.624-1.83 3.345-1.83 3.575 0 4.235 2.353 4.235 5.411v6.31z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
  {
    id: 'Pinterest',
    name: 'Pinterest',
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.945 0C7.53 0 3.326 3.572 3.326 7.993c0 1.946.725 3.682 2.28 4.323.256.104.487.004.56-.278.052-.194.186-.683.245-.888.08-.278.049-.374-.158-.615-.447-.53-.728-1.21-.728-2.174 0-2.798 2.073-5.312 5.413-5.312 2.948 0 4.574 1.785 4.574 4.178 0 3.016-1.34 5.565-3.327 5.565-1.096 0-1.915-.902-1.65-2.008.316-1.325.926-2.755.926-3.71 0-.855-.458-1.565-1.405-1.565-1.117 0-2.016 1.146-2.016 2.68 0 .976.33 1.637.33 1.637s-1.115 4.74-1.312 5.598c-.39 1.662-.058 3.697-.03 3.894.016.124.178.153.251.058.103-.136 1.424-1.765 1.873-3.416.127-.456.727-2.836.727-2.836.36.686 1.414 1.287 2.538 1.287 3.343 0 5.608-2.775 5.608-6.48C20.94 3.483 17.484 0 13.945 0z"/></svg>`,
    href: '#',
    isTargetBlank: true,
  },
];

const SocialsShare: FC<SocialsShareProps> = ({
  className = 'grid gap-[6px]',
  itemClass = 'w-9 h-9 text-white rounded-full hover:bg-neutral-100',
  link = '',
}) => {
  const actions = SOCIALS_DATA.map(item => {
    if (item.id === 'Facebook') {
      item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    } else if (item.id === 'Twitter') {
      item.href = `https://twitter.com/intent/tweet?url=${link}`;
    } else if (item.id === 'Linkedin') {
      item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
    } else if (item.id === 'Pinterest') {
      item.href = `https://pinterest.com/pin/create/button/?url=${link}`;
    }
    return item;
  });

  const renderItem = (item: SocialShareType, index: number) => (
    <a
      key={index}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center leading-none ${itemClass}`}
      title={`Share on ${item.name}`}
    >
      <div dangerouslySetInnerHTML={{ __html: item.icon }} />
    </a>
  );

  return <div className={`nc-SocialsShare ${className}`}>{actions.map(renderItem)}</div>;
};

export default SocialsShare;
