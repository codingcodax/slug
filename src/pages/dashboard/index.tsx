import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';

import { trpc } from '~/utils/trpc';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import { Seo } from '~/components';
import { Icons } from '~/components/ui';
import { AnyLinks, Links, Searchbar } from '~/components/pages/dashboard';

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Seo name='Dashboard' path='/dashboard' />

      <main className='mx-auto w-full max-w-6xl'>
        <section className='mb-10 flex items-center justify-between'>
          <h1 className='text-3xl font-medium'>Dashboard</h1>
          <Link
            className='outline-focus-visible flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'
            href='/dashboard/new'
          >
            <Icons.Plus className='mr-2 h-4 w-4' /> Create new link
          </Link>
        </section>

        <Searchbar
          isDisabled={isLoading || links?.length === 0}
          value={search}
          onChange={handleSearch}
        />

        {isLoading && <Links.Skeleton />}
        {links && <Links links={filteredLinks} />}
        {links?.length === 0 && <AnyLinks />}
      </main>
    </>
  );
};

export default Dashboard;
