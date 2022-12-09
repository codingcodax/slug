import { User } from '@prisma/client';
import Image from 'next/image';

import { Skeleton } from '~/components/ui';

interface UserProps {
  name: User['name'];
  username: User['username'];
  imageUrl: User['image'];
}

const User = ({ name, username, imageUrl }: UserProps) => {
  return (
    <div className='flex flex-col items-center space-y-2 rounded-sm'>
      <Image
        alt={`${name} profile`}
        height={100}
        src={imageUrl || ''}
        width={100}
      />
      <p>&#x40;{username}</p>
    </div>
  );
};

// eslint-disable-next-line react/display-name
User.Skeleton = () => {
  return (
    <div className='flex flex-col items-center space-y-4'>
      <Skeleton className='h-[100px] w-[100px] rounded-md' />
      <Skeleton className='h-4 w-[120%]' />
    </div>
  );
};

export default User;
