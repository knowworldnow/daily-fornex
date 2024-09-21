import Image from 'next/image';
import Link from 'next/link';

interface PostHeaderProps {
  title: string;
  author: {
    name: string;
    avatar?: {
      url: string;
    };
  };
  date: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function PostHeader({ title, author, date, category }: PostHeaderProps) {
  return (
    <header>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center mb-4">
        {author.avatar && (
          <Image
            src={author.avatar.url}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
        )}
        <span className="text-gray-600 mr-4">{author.name}</span>
        <time className="text-gray-600 mr-4">{new Date(date).toLocaleDateString()}</time>
        {category && (
          <Link href={`/category/${category.slug}`} className="text-blue-600 hover:underline">
            {category.name}
          </Link>
        )}
      </div>
    </header>
  );
}