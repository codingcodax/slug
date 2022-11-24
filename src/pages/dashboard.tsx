import { type GetServerSideProps } from 'next';
import Link from 'next/link';

import { Icons } from '~/components/ui';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return {
      redirect: { destination: '/sign-in', permanent: false },
    };

  return { props: { session } };
};

const Dashboard = () => {
  return (
    <main className='mx-auto w-full max-w-6xl'>
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-3xl font-medium'>Dashboard</h1>
        <Link
          className='flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 dark:hover:bg-mauveDark-400'
          href='/dashboard/new'
        >
          <Icons.Plus className='mr-2 h-4 w-4' /> Create new link
        </Link>
      </div>

      <div className='flex flex-col items-center'>
        <p>You don&apos;t have any links.</p>
        <Link
          className='flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 dark:hover:bg-mauveDark-400'
          href='/dashboard/new'
        >
          <Icons.Plus className='mr-2 h-4 w-4' /> Create one first
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
