import { useRouter } from 'next/router';
import Input from '../Input/Input';
import { SearchIcon } from '../Icons/Icons';

export const HeaderSearchForm = () => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const query = e.currentTarget.search.value.trim();
		if (query) {
			router.push('/search/posts/' + encodeURIComponent(query));
		}
	};

	return (
		<form
			className="group relative"
			onSubmit={handleSubmit}
		>
			<Input
				type="search"
				placeholder="Type to search..."
				className="!w-40 pr-5 group-hover:border-neutral-300 md:!w-full md:pr-10 dark:placeholder:text-neutral-400 dark:group-hover:border-neutral-400"
				sizeClass="h-[42px] pl-4 py-3"
				name="search"
				id="search"
				rounded="rounded-full"
			/>
			<button
				type="submit"
				className="absolute inset-y-0 end-0 flex items-center justify-center rounded-full pe-3 ps-2 text-neutral-500 dark:text-neutral-400"
			>
				<SearchIcon className="h-5 w-5" />
			</button>
		</form>
	);
};

export const SearchIconBtn = ({ className = 'lg:hidden' }: { className?: string }) => {
	return (
		<div className={`relative block self-center ${className}`}>
			<HeaderSearchForm />
		</div>
	);
};
