import Image from 'next/image';
import Link from 'next/link';

interface AuthorInfoProps {
  author: string;
  avatarUrl: string;
  date: string;
  category: string;
  categorySlug?: string;
}

export default function AuthorInfo({ author, avatarUrl, date, category, categorySlug }: AuthorInfoProps) {
  return (
    <div className="flex items-center">
      <Image
        src={avatarUrl}
        alt={author}
        width={60}
        height={60}
        className="rounded-full mr-4"
      />
      <div>
        <p className="font-semibold text-lg">{author}</p>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          {category && (
            <>
              <span className="mx-2">·</span>
              {categorySlug ? (
                <Link href={`/category/${categorySlug}`} className="text-blue-600 hover:underline">
                  {category}
                </Link>
              ) : (
                <span>{category}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
