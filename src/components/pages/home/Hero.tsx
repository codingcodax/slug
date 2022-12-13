import Link from 'next/link';

import { ExternalLink } from '~/components/ui';

const Hero = () => {
  return (
    <main className='mt-10 flex flex-col items-center space-y-10'>
      <div className='space-y-4 text-center'>
        <p className='text-sm uppercase'>Meet slug</p>
        <h1 className='text-md text-6xl font-medium capitalize'>
          Open source link shortener
        </h1>
        <p className='text-2xl text-mauve-1100 dark:text-mauveDark-1100'>
          slug is a link managment plarform to shorten your links for devs.
        </p>
      </div>

      <div className='space-x-4'>
        <Link className='primary-link' href='/dashboard'>
          Get Started &rarr;
        </Link>

        <ExternalLink
          className='secondary-link'
          href='https://github.com/codingcodax/slug'
        >
          Star on GitHub
        </ExternalLink>
      </div>
    </main>
  );
};

export default Hero;
