import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Dropdown, Icons, Skeleton } from '~/components/ui';

const links = [
  {
    href: '/dashboard/new',
    label: 'Create new link',
    icon: <Icons.Plus className='mr-2 h-4 w-4' />,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <Icons.LayoutList className='mr-2 h-4 w-4' />,
  },
  {
    href: 'https://github.com/codingcodax/slug/issues',
    label: 'Report a bug',
    icon: <Icons.CircleDot className='mr-2 h-4 w-4' />,
    isExternal: true,
  },
];

const menuItemStyles =
  'flex flex-row items-center block w-full rounded px-3 py-2 text-left text-sm text-mauve-1100 dark:text-mauveDark-1100 transition-colors duration-200 hover:bg-mauve-400 dark:hover:bg-mauveDark-400 ui-active:bg-mauve-400 dark:ui-active:bg-mauveDark-400';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className='mx-auto flex w-full max-w-6xl items-center justify-between py-4'>
      <Link className='text-2xl' href='/'>
        slug
      </Link>

      {status === 'unauthenticated' ? (
        <Link
          className='outline-focus-visible rounded-md px-3 py-2 transition-colors duration-200 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'
          href='/sign-in'
        >
          Sign in &rarr;
        </Link>
      ) : (
        <Dropdown>
          <Dropdown.Title className='flex items-center rounded-md px-3 py-2 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'>
            {status === 'loading' ? (
              <Skeleton className='h-6 w-[70px]' />
            ) : (
              <>
                {session?.user?.username}{' '}
                <Icons.ChevronDown className='ml-2 h-4 w-4' />
              </>
            )}
          </Dropdown.Title>
          <Dropdown.Items className='rounded-md border border-mauve-600 bg-mauve-200 shadow-lg dark:border-mauveDark-600 dark:bg-mauveDark-200'>
            {links.map(({ href, label, icon, isExternal }) => (
              <Dropdown.Item key={href}>
                {isExternal ? (
                  <a
                    className={menuItemStyles}
                    href={href}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {icon}
                    {label}
                  </a>
                ) : (
                  <Link className={menuItemStyles} href={href}>
                    {icon}
                    {label}
                  </Link>
                )}
              </Dropdown.Item>
            ))}

            <Dropdown.Item>
              <button
                className={menuItemStyles}
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <Icons.LogOut className='mr-2 h-4 w-4' />
                Sign out
              </button>
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;
