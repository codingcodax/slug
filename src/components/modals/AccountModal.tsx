import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Modal } from '~/components/ui';

import DeleteUser from './DeleteUser';
import ThemeSwitch from './ThemeSwitch';

interface UserModalProps {
  show: boolean;
  onClose: () => void;
}

const UserModal = ({ show, onClose }: UserModalProps) => {
  const { data: session } = useSession();

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Body>
        <div className='relative flex flex-col items-center'>
          <Image
            alt={`${session?.user?.name} profile`}
            height={100}
            src={session?.user?.image || ''}
            width={100}
          />
          <p className='mb-10'>&#x40;{session?.user?.username}</p>

          <DeleteUser
            id={session?.user?.id || ''}
            username={session?.user?.username || ''}
          />

          <div className='absolute top-0 right-0'>
            <ThemeSwitch />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
