import { FC } from 'react'
import { NcDropDownItem } from '../NcDropDown/NcDropDown'

export interface SocialsShareProps {
	className?: string
	itemClass?: string
	link: string
}

export type TSocialShareItem = 'Facebook' | 'Twitter' | 'Instagram' | 'Linkedin' | 'Pinterest'

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
		icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
		href: '#',
		isTargetBlank: true,
	},
	{
		id: 'Instagram',
		name: 'Instagram',
		icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9-51.3-114.9-114.9-114.9zm0 186.1c-39.3 0-71.2-31.9-71.2-71.2s31.9-71.2 71.2-71.2 71.2 31.9 71.2 71.2-31.9 71.2-71.2 71.2zm146.4-194.3c0 14.9-12.1 27-27 27h-29.9c-14.9 0-27-12.1-27-27v-29.9c0-14.9 12.1-27 27-27h29.9c14.9 0 27 12.1 27 27v29.9zm76.1 27.2c-1.7-35.7-9.9-67.4-35.8-93.2s-57.5-34.1-93.2-35.8c-36.7-2.1-146.7-2.1-183.4 0-35.7 1.7-67.4 9.9-93.2 35.8s-34.1 57.5-35.8 93.2c-2.1 36.7-2.1 146.7 0 183.4 1.7 35.7 9.9 67.4 35.8 93.2s57.5 34.1 93.2 35.8c36.7 2.1 146.7 2.1 183.4 0 35.7-1.7 67.4-9.9 93.2-35.8s34.1-57.5 35.8-93.2c2.1-36.7 2.1-146.7 0-183.4zm-48.5 224.5c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.1s2.7 102.7-9 132.1z"/></svg>`,
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
		icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248S0 393 0 256 111 8 248 8s248 111 248 248zm-340.5-35.1c-17.1 0-33.4 8-41.4 21.7-5.7 9.4-7.2 21.1-5.7 32.2 4.6 30.3 22.7 53.4 41.1 69.6 6.2 5.4 12.8 11.6 19.7 18.2 12.7 12.2 25.8 25.7 38.4 38.7 3.8 4 9.6 2.2 10.4-2.8 5.3-37.3 21.7-74.2 41.7-107.4 5.5-9.4 11.3-18.8 17.1-28.1 11.8-18.7 23.9-37.3 36-55.8 4.7-7.2 12.2-11.5 20.5-11.5 14.6 0 29.1.2 43.7-.4 7.2-.3 14.1-1.1 20.9-2.8 7.1-1.8 11.5-9.3 8.9-16.1-1.9-4.8-5.7-9-10.8-11.1-16.4-6.4-33.7-9.1-51-11.5-21-2.9-41.9-5.8-62.9-8.3-25.3-3-50.6-4.6-76-5.1-44.5-1-90.1 2-134.6 8.7-12.8 1.9-25.5 4.5-37.9 8.6-16.7 5.4-33.6 11.2-48.9 19.6-7.6 4-13.4 11.2-14.8 19.7-1.2 7.6 3.5 15.1 11 17.8 17.2 6.3 35 10.7 52.8 14.9 8.4 2 17 4 25.5 6 4.7 1.1 9.7.1 13.5-2.8 4.2-3.1 6.7-8.1 6.7-13.4v-28.7c0-5.3-2.4-10.4-6.5-13.7-12-9.7-25.4-18.7-36.3-30.2-10.2-10.8-16.5-24.5-21.5-38.8-5.2-14.7-7.5-30.5-7-46.2 1-27 12.2-52.6 31.7-71 14.6-13.6 33.2-21.6 52.7-23.9 8.3-.9 16.9.1 24.6 3.1 8.3 3.3 15.5 9 21.1 16.4 4.9 6.3 9.1 13.1 13.7 19.7 8.8 12.5 18.6 24.6 29.2 35.9 10.2 10.8 21.1 21.1 33.1 29.9 18.2 13.1 39.4 22.6 60.8 31.5 13.2 5.4 26.6 10.8 40.1 16.2 9.3 3.6 19 7.1 28.7 10.6 7.5 2.7 16.3 5.5 24.3 5.1 11-.6 22.3-5.4 29.2-14.3 8.7-10.9 12.8-26.6 9.9-41.2-6.2-31.4-34-54.4-62.8-63.4-19.9-6.3-41.4-6.4-62.5-7.7-16.4-1-32.8-1.9-49.3-1.9-19.2-.1-38.4.7-57.4 2.5-13.6 1.3-27.2 2.8-40.9 3.7-6.9.5-13.8 1-20.7 1.6-3.6.3-7.2.6-10.8.9-1.8.2-3.5.4-5.3.6-2.3.2-4.7.5-7 .6-2.4.2-4.9.2-7.2-.4-7.3-1.7-14.1-6.1-18.2-12.3-10.5-15.4-12.4-35.1-6.7-52.9z"/></svg>`,
		href: '#',
		isTargetBlank: true,
	},
]

const SocialsShare: FC<SocialsShareProps> = ({
	className = 'grid gap-2',
	itemClass = 'w-10 h-10 text-white rounded-full',
	link = '',
}) => {
	const actions = SOCIALS_DATA.map(item => {
		if (item.id === 'Facebook') {
			item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`
		} else if (item.id === 'Twitter') {
			item.href = `https://twitter.com/intent/tweet?url=${link}`
		} else if (item.id === 'Instagram') {
			item.href = `https://www.instagram.com/?url=${link}`
		} else if (item.id === 'Linkedin') {
			item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`
		} else if (item.id === 'Pinterest') {
			item.href = `https://pinterest.com/pin/create/button/?url=${link}`
		}
		return item
	})

	const renderItem = (item: SocialShareType, index: number) => {
		return (
			<a
				key={index}
				href={item.href}
				className={`flex items-center justify-center ${itemClass} ${item.id === 'Facebook' ? 'bg-blue-600' : ''} ${item.id === 'Twitter' ? 'bg-blue-400' : ''} ${item.id === 'Instagram' ? 'bg-pink-500' : ''} ${item.id === 'Linkedin' ? 'bg-blue-700' : ''} ${item.id === 'Pinterest' ? 'bg-red-600' : ''}`}
				title={`Share on ${item.name}`}
				target={item.isTargetBlank ? '_blank' : '_self'}
				rel="noopener noreferrer"
			>
				<div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
			</a>
		)
	}

	return (
		<div className={`nc-SocialsShare ${className}`}>
			{actions.map(renderItem)}
		</div>
	)
}

export default SocialsShare
