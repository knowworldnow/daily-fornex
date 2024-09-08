import axios from 'axios';

interface Post {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
}

export async function getAllPosts() {
  try {
    const response = await axios.get<Post[]>(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts`);
    
    return response.data.map((post) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      uri: post.slug,
      date: post.date,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
