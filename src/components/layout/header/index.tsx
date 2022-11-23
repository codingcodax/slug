import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href='/'>Slug</Link>

      <Link href='/login'>Login</Link>
      <Link href='/sign-up'>Sign up &rarr;</Link>
    </header>
  );
};

export default Header;
