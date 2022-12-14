import { type GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';

import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import { Icons } from '~/components/ui';
import { Seo } from '~/components';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session)
    return {
      redirect: { destination: '/dashboard', permanent: false },
    };

  return { props: { session } };
};

const SignIn = () => {
  return (
    <>
      <Seo name='Sign In' path='/sign-in' />

      <main className='mx-auto mt-10 flex max-w-6xl flex-col items-center space-y-10'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-medium'>Sign in to slug</h1>
          <p className='text-mauve-1100'>
            Short and manage your links like a pro.
          </p>
        </div>
        <button
          className='outline-focus-visible flex items-center rounded-md bg-mauveDark-400 px-4 py-2 text-mauve-100 hover:bg-mauveDark-500 hover:transition-colors hover:duration-200 focus-visible:bg-mauveDark-500 dark:text-mauveDark-1200'
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        >
          <Icons.Github className='mr-2 h-4 w-4' />
          Sign in with GitHub
        </button>
      </main>
    </>
  );
};

export default SignIn;
