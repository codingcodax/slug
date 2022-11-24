import { type GetServerSideProps } from 'next';

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
    <div>
      <p>Dashboard page</p>
    </div>
  );
};

export default Dashboard;
