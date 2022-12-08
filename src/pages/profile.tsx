import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import { User } from '~/components/pages/profile';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';

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
  return (
    <main className='mx-auto mt-10 grid w-full max-w-6xl grid-cols-[auto_1fr] gap-10'>
      <User
        imageUrl={user?.image || ''}
        name={user?.name || ''}
        username={user?.username || ''}
      />
    </main>
  );
};

export default Profile;
