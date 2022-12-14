import type { User } from '@prisma/client';
import { useState } from 'react';

import { DeleteUserModal } from '~/components/modals';
import type { DeleteUserSchema } from '~/types/user';

interface DeleteUserProps extends DeleteUserSchema {
  username: User['username'];
}

const DeleteUser = ({ id, username }: DeleteUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className='error-button' onClick={() => setIsOpen(true)}>
        Delete your account
      </button>

      <DeleteUserModal
        id={id}
        show={isOpen}
        username={username}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default DeleteUser;
