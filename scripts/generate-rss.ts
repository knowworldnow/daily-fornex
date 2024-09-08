const fs = require('fs');
const RSS = require('rss');

async function generateRSS() {
  const feed = new RSS({
    title: 'Daily Fornex',
    description: 'The best source of updated information and creative articles',
    site_url: 'https://dailyfornex.com',
    feed_url: 'https://dailyfornex.com/rss.xml',
    language: 'en',
  });

  // Fetch your posts or data here
  const posts = [
    {
      title: 'Post Title 1',
      description: 'Post Description 1',
      url: 'https://dailyfornex.com/post-1',
      date: '2024-01-01',
    },
    {
      title: 'Post Title 2',
      description: 'Post Description 2',
      url: 'https://dailyfornex.com/post-2',
      date: '2024-01-02',
    },
    // Add more posts here
  ];

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.date,
    });
  });

  const xml = feed.xml({ indent: true });
  fs.writeFileSync('public/rss.xml', xml);
}

generateRSS();
