'use client';

import React, { FC } from 'react'
import { GetPostSiglePageQuery } from "@/__generated__/graphql"
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment"

interface SingleContentProps {
  post: GetPostSiglePageQuery['post']
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
  const {
    title,
    content,
    featuredImage,
  } = getPostDataFromPostFragment(post || {})

  return (
    <div className="nc-SingleContent space-y-10">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {featuredImage?.sourceUrl && (
        <img 
          src={featuredImage.sourceUrl} 
          alt={title} 
          className="w-full h-auto mb-6"
        />
      )}
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />
    </div>
  )
}

export default SingleContent
