import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { AnyLinks, Links } from '~/components/pages/dashboard';
import { Icons } from '~/components/ui';
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

      {isLoading && <Links.Skeleton />}
      {links && <Links links={filteredLinks} />}

      {links?.length === 0 && <AnyLinks />}
    </main>
  );
};

export default Dashboard;
