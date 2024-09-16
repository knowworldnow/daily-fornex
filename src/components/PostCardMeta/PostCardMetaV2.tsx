import { FC } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { NcmazFcUserFullFieldsFragment } from '@/__generated__/graphql'
import { FragmentType } from '@/__generated__'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import ncFormatDate from '@/utils/formatDate'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'

export interface PostCardMetaV2Props {
    meta: {
        date?: string
        author?:
            | FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
            | NcmazFcUserFullFieldsFragment
            | null // Add null as a possible type
        title?: string
        uri?: string
    }
    hiddenAvatar?: boolean
    className?: string
    titleClassName?: string
    avatarSize?: string
    disableAuthorLink?: boolean
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
    meta,
    hiddenAvatar = false,
    className = 'leading-none text-xs',
    titleClassName = 'text-base',
    avatarSize = 'h-9 w-9 text-base',
    disableAuthorLink = false,
}) => {
    const { date, title, uri } = meta
    const author = meta.author ? getUserDataFromUserCardFragment(
        meta.author as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
    ) : null

    return (
        <div
            className={`nc-PostCardMetaV2 inline-flex flex-wrap items-center text-neutral-800 dark:text-neutral-200 ${className}`}
        >
            <div className="relative flex space-x-2 rtl:space-x-reverse">
                {!hiddenAvatar && author?.name && (
                    <div className="flex-shrink-0 pt-1">
                        <Avatar
                            radius="rounded-full"
                            sizeClass={avatarSize}
                            imgUrl={author.featuredImageMeta?.sourceUrl || ''}
                            userName={author?.name || ''}
                        />
                    </div>
                )}
                <div>
                    {title && uri && (
                        <h2 className={`block font-semibold ${titleClassName}`}>
                            <Link
                                href={uri}
                                className="line-clamp-2"
                            >
                                <span dangerouslySetInnerHTML={{ __html: title }}></span>
                            </Link>
                        </h2>
                    )}
                    <div className="mt-1.5 flex">
                        {author?.name && (
                            <>
                                {disableAuthorLink ? (
                                    <span className="block font-medium capitalize text-neutral-700 dark:text-neutral-300">
                                        {author.name}
                                    </span>
                                ) : (
                                    <Link href={author.uri || '#'} className="flex">
                                        <span className="block font-medium capitalize text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
                                            {author.name}
                                        </span>
                                    </Link>
                                )}
                                <span className="mx-[6px] font-medium text-neutral-500 dark:text-neutral-400">
                                    ·
                                </span>
                            </>
                        )}
                        {date && (
                            <span className="font-normal text-neutral-500 dark:text-neutral-400">
                                {ncFormatDate(date)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCardMetaV2
