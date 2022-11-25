import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { Icons, Skeleton } from '~/components/ui';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import cn from '~/utils/cn';
import { trpc } from '~/utils/trpc';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return {
      redirect: { destination: '/sign-in', permanent: false },
    };

  return { props: { session } };
};

const Dashboard = () => {
  const { data: links, isLoading } = trpc.link.getAll.useQuery();
  const [search, setSearch] = useState('');

  const filteredLinks = links?.filter((link) =>
    link.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className='mx-auto w-full max-w-6xl'>
      <section className='mb-10 flex items-center justify-between'>
        <h1 className='text-3xl font-medium'>Dashboard</h1>
        <Link
          className='flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 dark:hover:bg-mauveDark-400'
          href='/dashboard/new'
        >
          <Icons.Plus className='mr-2 h-4 w-4' /> Create new link
        </Link>
      </section>

      <div className='relative mb-4 w-full'>
        <div className='absolute top-0 left-0 flex h-[42px] w-10 items-center justify-center'>
          <Icons.Search className='h-6 w-6 stroke-mauve-1100 dark:stroke-mauveDark-1000' />
        </div>
        <input
          className={cn(
            'input w-full pl-10',
            isLoading || links?.length === 0 ? 'cursor-not-allowed' : ''
          )}
          disabled={isLoading || links?.length === 0}
          placeholder='Search'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && (
        <ul className='space-y-4'>
          <LinkItem.Skeleton />
          <LinkItem.Skeleton />
          <LinkItem.Skeleton />
        </ul>
      )}

      {links?.length === 0 && (
        <section className='flex flex-col items-center'>
          <p>You don&apos;t have any links.</p>
          <Link
            className='flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 dark:hover:bg-mauveDark-400'
            href='/dashboard/new'
          >
            <Icons.Plus className='mr-2 h-4 w-4' /> Create one first
          </Link>
        </section>
      )}

      {links && (
        <ul className='space-y-4'>
          {filteredLinks?.map(({ id, slug, url, description }) => (
            <LinkItem key={id}>
              <LinkItem.Slug slug={slug}>{slug}</LinkItem.Slug>
              <LinkItem.Link>{url}</LinkItem.Link>
              <LinkItem.Description>{description}</LinkItem.Description>
            </LinkItem>
          ))}
        </ul>
      )}
    </main>
  );
};

interface LinkItemProps {
  children: React.ReactNode;
}

const LinkItem = ({ children }: LinkItemProps) => {
  return (
    <li className='rounded-md border border-mauve-600 p-4 transition-colors duration-200 hover:border-mauve-700 dark:border-mauveDark-600 dark:hover:border-mauveDark-700'>
      {children}
    </li>
  );
};

interface LinkItemSlugProps {
  children: React.ReactNode;
  slug: string;
}

// eslint-disable-next-line react/display-name
LinkItem.Slug = ({ children, slug }: LinkItemSlugProps) => {
  return (
    <Link className='text-xl' href={`https://slug.codingcodax.dev/${slug}`}>
      /{children}
    </Link>
  );
};

interface LinkItemLinkProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
LinkItem.Link = ({ children }: LinkItemLinkProps) => {
  return <p className='text-mauve-1100 dark:text-mauveDark-1100'>{children}</p>;
};

interface LinkItemDescriptionProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
LinkItem.Description = ({ children }: LinkItemDescriptionProps) => {
  return <p className='mt-2'>{children || 'No description'}</p>;
};

// eslint-disable-next-line react/display-name
LinkItem.Skeleton = () => {
  return (
    <li className='rounded-md border border-mauve-600 p-4 dark:border-mauveDark-600'>
      <Skeleton className='h-6 bg-mauve-500 dark:bg-mauveDark-500' />
      <Skeleton className='mt-2 h-5 w-3/5 bg-mauve-300 dark:bg-mauveDark-300' />
      <Skeleton className='mt-3 h-5 w-full' />
    </li>
  );
};

export default Dashboard;
