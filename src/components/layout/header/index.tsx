import { useSession } from 'next-auth/react';
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

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header>
      <Link href='/'>Slug</Link>

      {status === 'unauthenticated' ? (
        <Link href='login'>Sign in</Link>
      ) : (
        <Menu>
          <Menu.Button>{session?.user?.name}</Menu.Button>
          <Menu.Items>
            {links.map(({ href, label, isExternal }) => (
              <Menu.Item key={href}>
                {isExternal ? (
                  <a href={href} rel='noopener noreferrer' target='_blank'>
                    {label}
                  </a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      )}
    </header>
  );
};

export default Header;
