import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { trpc } from '~/utils/trpc';
import { Icons, Modal } from '~/components/ui';
import DeleteForm from '~/components/forms/DeleteForm';
import { deleteModalIsOpenAtom, deleteModalDataAtom } from '~/store/modals';

const DeleteModal = () => {
  const [isOpen, setIsOpen] = useAtom(deleteModalIsOpenAtom);
  const [{ id, slug }] = useAtom(deleteModalDataAtom);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<{ id: string }>();

  const { refetch } = trpc.link.getAll.useQuery();
  const { mutate: deleteLink } = trpc.link.delete.useMutation({
    onSuccess: () => {
      toast.success('Your link was deleted!');
      refetch();
      setIsOpen(false);
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

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const onSubmit = () => {
    setIsLoading(true);
    deleteLink({ id });
  };

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
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
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
