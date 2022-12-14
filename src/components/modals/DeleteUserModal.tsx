import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import type { User } from '@prisma/client';

import type { DeleteUserSchema } from '~/types/user';
import { trpc } from '~/utils/trpc';
import { Icons, Modal } from '~/components/ui';
import DeleteUserForm from '~/components/forms/DeleteUserForm';

interface DeleteUserModalProps extends DeleteUserSchema {
  username: User['username'];
  show: boolean;
  onClose: () => void;
}

const DeleteUserModal = ({
  id,
  username,
  show,
  onClose,
}: DeleteUserModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteUser } = trpc.user.delete.useMutation({
    onSuccess: () => {
      signOut({ callbackUrl: '/' });
      onClose();
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setError('id', {
        type: 'manual',
        message: 'Your account cannot be deleted, please try again later',
      });
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
    deleteUser({ id });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>Delete accout</Modal.Title>
      <Modal.Description>Delete your account permanently</Modal.Description>
      <Modal.Body>
        <div className='mb-4 flex items-center text-sm text-red-900'>
          <Icons.AlertCircle className='mr-2 h-4 w-4 stroke-red-900' />
          <p>
            This action <strong>cannot</strong> be undone. This will permanently
            delete the your account, shorten links and clicks.
          </p>
        </div>

        <DeleteUserForm
          idError={errors.id?.message || ''}
          isDisabled={isValid ? false : true}
          isLoading={isLoading}
          register={register}
          username={username}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
