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
      <div className="mr-4 w-12 h-12 relative">
        <Image
          src={avatarUrl}
          alt={`Avatar of ${author}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
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
