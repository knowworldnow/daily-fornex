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
    const lowerCaseName = authorName.toLowerCase();
    if (lowerCaseName === 'anmita das') {
      return '/avatars/anmita.webp';
    } else if (lowerCaseName === 'shoumya chowdhury') {
      return '/avatars/shoumya.webp';
    } else {
      // Default avatar or fallback logic
      return '/avatars/default.webp';
    }
  };

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex justify-start">
        <AuthorInfo 
          author={author.name}
          avatarUrl={getAvatarUrl(author.name)}
          date={date}
          category={category?.name || ''}
          categorySlug={category?.slug}
        />
      </div>
    </header>
  );
}
