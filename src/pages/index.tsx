import { type NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className='mx-auto mt-10 flex max-w-6xl flex-col items-center space-y-10 text-center'>
      <div className='space-y-4'>
        <p className='text-sm uppercase'>Meet slug</p>
        <h1 className='text-md text-6xl font-medium capitalize'>
          Open source link shortener
        </h1>
        <p className='text-2xl text-mauve-1100 dark:text-mauveDark-1100'>
          slug is a link managment plarform to shorten your links for devs.
        </p>
      </div>

      <div className='space-x-4'>
        <Link
          className='inline-block rounded-md bg-mauve-1200 py-2 px-4 text-mauve-100 hover:bg-mauve-1200/90 dark:bg-mauveDark-1200 dark:text-mauveDark-100 dark:hover:bg-mauveDark-1200/90'
          href='/login'
        >
          Get Started &rarr;
        </Link>

        <a
          className='inline-block rounded-md bg-mauve-400 py-2 px-4 hover:bg-mauve-500 dark:bg-mauveDark-400 dark:hover:bg-mauveDark-500'
          href='https://github.com/codingcodax/slug'
          rel='noopener noreferrer'
          target='_blank'
        >
          Star on GitHub
        </a>
      </div>
    </main>
  );
};

export default Home;
