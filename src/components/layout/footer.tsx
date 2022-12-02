import { ExternalLink } from '~/components/ui';

const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-6xl'>
      <p className='py-4 text-center'>
        Handcrafted with <span className='font-mono'>🤍</span> and{' '}
        <ExternalLink
          className='font-medium underline decoration-wavy underline-offset-2 transition-colors duration-200 hover:text-mauve-1200/80 dark:hover:text-mauveDark-1200/80'
          href='https://create.t3.gg/'
        >
          t3-stack
        </ExternalLink>{' '}
        by{' '}
        <ExternalLink
          className='font-medium underline decoration-wavy underline-offset-2  transition-colors duration-200 hover:text-mauve-1200/80 dark:hover:text-mauveDark-1200/80'
          href='https://www.codingcodax.dev/'
        >
          &#64;codingcodax
        </ExternalLink>{' '}
        ^_^
      </p>
    </footer>
  );
};

export default Footer;
