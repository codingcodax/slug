import { ExternalLink } from '~/components/ui';

interface StatsProps {
  links: number;
  clicks: number;
  url: string;
  slug: string;
}

const Stats = ({ links, clicks, url, slug }: StatsProps) => {
  return (
    <p className='text-center'>
      You have <strong>{links} shorten links</strong>,{' '}
      <strong>{clicks} total clicks</strong> and the most clicked is{' '}
      <ExternalLink
        className='font-medium underline decoration-wavy underline-offset-2 transition-colors duration-200 hover:text-mauve-1200/80 focus:outline-none focus-visible:text-mauve-1200/80 dark:hover:text-mauveDark-1200/80 dark:focus-visible:text-mauveDark-1200/80'
        href={url}
      >
        /{slug}
      </ExternalLink>
    </p>
  );
};

export default Stats;
