'use client'

import { FC, useEffect, useRef } from 'react'
import Tag from '@/components/Tag/Tag'
import SingleAuthor from './SingleAuthor'
import { GetPostSiglePageQuery } from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import SingleCommentWrap from './SingleCommentWrap'
import Alert from '@/components/Alert'
import TableContentAnchor from './TableContentAnchor'

export interface SingleContentProps {
    post: GetPostSiglePageQuery['post']
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const {
        content,
        author,
        databaseId,
        commentCount,
        commentStatus,
        tags,
        status,
        date,
    } = getPostDataFromPostFragment(post || {})

    useEffect(() => {
        if (contentRef.current) {
            const doc = new DOMParser().parseFromString(content, 'text/html')
            const firstParagraph = doc.querySelector('p')

            if (firstParagraph) {
                const tocElement = doc.querySelector('.table-of-contents')
                if (tocElement) {
                    firstParagraph.insertAdjacentElement('afterend', tocElement)
                }
            }

            contentRef.current.innerHTML = doc.body.innerHTML
        }
    }, [content])

    const renderAlert = () => {
        if (status === 'publish') {
            return null
        }
        if (status === 'future') {
            return (
                <Alert type="warning">
                    This post is scheduled. It will be published on {date}.
                </Alert>
            )
        }
        return (
            <>
                <Alert type="warning">
                    This post is {status}. It will not be visible on the website until it
                    is published.
                </Alert>
            </>
        )
    }

    return (
        <div className="relative flex flex-col">
            <div className="nc-SingleContent flex-1 space-y-10">
                {/* Alert for post status */}
                {renderAlert()}

                {/* TOC Anchor */}
                <TableContentAnchor
                    className="mx-auto max-w-screen-md"
                    content={content}
                />

                {/* ENTRY CONTENT */}
                <div
                    id="single-entry-content"
                    className="prose mx-auto max-w-screen-md lg:prose-lg dark:prose-invert"
                    ref={contentRef}
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* TAGS */}
                {tags?.nodes?.length ? (
                    <div className="mx-auto flex max-w-screen-md flex-wrap">
                        {tags.nodes.map(item => (
                            <Tag
                                hideCount
                                key={item.databaseId}
                                name={'#' + (item.name || '')}
                                uri={item.uri || ''}
                                className="mb-2 me-2 border border-neutral-200 dark:border-neutral-800"
                            />
                        ))}
                    </div>
                ) : null}

                {/* AUTHOR */}
                <div className="mx-auto max-w-screen-md border-b border-t border-neutral-100 dark:border-neutral-700"></div>
                <div className="mx-auto max-w-screen-md">
                    <SingleAuthor author={author} />
                </div>

                {/* COMMENTS LIST */}
                {commentStatus === 'open' ? (
                    <div
                        id="comments"
                        className="mx-auto max-w-screen-md scroll-mt-10 sm:scroll-mt-20"
                    >
                        <SingleCommentWrap
                            commentCount={commentCount || 0}
                            postDatabaseId={databaseId}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default SingleContent
