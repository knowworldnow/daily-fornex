'use client';

import React, { FC, forwardRef, useRef, useEffect, useState } from 'react';
import Tag from '@/components/Tag/Tag';
import dynamic from 'next/dynamic';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { GetPostSiglePageQuery } from '@/__generated__/graphql';
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment';
import NcBookmark from '@/components/NcBookmark/NcBookmark';
import { Transition } from '@headlessui/react';
import Alert from '@/components/Alert';
import { clsx } from 'clsx';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import parse from 'html-react-parser';
import AdSenseAd from '@/components/AdSenseAd';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction';
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn';

const SingleCommentWrap = dynamic(() => import('./SingleCommentWrap'), {
  loading: () => <p>Loading comments...</p>,
});
const TableContentAnchor = dynamic(() => import('./TableContentAnchor'), {
  ssr: false,
});
const SingleAuthor = dynamic(() => import('./SingleAuthor'), {
  loading: () => <p>Loading author info...</p>,
});

// Define the insertAds function here
const insertAds = (content: string) => {
  const parsedContent = parse(content);
  const contentArray = React.Children.toArray(parsedContent);

  const adPositions = [4, 14, 24, 34, 44, 54, 64];

  adPositions.forEach((position, index) => {
    if (contentArray.length > position) {
      contentArray.splice(position + index, 0, <AdSenseAd key={`ad-${position}`} />);
    }
  });

  return contentArray;
};

export interface SingleContentProps {
  post: GetPostSiglePageQuery['post'];
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false);

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  });

  const {
    content,
    author,
    databaseId,
    commentCount,
    commentStatus,
    tags,
    status,
    date,
  } = getPostDataFromPostFragment(post || {});

  useEffect(() => {
    // ... your existing useEffect code
  }, []);

  const renderAlert = () => {
    // ... your existing renderAlert code
  };

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio &&
    (endedAnchorEntry?.boundingClientRect.top || 0) > 0;

  return (
    <div className='relative flex flex-col'>
      <div className='nc-SingleContent flex-1 space-y-10'>
        {/* Render Alert */}
        {renderAlert()}

        {/* ENTRY CONTENT */}
        <div
          id='single-entry-content'
          className='prose mx-auto max-w-screen-md lg:prose-lg dark:prose-invert'
          ref={contentRef}
        >
          {insertAds(content)}
        </div>

        {/* TAGS */}
        {tags?.nodes?.length ? (
          <div className='mx-auto flex max-w-screen-md flex-wrap'>
            {tags.nodes.map((item) => (
              <Tag
                hideCount
                key={item.databaseId}
                name={'#' + (item.name || '')}
                uri={item.uri || ''}
                className='mb-2 me-2 border border-neutral-200 dark:border-neutral-800'
              />
            ))}
          </div>
        ) : null}

        {/* AUTHOR */}
        <div className='mx-auto max-w-screen-md border-b border-t border-neutral-100 dark:border-neutral-700'></div>
        <div className='mx-auto max-w-screen-md'>
          <SingleAuthor author={author} />
        </div>

        {/* COMMENTS LIST */}
        {commentStatus === 'open' ? (
          <div
            id='comments'
            className='mx-auto max-w-screen-md scroll-mt-10 sm:scroll-mt-20'
          >
            <SingleCommentWrap
              commentCount={commentCount || 0}
              postDatabaseId={databaseId}
            />
          </div>
        ) : null}
        <div className='!my-0' ref={endedAnchorRef}></div>
      </div>

      {/* Sticky Action */}
      <StickyAction
        showLikeAndCommentSticky={showLikeAndCommentSticky}
        isShowScrollToTop={isShowScrollToTop}
        post={post}
        ref={progressRef}
      />
    </div>
  );
};

const StickyAction = forwardRef(function (
  {
    showLikeAndCommentSticky,
    post,
    isShowScrollToTop,
  }: {
    showLikeAndCommentSticky: boolean;
    post: GetPostSiglePageQuery['post'];
    isShowScrollToTop: boolean;
  },
  progressRef
) {
  const { content, databaseId, ncPostMetaData, uri, commentCount } =
    getPostDataFromPostFragment(post || {});

  const { postData: musicPlayerPostData } = useMusicPlayer();

  const hasMusic = musicPlayerPostData?.databaseId;
  const stickyActionClassName = clsx(
    'sticky z-40 mt-8 inline-flex self-center',
    hasMusic ? 'bottom-14 sm:bottom-14' : 'bottom-5 sm:bottom-8'
  );

  return (
    <div className={stickyActionClassName}>
      <Transition
        as={'div'}
        show={showLikeAndCommentSticky}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className={
          'inline-flex items-center justify-center gap-1 self-center sm:gap-2'
        }
      >
        <>
          <div className='flex items-center justify-center gap-1 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-neutral-900/5 ring-offset-1 sm:gap-2 dark:bg-neutral-800'>
            {/* ... other elements */}
          </div>

          <TableContentAnchor
            className='flex items-center justify-center gap-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-neutral-900/5 ring-offset-1 dark:bg-neutral-800'
            content={content}
          />
        </>
      </Transition>
    </div>
  );
});

export default SingleContent;
