import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <main className='mx-auto mt-10 flex max-w-6xl flex-col items-center space-y-10'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-medium'>Sign in to slug</h1>
        <p className='text-mauve-1100'>
          Short and manage your links like a pro.
        </p>
      </div>
      <button
        className='rounded-md bg-mauve-1200 px-4 py-2 text-mauve-100 dark:bg-mauveDark-400 dark:text-mauveDark-1200'
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        Sign in with GitHub
      </button>
    </main>
  );
};

export default Login;
