import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { EditLinkSchema } from '~/types/link';
import { trpc } from '~/utils/trpc';
import { Modal } from '~/components/ui';
import { EditForm } from '~/components/forms';

interface EditModalProps extends EditLinkSchema {
  show: boolean;
  onClose: () => void;
}

const EditModal = ({
  show,
  onClose,
  id,
  slug,
  url,
  description,
}: EditModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<EditLinkSchema>();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = trpc.link.getAll.useQuery();
  const { mutate: editLink } = trpc.link.edit.useMutation({
    onSuccess: () => {
      refetch();
      onClose();
      setIsLoading(false);
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

  const onSubmit = (values: EditLinkSchema) => {
    setIsLoading(true);
    editLink({ ...values, id });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>Edit: {slug}</Modal.Title>
      <Modal.Description>Update the URL or the description</Modal.Description>
      <Modal.Body>
        <EditForm
          description={description || ''}
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
