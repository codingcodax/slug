import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { DeleteLinkSchema, LinkSchema } from '~/types/link';
import { trpc } from '~/utils/trpc';
import { Icons, Modal } from '~/components/ui';
import DeleteForm from '~/components/forms/DeleteForm';

interface DeleteModalProps extends DeleteLinkSchema {
  slug: LinkSchema['slug'];
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ id, slug, show, onClose }: DeleteModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = trpc.link.getAll.useQuery();
  const { mutate: deleteLink } = trpc.link.delete.useMutation({
    onSuccess: () => {
      refetch();
      onClose();
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setError('id', {
        type: 'manual',
        message: 'The link cannot be deleted, please try again later',
      });
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
    deleteLink({ id });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>Delete: {slug}</Modal.Title>
      <Modal.Description>Remove the link permanently</Modal.Description>
      <Modal.Body>
        <div className='mb-4 flex items-center text-sm text-amber-900'>
          <Icons.AlertCircle className='mr-2 h-4 w-4 stroke-amber-900' />
          <p>
            This action <strong>cannot</strong> be undone. This will permanently
            delete the <strong>/{slug}</strong> link
          </p>
        </div>

        <DeleteForm
          idError={errors.id?.message || ''}
          isDisabled={isValid ? false : true}
          isLoading={isLoading}
          register={register}
          slug={slug}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
