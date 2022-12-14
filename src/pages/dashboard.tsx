import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { type GetServerSideProps } from 'next';
import { useAtom } from 'jotai';

import { trpc } from '~/utils/trpc';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import { isOpenAtom } from '~/store/createModal';
import { Seo } from '~/components';
import { Icons } from '~/components/ui';
import { AnyLinks, Links, Searchbar } from '~/components/pages/dashboard';
import { CreateModal } from '~/components/modals';

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
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const filteredLinks = useMemo(() => {
    return links?.filter(
      (link) =>
        link.slug.toLowerCase().includes(search.toLowerCase()) ||
        link.url.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, links]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Seo name='Dashboard' path='/dashboard' />

      <main className='mx-auto w-full max-w-6xl'>
        <section className='mb-10 flex items-center justify-between'>
          <h1 className='text-3xl font-medium'>Dashboard</h1>
          <button
            className='outline-focus-visible flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'
            onClick={handleModal}
          >
            <Icons.Plus className='mr-2 h-4 w-4' /> Create new link
          </button>
        </section>

        <Searchbar
          isDisabled={isLoading || links?.length === 0}
          value={search}
          onChange={handleSearch}
        />

        {isLoading && <Links.Skeleton />}
        {links && <Links links={filteredLinks} />}
        {links?.length === 0 && <AnyLinks />}

        <CreateModal show={isOpen} onClose={handleModal} />
      </main>
    </>
  );
};

export default Dashboard;
