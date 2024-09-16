import { FC, useRef } from 'react'
import Tag from '@/components/Tag/Tag'
import SingleAuthor from './SingleAuthor'
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction'
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn'
import { GetPostSiglePageQuery } from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import NcBookmark from '@/components/NcBookmark/NcBookmark'
import SingleCommentWrap from './SingleCommentWrap'
import { Sidebar } from './Sidebar'
import DynamicSingleRelatedPosts from './SingleRelatedPosts'

export interface SingleContentProps {
  post: GetPostSiglePageQuery['post']
  relatedPosts: GetPostSiglePageQuery['posts']['nodes']
}

const SingleContent: FC<SingleContentProps> = ({ post, relatedPosts }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    content,
    author,
    databaseId,
    commentCount,
    commentStatus,
    title,
    excerpt,
    featuredImage,
    tags,
    date,
  } = getPostDataFromPostFragment(post || {})

  return (
    <div className="relative flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 xl:w-2/3 xl:pe-20">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {featuredImage && (
          <img
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || title}
            className="w-full h-auto mb-6"
          />
        )}
        <p className="text-lg mb-6">{excerpt}</p>
        <SingleAuthor author={author} date={date} />
        
        <div
          ref={contentRef}
          className="prose mx-auto max-w-screen-md lg:prose-lg dark:prose-invert mt-10"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {tags?.nodes?.length ? (
          <div className="flex flex-wrap mt-10">
            {tags.nodes.map(item => (
              <Tag
                key={item.databaseId}
                name={item.name || ''}
                href={item.uri || ''}
                className="me-2 mb-2"
              />
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-10">
          <PostCardLikeAction postId={databaseId} />
          <PostCardCommentBtn commentCount={commentCount || 0} postUri={post.uri || ''} />
          <NcBookmark postId={databaseId} />
        </div>

        {commentStatus === 'open' && (
          <SingleCommentWrap
            commentCount={commentCount || 0}
            postDatabaseId={databaseId}
          />
        )}

        <DynamicSingleRelatedPosts
          posts={relatedPosts}
          postDatabaseId={databaseId}
        />
      </div>
      
      <div className="w-full lg:w-1/4 xl:w-1/3 mt-10 lg:mt-0">
        <Sidebar content={content} />
      </div>
    </div>
  )
}

export default SingleContent
