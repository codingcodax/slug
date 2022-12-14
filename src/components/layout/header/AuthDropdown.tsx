import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useAtom } from 'jotai';

import { isOpenAtom } from '~/store/createModal';
import { Dropdown, Icons, Skeleton } from '~/components/ui';
import { AccountModal } from '~/components/modals';
import { useState } from 'react';

interface AuthDropdownProps {
  isLoading: boolean;
  username: string;
}

const AuthDropdown = ({ isLoading, username }: AuthDropdownProps) => {
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);
  const [, setIsOpen] = useAtom(isOpenAtom);

  return (
    <Dropdown>
      <Dropdown.Title>
        {isLoading ? (
          <Skeleton className='h-6 w-[70px]' />
        ) : (
          <>
            &#x40;{username} <Icons.ChevronDown className='ml-2 h-4 w-4' />
          </>
        )}
      </Dropdown.Title>
      <Dropdown.Items>
        <Dropdown.Item>
          <button
            className='dropdown-item'
            type='button'
            onClick={() => setIsOpen(true)}
          >
            <Icons.Plus className='mr-2 h-4 w-4' />
            Create new link
          </button>
        </Dropdown.Item>

        <Dropdown.Item>
          <Link className='dropdown-item' href='/dashboard'>
            <Icons.LayoutList className='mr-2 h-4 w-4' />
            Dashboard
          </Link>
        </Dropdown.Item>

        <Dropdown.Item>
          <button
            type='button'
            className='dropdown-item'
            onClick={() => setAccountModalIsOpen(true)}
          >
            <Icons.User className='mr-2 h-4 w-4' />
            Account
          </button>
        </Dropdown.Item>

        <Dropdown.ItemExternalLink href='https://github.com/codingcodax/slug/issues'>
          <Icons.CircleDot className='mr-2 h-4 w-4' />
          Report a bug
          <Icons.ExternalLink className='ml-2 h-4 w-4 stroke-mauve-1100 dark:stroke-mauveDark-1100' />
        </Dropdown.ItemExternalLink>

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

      <AccountModal
        show={accountModalIsOpen}
        onClose={() => setAccountModalIsOpen(false)}
      />
    </Dropdown>
  );
};

export default AuthDropdown;
