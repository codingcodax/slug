import type { UseFormRegister } from 'react-hook-form';

import type { CreateLinkSchema } from '~/types/link';
import cn from '~/utils/cn';
import { Form } from '~/components/ui';

import { urlValidation, slugValidation } from './validations';
import Error from './Error';

interface CreateFormProps {
  urlError: string;
  slugError: string;
  register: UseFormRegister<CreateLinkSchema>;
  isLoading: boolean;
  onSubmit?: React.DOMAttributes<HTMLFormElement>['onSubmit'];
  onClose: () => void;
}

const CreateForm = ({
  urlError,
  slugError,
  register,
  isLoading,
  onSubmit,
  onClose,
}: CreateFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Items>
        <Form.Item>
          <label htmlFor='url'>Enter your destination URL:</label>
          <input
            className='input'
            id='url'
            placeholder='https://github.com/codingcodax/'
            type='text'
            {...register('url', urlValidation)}
          />

          {urlError && <Error>{urlError}</Error>}
        </Form.Item>

        <Form.Item>
          <label htmlFor='slug'>
            Enter your short link:
            <br />
            <span className='text-sm text-mauve-1100 dark:text-mauveDark-1100'>
              https://slug.codingcodax.dev/&#36;&#10100;your-slug&#10101;
            </span>
          </label>
          <input
            className='input'
            id='slug'
            placeholder='my-portfolio'
            type='text'
            {...register('slug', slugValidation)}
          />

          {slugError && <Error>{slugError}</Error>}
        </Form.Item>

        <Form.Item>
          <label htmlFor='description'>Description:</label>
          <textarea
            className={cn('input max-h-32')}
            id='description'
            placeholder='This link redirecs to my awesome portfolio'
            {...register('description')}
          />
        </Form.Item>
      </Form.Items>

      <Form.Buttons>
        <button className='primary-button' type='submit'>
          {isLoading ? 'Shorting your link...' : 'Short your link'}
        </button>
        <button className='secondary-link' onClick={onClose}>
          Cancel
        </button>
      </Form.Buttons>
    </Form>
  );
};

export default CreateForm;
