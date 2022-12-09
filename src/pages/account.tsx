import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import { User, Stats, DeleteUser } from '~/components/pages/account';
import { Skeleton } from '~/components/ui';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import { trpc } from '~/utils/trpc';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session?.user)
    return {
      redirect: { destination: '/sign-in', permanent: false },
    };

  return { props: { user: session.user } };
};

interface AccountProps {
  user?: Session['user'];
}

const Account = ({ user }: AccountProps) => {
  const { data: links, isLoading } = trpc.link.getAll.useQuery();
  const totalLinks = links?.length;
  const totalClicks = links?.reduce((pv, cv) => cv.clicks + pv, 0);
  const mostClicked = links?.sort((a, b) => a.clicks - b.clicks)[0];

  if (isLoading || !user) return <AccountSkeleton />;

  return (
    <main className='mx-auto mt-10 flex w-full max-w-6xl flex-col items-center space-y-10'>
      <User
        imageUrl={user.image || null}
        name={user.name || null}
        username={user.username || null}
      />

      <DeleteUser id={user.id} username={user.username || null} />

      <Stats
        clicks={totalClicks || 0}
        links={totalLinks || 0}
        slug={mostClicked?.slug || ''}
        url={mostClicked?.url || ''}
      />
    </main>
  );
};

const AccountSkeleton = () => {
  return (
    <main className='mx-auto mt-10 flex w-full max-w-6xl flex-col items-center space-y-11'>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <User.Skeleton />
      <Skeleton className='h-[40px] w-[184px] rounded-md' />
      <Stats.Skeleton />
    </main>
  );
};

export default Account;