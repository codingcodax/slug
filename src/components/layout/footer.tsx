const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-6xl'>
      <p className='py-4 text-center'>
        Handcrafted with <span className='font-mono'>🤍</span> and{' '}
        <a
          className='font-medium underline decoration-wavy underline-offset-2'
          href='https://create.t3.gg/'
          rel='noopener noreferrer'
          target='_blank'
        >
          t3-stack
        </a>{' '}
        by{' '}
        <a
          className='font-medium underline decoration-wavy underline-offset-2'
          href='https://www.codingcodax.dev/'
          rel='noopener noreferrer'
          target='_blank'
        >
          &#64;codingcodax
        </a>{' '}
        ^_^
      </p>
    </footer>
  );
};

export default Footer;
