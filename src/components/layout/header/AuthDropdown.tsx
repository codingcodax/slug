import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { createModalIsOpenAtom } from '~/store/modals';
import { Dropdown, Icons, Skeleton } from '~/components/ui';
import { AccountModal, CreateModal } from '~/components/modals';

interface AuthDropdownProps {
  isLoading: boolean;
  username: string;
}

const AuthDropdown = ({ isLoading, username }: AuthDropdownProps) => {
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useAtom(
    createModalIsOpenAtom
  );

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
            onClick={() => setCreateModalIsOpen(true)}
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
            className='dropdown-item'
            type='button'
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

      <CreateModal
        show={createModalIsOpen}
        onClose={() => setCreateModalIsOpen(false)}
      />
    </Dropdown>
  );
};

export default AuthDropdown;
