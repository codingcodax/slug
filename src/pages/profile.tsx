import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import { User, Stats, DeleteUser } from '~/components/pages/profile';
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

interface ProfileProps {
  user?: Session['user'];
}

const Profile = ({ user }: ProfileProps) => {
  const { data: links, isLoading } = trpc.link.getAll.useQuery();
  const totalLinks = links?.length;
  const totalClicks = links?.reduce((pv, cv) => cv.clicks + pv, 0);
  const mostClicked = links?.sort((a, b) => a.clicks - b.clicks)[0];

  if (isLoading || !user) return <ProfileSkeleton />;

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

const ProfileSkeleton = () => {
  return (
    <main className='mx-auto mt-10 flex w-full max-w-6xl flex-col items-center space-y-11'>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <User.Skeleton />
      <Stats.Skeleton />
    </main>
  );
};

export default Profile;
