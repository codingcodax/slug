import Link from 'next/link';

import { Skeleton } from '~/components/ui';

interface LinkItemProps {
  children: React.ReactNode;
}

const LinkItem = ({ children }: LinkItemProps) => {
  return (
    <li className='rounded-md border border-mauve-600 p-4 transition-colors duration-200 hover:border-mauve-700 dark:border-mauveDark-600 dark:hover:border-mauveDark-700'>
      {children}
    </li>
  );
};

interface LinkItemSlugProps {
  children: React.ReactNode;
  slug: string;
}

// eslint-disable-next-line react/display-name
LinkItem.Slug = ({ children, slug }: LinkItemSlugProps) => {
  return (
    <Link className='text-xl' href={`https://slug.codingcodax.dev/${slug}`}>
      /{children}
    </Link>
  );
};

interface LinkItemLinkProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
LinkItem.Link = ({ children }: LinkItemLinkProps) => {
  return <p className='text-mauve-1100 dark:text-mauveDark-1100'>{children}</p>;
};

interface LinkItemDescriptionProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
LinkItem.Description = ({ children }: LinkItemDescriptionProps) => {
  return <p className='mt-2'>{children || 'No description'}</p>;
};

// eslint-disable-next-line react/display-name
LinkItem.Skeleton = () => {
  return (
    <li className='rounded-md border border-mauve-600 p-4 dark:border-mauveDark-600'>
      <Skeleton className='h-6 bg-mauve-500 dark:bg-mauveDark-500' />
      <Skeleton className='mt-2 h-5 w-3/5 bg-mauve-300 dark:bg-mauveDark-300' />
      <Skeleton className='mt-3 h-5 w-full' />
    </li>
  );
};

export default LinkItem;