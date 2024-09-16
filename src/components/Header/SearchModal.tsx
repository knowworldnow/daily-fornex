import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FC, useEffect, useState, ReactNode } from 'react';
import clsx from 'clsx';
import { gql } from '@/__generated__';
import { getApolloClient } from '@faustwp/core';
import _ from 'lodash';
import { TPostCard } from '../Card2/Card2';
import Loading from '../Button/Loading';
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment';
import ncFormatDate from '@/utils/formatDate';
import MyImage from '../MyImage';
import { useRouter } from 'next/router';

interface Props {
  renderTrigger?: () => ReactNode;
  triggerClassName?: string;
}

const SearchModal: FC<Props> = ({ renderTrigger, triggerClassName = '' }) => {
  const client = getApolloClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<TPostCard[]>([]);

  const GQL = gql(`
    query SearchFormQueryGetPostsBySearch($first: Int, $search: String) {
      posts(first: $first, where: { search: $search }) {
        nodes {
          ...NcmazFcPostCardFields
        }
      }
    }
  `);

  function fetchData(query: string) {
    setIsLoading(true);
    client
      .query({
        query: GQL,
        variables: { search: query, first: 8 },
      })
      .then((res) => {
        setPosts((res?.data?.posts?.nodes as TPostCard[]) || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (query !== '') {
      fetchData(query);
      setPosts([]);
    }
  }, [query]);

  const handleSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className={triggerClassName}>
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <Transition show={open} afterLeave={() => setQuery('')} appear>
        <Dialog className={`relative z-50`} onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-200"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/50 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 flex w-full overflow-y-auto sm:p-6 md:pb-10 md:pt-20">
            <TransitionChild
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-20 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-20 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="mx-auto w-full max-w-2xl transform divide-y divide-gray-100 self-end overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all sm:self-start sm:rounded-xl dark:divide-gray-700 dark:bg-neutral-800 dark:ring-white/10">
                <Combobox
                  onChange={(item: TPostCard) => {
                    if (item) {
                      router.push(item.uri || '');
                      setOpen(false);
                    }
                  }}
                >
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute start-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="pe-9">
                      <ComboboxInput
                        autoFocus
                        className="h-12 w-full border-0 bg-transparent pe-4 ps-11 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-300"
                        placeholder="Type to search..."
                        onChange={_.debounce(handleSetSearchValue, 200)}
                      />
                    </div>
                    <button
                      className="absolute end-3 top-1/2 z-10 -translate-y-1/2 text-xs text-neutral-400 focus:outline-none sm:end-4 dark:text-neutral-300"
                      onClick={() => setOpen(false)}
                      type="button"
                    >
                      <XMarkIcon className="block h-5 w-5 sm:hidden" />
                      <span className="hidden sm:block">
                        <kbd className="font-sans">Esc</kbd>
                      </span>
                    </button>
                  </div>

                  {isLoading && (
                    <div className="flex w-full items-center justify-center py-5">
                      <Loading />
                    </div>
                  )}

                  <ComboboxOptions
                    static
                    as="ul"
                    className="max-h-[70vh] scroll-py-2 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-700"
                  >
                    {query !== '' && !isLoading && posts.length ? (
                      posts.map((post) => (
                        <ComboboxOption
                          as="li"
                          key={post.databaseId}
                          value={post}
                          className={({ focus }) =>
                            clsx(
                              'relative flex cursor-default select-none items-center',
                              focus && 'bg-neutral-100 dark:bg-neutral-700',
                            )
                          }
                        >
                          {({ focus }) => (
                            <CardPost post={post} focus={focus} />
                          )}
                        </ComboboxOption>
                      ))
                    ) : (
                      <div className="py-5 text-center">
                        No results found
                      </div>
                    )}
                  </ComboboxOptions>
                </Combobox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const CardPost = ({ post, focus }: { post: TPostCard; focus: boolean }) => {
  const { title, date, categories, author, featuredImage } =
    getPostDataFromPostFragment(post);

  return (
    <div className="group relative flex flex-row-reverse gap-3 rounded-2xl p-4 sm:gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs leading-6 text-neutral-500 xl:text-sm dark:text-neutral-400">
            <span className="capitalize">{author?.name || ''}</span>
            {author?.name && ' · '}
            <time dateTime={date} className="leading-6">
              {ncFormatDate(date)}
            </time>
          </p>
          <span className="relative z-10 rounded-full bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800/80">
            {categories?.nodes?.[0]?.name || ''}
          </span>
        </div>
        <h4 className="mt-2 text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-300">
          <span dangerouslySetInnerHTML={{ __html: title || '' }} />
        </h4>
      </div>

      <div className="relative z-0 hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl sm:block">
        <MyImage
          sizes="(max-width: 600px) 180px, 400px"
          className="h-full w-full object-cover"
          fill
          src={featuredImage?.sourceUrl || ''}
          alt={title || 'Card Image'}
        />
      </div>
    </div>
  );
};

export default SearchModal;
