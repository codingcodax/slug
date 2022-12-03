import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { EditLinkSchema } from '~/types/link';
import cn from '~/utils/cn';
import { trpc } from '~/utils/trpc';
import { Icons, Modal } from '~/components/ui';

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
    formState: { errors },
  } = useForm<EditLinkSchema>();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: editLink } = trpc.link.edit.useMutation({
    onSuccess: () => {
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
        <form
          className='grid max-w-xl gap-y-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-4'>
            <div className='grid grid-flow-row gap-y-1'>
              <label htmlFor='url'>Enter the new URL:</label>
              <input
                className='input'
                defaultValue={url}
                id='url'
                placeholder='https://github.com/codingcodax/'
                type='text'
                {...register('url', {
                  required: { value: true, message: 'Please enter a URL' },
                  minLength: {
                    value: 10,
                    message:
                      'Please enter a valid URL. It should be at least 10 characters long',
                  },
                  pattern: {
                    value: /^https?:\/\//i,
                    message:
                      'Please enter a valid URL. It should start with http:// or https://',
                  },
                })}
              />

              {errors.url && <Error>{errors.url.message?.toString()}</Error>}
            </div>

            <div className='grid grid-flow-row gap-y-1'>
              <label htmlFor='slug'>
                Enter your new slug:
                <br />
                <span className='text-sm text-mauve-1100 dark:text-mauveDark-1100'>
                  https://slug.codingcodax.dev/&#36;&#10100;your-slug&#10101;
                </span>
              </label>
              <input
                className='input'
                defaultValue={slug}
                id='slug'
                placeholder='my-portfolio'
                type='text'
                {...register('slug', {
                  required: {
                    value: true,
                    message:
                      'Please enter a custom slug or generate a random one',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/i,
                    message:
                      'Please enter a valid slug with blank space or special characters.',
                  },
                })}
              />

              {errors.slug && <Error>{errors.slug.message?.toString()}</Error>}
            </div>

            <div className='grid grid-flow-row gap-y-1'>
              <label htmlFor='description'>Description:</label>
              <textarea
                className={cn('input max-h-32')}
                defaultValue={description || ''}
                id='description'
                placeholder='This link redirecs to my awesome portfolio'
                {...register('description')}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-4'>
            <button className='primary-button' type='submit'>
              {isLoading ? 'Updating your link' : 'Update your link'}
            </button>
            <button className='secondary-link' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

interface ErrorProps {
  children: React.ReactNode;
}

const Error = ({ children }: ErrorProps) => {
  return (
    <span className='flex items-center text-sm text-red-900'>
      <Icons.AlertCircle className='mr-2 h-4 w-4 stroke-red-900' />
      {children}
    </span>
  );
};

export default EditModal;