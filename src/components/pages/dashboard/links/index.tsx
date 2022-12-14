import { type LinkSchema } from '~/types/link';

import LinkItem from './LinkItem';

interface LinksProps {
  links: LinkSchema[] | undefined;
}

const Links = ({ links }: LinksProps) => {
  return (
    <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {links?.map(({ id, slug, url, description, clicks }) => (
        <LinkItem key={id}>
          <LinkItem.Slug clicks={clicks} slug={slug}>
            {slug}
          </LinkItem.Slug>
          <LinkItem.Link>{url}</LinkItem.Link>
          <LinkItem.Description>{description}</LinkItem.Description>
          <LinkItem.Options
            description={description}
            id={id}
            slug={slug}
            url={url}
          />
        </LinkItem>
      ))}
    </ul>
  );
};

// eslint-disable-next-line react/display-name
Links.Skeleton = () => (
  <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
    <LinkItem.Skeleton />
    <LinkItem.Skeleton variant={2} />
    <LinkItem.Skeleton variant={1} />
  </ul>
);

export default Links;
