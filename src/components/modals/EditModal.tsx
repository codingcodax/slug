import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { EditLinkSchema } from '~/types/link';
import { editModalIsOpenAtom, editModalDataAtom } from '~/store/modals';
import { trpc } from '~/utils/trpc';
import { Modal } from '~/components/ui';
import { EditForm } from '~/components/forms';

const EditModal = () => {
  const [isOpen, setIsOpen] = useAtom(editModalIsOpenAtom);
  const [{ id, slug, url, description }, setData] = useAtom(editModalDataAtom);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<EditLinkSchema>();

  const { refetch } = trpc.link.getAll.useQuery();
  const { mutate: editLink } = trpc.link.edit.useMutation({
    onSuccess: () => {
      toast.success('Your link was updated!');
      refetch();
      setIsOpen(false);
      setIsLoading(false);
      setData({ id: -1, slug: '', url: '', description: '' });
    },
    onError: () => {
      setIsLoading(false);
      setError('slug', {
        type: 'manual',
        message:
          'Slug already exists. Please try another one or generate a random one',
      });
    },
  });

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const onSubmit = (values: EditLinkSchema) => {
    setIsLoading(true);
    editLink({ ...values, id });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Title>Edit: {slug}</Modal.Title>
      <Modal.Description>Update the URL or the description</Modal.Description>
      <Modal.Body>
        <EditForm
          description={description || 'No Description'}
          isLoading={isLoading}
          register={register}
          setValue={setValue}
          slug={slug}
          slugError={errors.slug?.message || ''}
          url={url}
          urlError={errors.url?.message || ''}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
