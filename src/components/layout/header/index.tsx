import { useSession } from 'next-auth/react';

import Logo from './Logo';
import SignInLink from './SignInLink';
import AuthDropdown from './AuthDropdown';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className='mx-auto flex w-full max-w-6xl items-center justify-between py-4'>
      <Logo />

      {status === 'unauthenticated' ? (
        <SignInLink />
      ) : (
        <AuthDropdown
          isLoading={status === 'loading' ? true : false}
          username={session?.user?.username || ''}
        />
      )}
    </header>
  );
};

export default Header;
