import Image from 'next/image';

interface UserProps {
  name: string;
  username: string;
  imageUrl: string;
}

const User = ({ name, username, imageUrl }: UserProps) => {
  return (
    <div className='flex flex-col items-center space-y-2 rounded-sm'>
      <Image alt={`${name} profile`} height={100} src={imageUrl} width={100} />
      <p>&#x40;{username}</p>
    </div>
  );
};

export default User;
