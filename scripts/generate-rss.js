const fs = require('fs');
const RSS = require('rss');
const { getAllPosts } = require('../src/utils/getAllPosts');
const siteUrl = 'https://dailyfornex.com/';

async function generateRSS() {
  const feed = new RSS({
    title: 'Daily Fornex',
    description: 'The best source of updated information and creative articles',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    language: 'en',
  });

  const posts = await getAllPosts(); // Fetch all posts dynamically

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}${post.uri}`,
      date: post.date,
    });
  });

  const xml = feed.xml({ indent: true });
  fs.writeFileSync('public/rss.xml', xml);
}

generateRSS();
