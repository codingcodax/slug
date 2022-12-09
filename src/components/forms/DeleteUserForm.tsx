import type { User } from '@prisma/client';
import type { UseFormRegister } from 'react-hook-form';

import cn from '~/utils/cn';
import { Form } from '~/components/ui';

import Error from './Error';

interface DeleteUserFormProps {
  username: User['username'];
  idError: string;
  isDisabled: boolean;
  register: UseFormRegister<{ id: string }>;
  isLoading: boolean;
  onSubmit?: React.DOMAttributes<HTMLFormElement>['onSubmit'];
  onClose: () => void;
}

const DeleteUserForm = ({
  username,
  idError,
  isDisabled,
  register,
  isLoading,
  onSubmit,
  onClose,
}: DeleteUserFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Items>
        <Form.Item>
          <label htmlFor='id'>
            Please type <strong>{`/${username}`}</strong> to confirm
          </label>
          <input
            className='input'
            id='id'
            placeholder='...'
            type='text'
            {...register('id', {
              validate: (value) => value === `/${username}`,
            })}
          />

          {idError && <Error>{idError}</Error>}
        </Form.Item>
      </Form.Items>

      <Form.Buttons>
        <button
          className={cn(
            'primary-button',
            isDisabled
              ? 'cursor-not-allowed opacity-40 hover:bg-mauve-1200 dark:hover:bg-mauveDark-1200'
              : ''
          )}
          type='submit'
        >
          {isLoading ? 'Deleting your account' : 'Delete your accont'}
        </button>
        <button className='secondary-button' type='button' onClick={onClose}>
          Cancel
        </button>
      </Form.Buttons>
    </Form>
  );
};

export default DeleteUserForm;
