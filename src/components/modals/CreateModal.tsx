import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateLinkSchema } from '~/types/link';
import { trpc } from '~/utils/trpc';
import { Modal } from '~/components/ui';
import { CreateForm } from '~/components/forms';

interface CreateModalProps {
  show: boolean;
  onClose: () => void;
  refetch: () => void;
}

const CreateModal = ({ show, onClose, refetch }: CreateModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CreateLinkSchema>();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createLink } = trpc.link.create.useMutation({
    onSuccess: () => {
      refetch();
      onClose();
      setIsLoading(false);
      setValue('url', '');
      setValue('slug', '');
      setValue('description', '');
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

  const onSubmit = (values: CreateLinkSchema) => {
    setIsLoading(true);
    createLink(values);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>Create</Modal.Title>
      <Modal.Description>Short a new URL</Modal.Description>
      <Modal.Body>
        <CreateForm
          isLoading={isLoading}
          register={register}
          setValue={setValue}
          slugError={errors.slug?.message || ''}
          urlError={errors.url?.message || ''}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
