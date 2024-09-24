import { NextResponse } from 'next/server'
import { getClient } from '@faustwp/experimental-app-router'
import { gql } from '@apollo/client'

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
const SITE_URL = process.env.NEXT_PUBLIC_URL

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 1000) {
      nodes {
        slug
        modified
      }
    }
  }
`

async function fetchAllPosts() {
  const client = await getClient()
  const { data } = await client.query({ query: GET_ALL_POSTS })
  return data.posts.nodes
}

function generateSitemapXml(posts: any[]) {
  const urlSet = posts.map(post => `
    <url>
      <loc>${SITE_URL}/${post.slug}</loc>
      <lastmod>${new Date(post.modified).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urlSet}
    </urlset>`
}

export async function GET() {
  try {
    const posts = await fetchAllPosts()
    const sitemapContent = generateSitemapXml(posts)

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
