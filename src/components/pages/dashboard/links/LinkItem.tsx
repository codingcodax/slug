import getBaseUrl from '~/utils/getBaseUrl';
import { ExternalLink, Skeleton } from '~/components/ui';

import LinkItemOptions, { type LinkItemOptionsProps } from './LinkItemOptions';
import CopyButton from './CopyButton';
import Clicks from './Clicks';

interface LinkItemProps {
  children: React.ReactNode;
}

const LinkItem = ({ children }: LinkItemProps) => {
  return (
    <li className='relative rounded-md border border-mauve-600 p-4 transition-colors duration-200 hover:border-mauve-700 dark:border-mauveDark-600 dark:hover:border-mauveDark-700'>
      {children}
    </li>
  );
};

interface LinkItemSlugProps {
  children: React.ReactNode;
  slug: string;
  clicks: number;
}

// eslint-disable-next-line react/display-name
LinkItem.Slug = ({ children, slug, clicks }: LinkItemSlugProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <ExternalLink
        className='rounded-md text-xl hover:text-mauve-1200/80 focus:outline-none focus-visible:text-mauve-1200/80 focus-visible:underline focus-visible:decoration-wavy focus-visible:underline-offset-2 dark:hover:text-mauveDark-1200/80 dark:focus-visible:text-mauveDark-1200/80'
        href={`${getBaseUrl()}/${slug}`}
      >
        /{children}
      </ExternalLink>

      <CopyButton slug={`${getBaseUrl()}/${slug}`} />

      <Clicks clicks={clicks} />
    </div>
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
LinkItem.Options = ({ id, slug, url, description }: LinkItemOptionsProps) => (
  <LinkItemOptions description={description} id={id} slug={slug} url={url} />
);

interface LinkItemSkeletonProps {
  variant?: 1 | 2;
}

// eslint-disable-next-line react/display-name
LinkItem.Skeleton = ({ variant }: LinkItemSkeletonProps) => {
  if (variant === 1)
    return (
      <li className='rounded-md border border-mauve-600 p-4 dark:border-mauveDark-600'>
        <Skeleton className='h-6 bg-mauve-500 dark:bg-mauveDark-500' />
        <Skeleton className='mt-2 h-5 w-3/5 bg-mauve-300 dark:bg-mauveDark-300' />
        <Skeleton className='mt-3 h-5 w-full' />
      </li>
    );

  if (variant === 2)
    return (
      <li className='rounded-md border border-mauve-600 p-4 dark:border-mauveDark-600'>
        <Skeleton className='h-6 bg-mauve-500 dark:bg-mauveDark-500' />
        <Skeleton className='mt-2 h-5 w-1/2 bg-mauve-300 dark:bg-mauveDark-300' />
        <Skeleton className='mt-3 h-5 w-3/5' />
      </li>
    );

  return (
    <li className='rounded-md border border-mauve-600 p-4 dark:border-mauveDark-600'>
      <Skeleton className='h-6 w-1/4 bg-mauve-500 dark:bg-mauveDark-500' />
      <Skeleton className='mt-2 h-5 w-1/2 bg-mauve-300 dark:bg-mauveDark-300' />
      <Skeleton className='mt-3 h-5 w-1/3' />
    </li>
  );
};

export default LinkItem;
