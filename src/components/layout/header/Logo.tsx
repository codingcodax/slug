import Link from 'next/link';

import { Icons } from '~/components/ui';

const Logo = () => {
  return (
    <Link className='flex items-center text-2xl' href='/'>
      <div className='mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-mauve-1200 dark:bg-mauveDark-1200'>
        <Icons.Link className='h-4 w-4 stroke-mauve-100 dark:stroke-mauveDark-100' />
      </div>
      slug
    </Link>
  );
};

export default Logo;
