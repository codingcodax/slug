import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { Dropdown, ExternalLink, Icons, Skeleton } from '~/components/ui';

interface AuthDropdownProps {
  isLoading: boolean;
  username: string;
}

const AuthDropdown = ({ isLoading, username }: AuthDropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Title className='outline-focus-visible flex items-center rounded-md px-3 py-2 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'>
        {isLoading ? (
          <Skeleton className='h-6 w-[70px]' />
        ) : (
          <>
            {username} <Icons.ChevronDown className='ml-2 h-4 w-4' />
          </>
        )}
      </Dropdown.Title>
      <Dropdown.Items className='rounded-md border border-mauve-600 bg-mauve-200 shadow-lg dark:border-mauveDark-600 dark:bg-mauveDark-200'>
        <Dropdown.Item>
          <Link className='dropdown-item' href='/dashboard/new'>
            <Icons.Plus className='mr-2 h-4 w-4' />
            Create new link
          </Link>
        </Dropdown.Item>

        <Dropdown.Item>
          <Link className='dropdown-item' href='/dashboard'>
            <Icons.LayoutList className='mr-2 h-4 w-4' />
            Dashboard
          </Link>
        </Dropdown.Item>

        <Dropdown.Item>
          <ExternalLink
            className='dropdown-item'
            href='https://github.com/codingcodax/slug/issues'
          >
            <Icons.CircleDot className='mr-2 h-4 w-4' />
            Report a bug
          </ExternalLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <button
            className='dropdown-item'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <Icons.LogOut className='mr-2 h-4 w-4' />
            Sign out
          </button>
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown>
  );
};

export default AuthDropdown;
