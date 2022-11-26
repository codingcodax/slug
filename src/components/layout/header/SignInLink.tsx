import Link from 'next/link';

const SignInLink = () => {
  return (
    <Link
      className='outline-focus-visible rounded-md px-3 py-2 transition-colors duration-200 hover:bg-mauve-400 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'
      href='/sign-in'
    >
      Sign in &rarr;
    </Link>
  );
};

export default SignInLink;
