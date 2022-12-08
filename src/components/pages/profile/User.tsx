import Image from 'next/image';

interface UserProps {
  name: string;
  username: string;
  imageUrl: string;
}

const User = ({ name, username, imageUrl }: UserProps) => {
  return (
    <section>
      <Image alt={`${name} profile`} height={100} src={imageUrl} width={100} />
      <p>&#x40;{username}</p>
    </section>
  );
};

export default User;
