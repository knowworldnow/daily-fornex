'use client'

import { Popover, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Link from 'next/link';
import { useLogout } from '@faustwp/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import getTrans from '@/utils/getTrans';
import { UserIcon } from '../Icons/Icons';

interface Props {
  className?: string;
}

const AvatarDropdown: FC<Props> = ({ className = '' }) => {
  const { isReady, isAuthenticated } = useSelector(
    (state: RootState) => state.viewer.authorizedUser
  );
  const { logout } = useLogout();
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const { openLoginModal } = useLoginModal();
  const T = getTrans();

  const renderAvatar = () => {
    if (!viewer?.databaseId) {
      return null;
    }
    return (
      <Link href={'/dashboard/edit-profile/profile'} className="flex items-center">
        <Avatar
          imgUrl={viewer?.ncUserMeta?.featuredImage?.node?.sourceUrl || ''}
          userName={viewer?.name || ''}
          sizeClass="w-12 h-12"
        />
        <div className="ms-3 flex-grow overflow-hidden">
          <h4 className="font-semibold capitalize">{viewer?.name}</h4>
          <p className="mt-0.5 truncate text-xs">
            <span className="truncate">{viewer?.email}</span>
          </p>
        </div>
      </Link>
    );
  };

  const renderMenuEditProfile = () => (
    <Link
      href={'/dashboard/edit-profile/profile'}
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
    >
      <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
        <UserIcon className="h-6 w-6" />
      </div>
      <div className="ms-4">
        <p className="text-sm font-medium">{T['Edit profile']}</p>
      </div>
    </Link>
  );

  const renderMenuLogOut = () => (
    <button
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
      onClick={() => logout('/')}
    >
      <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
        <UserIcon className="h-6 w-6" />
      </div>
      <div className="ms-4">
        <p className="text-sm font-medium">{T['Log out']}</p>
      </div>
    </button>
  );

  const renderMenuSignUpLogin = () => (
    <button
      type="button"
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
      onClick={() => openLoginModal()}
    >
      <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
        <UserIcon className="h-6 w-6" />
      </div>
      <div className="ms-4">
        <p className="text-sm font-medium">{T['Sign up, Login']}</p>
      </div>
    </button>
  );

  return (
    <div className={`AvatarDropdown ${className}`}>
      <Popover className="relative" as="div">
        {({ open, close }) => (
          <>
            <Popover.Button
              as="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800`}
            >
              {!viewer?.name ? (
                <UserIcon />
              ) : (
                <Avatar
                  imgUrl={viewer?.ncUserMeta?.featuredImage?.node?.sourceUrl || ''}
                  userName={viewer?.name || ''}
                  sizeClass="w-7 h-7 sm:w-8 sm:h-8 text-sm"
                  radius="rounded-full"
                  containerClassName="ring-1 ring-neutral-100 dark:ring-neutral-800 shadow-inner"
                />
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -end-2 z-10 mt-3.5 w-screen max-w-[260px] px-4 sm:end-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
                    {isAuthenticated && renderMenuEditProfile()}
                    {isAuthenticated && renderMenuLogOut()}
                    {!isAuthenticated && renderMenuEditProfile()}
                    {!isAuthenticated && renderMenuSignUpLogin()}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AvatarDropdown;
