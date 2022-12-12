import type { UseFormRegister } from 'react-hook-form';

import type { LinkSchema } from '~/types/link';
import { Form } from '~/components/ui';
import cn from '~/utils/cn';

import Error from './Error';

interface DeleteFormProps {
  slug: LinkSchema['slug'];
  idError: string;
  isDisabled: boolean;
  register: UseFormRegister<{ id: string }>;
  isLoading: boolean;
  onSubmit?: React.DOMAttributes<HTMLFormElement>['onSubmit'];
  onClose: () => void;
}

const DeleteForm = ({
  slug,
  idError,
  isDisabled,
  register,
  isLoading,
  onSubmit,
  onClose,
}: DeleteFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Items>
        <Form.Item>
          <label htmlFor='id'>
            Please type <strong>{`/${slug}`}</strong> to confirm
          </label>
          <input
            className='input'
            id='id'
            placeholder='...'
            type='text'
            {...register('id', { validate: (value) => value === `/${slug}` })}
          />

          {idError && <Error>{idError}</Error>}
        </Form.Item>
      </Form.Items>

      <Form.Buttons>
        <button
          className={cn(
            'error-button',
            isDisabled ? 'cursor-not-allowed opacity-40 hover:bg-red-900' : ''
          )}
          disabled={isDisabled}
          type='submit'
        >
          {isLoading ? 'Deleting your link' : 'Delete your link'}
        </button>
        <button className='secondary-button' type='button' onClick={onClose}>
          Cancel
        </button>
      </Form.Buttons>
    </Form>
  );
};

export default DeleteForm;
