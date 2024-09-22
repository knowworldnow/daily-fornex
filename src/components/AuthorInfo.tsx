import Image from 'next/image';
import Link from 'next/link';

interface AuthorInfoProps {
  author: string;
  date: string;
  category: string;
}

export default function AuthorInfo({ author, date, category }: AuthorInfoProps) {
  const authorImage = author === 'Anmita Das' ? '/anmita.webp' : '/shoumya.webp';

  return (
    <div className="flex items-center space-x-4 mb-4">
      <Image
        src={authorImage}
        alt={author}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold text-lg">{author}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · 
          <Link href={`/category/${category.toLowerCase()}`} className="ml-1 text-blue-600 hover:underline">
            {category}
          </Link>
        </p>
      </div>
    </div>
  );
}
