import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

const links = [
  { href: '/dashboard/create', label: 'Create new link' },
  { href: '/dashboard', label: 'Dashboard' },
  {
    href: 'https://github.com/codingcodax/slug',
    label: 'Report a bug',
    isExternal: true,
  },
];

const menuItemStyles =
  'block w-full rounded px-3 py-2 text-left text-sm text-mauve-1100 transition-colors duration-200 hover:bg-mauve-400 dark:hover:bg-mauveDark-400 ui-active:bg-mauve-400 dark:ui-active:bg-mauveDark-400';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className='mx-auto flex w-full max-w-6xl items-center justify-between py-4'>
      <Link className='text-2xl' href='/'>
        slug
      </Link>

      {status === 'unauthenticated' ? (
        <Link
          className='rounded-md px-3 py-2 hover:bg-mauve-400 focus:outline-none focus-visible:bg-mauve-200 focus-visible:ring-1 focus-visible:ring-mauve-700 focus-visible:ring-offset-2 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-200 dark:focus-visible:ring-mauveDark-700'
          href='login'
        >
          Sign in &rarr;
        </Link>
      ) : (
        <Menu as='div' className='relative inline-block'>
          <Menu.Button className='rounded-md px-3 py-2 hover:bg-mauve-400 focus:outline-none focus-visible:bg-mauve-200 focus-visible:ring-1 focus-visible:ring-mauve-700 focus-visible:ring-offset-2 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-200 dark:focus-visible:ring-mauveDark-700'>
            {session?.user?.username} &darr;
          </Menu.Button>
          <Menu.Items className='absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md border border-mauve-600 bg-mauve-200 p-1 shadow-lg focus:outline-none dark:border-mauveDark-600 dark:bg-mauveDark-200'>
            {links.map(({ href, label, isExternal }) => (
              <Menu.Item key={href}>
                {isExternal ? (
                  <a
                    className={menuItemStyles}
                    href={href}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {label}
                  </a>
                ) : (
                  <Link className={menuItemStyles} href={href}>
                    {label}
                  </Link>
                )}
              </Menu.Item>
            ))}

            <Menu.Item>
              <button
                className={menuItemStyles}
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </header>
  );
};

export default Header;
