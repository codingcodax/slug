import Link from 'next/link';

import { Icons } from '~/components/ui';

const AnyLinks = () => {
  return (
    <section className='flex flex-col items-center'>
      <p>You don&apos;t have any links.</p>
      <Link
        className='flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 dark:hover:bg-mauveDark-400'
        href='/dashboard/new'
      >
        <Icons.Plus className='mr-2 h-4 w-4' /> Create one first
      </Link>
    </section>
  );
};

export default AnyLinks;
