import AuthorInfo from './AuthorInfo';

interface PostHeaderProps {
  title: string;
  author: {
    name: string;
  };
  date: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function PostHeader({ title, author, date, category }: PostHeaderProps) {
  // Determine the avatar URL based on the author's name
  const getAvatarUrl = (authorName: string) => {
    const formattedName = authorName.toLowerCase().replace(/\s+/g, '-');
    return `/avatars/${formattedName}.webp`;
  };

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <AuthorInfo 
        author={author.name}
        date={date}
        category={category?.name || ''}
        categorySlug={category?.slug}
      />
    </header>
  );
}
