import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import type { EditLinkSchema } from '~/types/link';
import cn from '~/utils/cn';
import generateRandomSlug from '~/utils/generateRandomSlug';
import { Form } from '~/components/ui';

import { urlValidation, slugValidation } from './validations';
import Error from './Error';
import RandomizeButton from './RandomizeButton';

interface EditFormProps {
  url: string;
  slug: string;
  description: string;
  urlError: string;
  setValue: UseFormSetValue<EditLinkSchema>;
  slugError: string;
  register: UseFormRegister<EditLinkSchema>;
  isLoading: boolean;
  onSubmit?: React.DOMAttributes<HTMLFormElement>['onSubmit'];
  onClose: () => void;
}

const EditForm = ({
  url,
  slug,
  description,
  urlError,
  setValue,
  slugError,
  register,
  isLoading,
  onSubmit,
  onClose,
}: EditFormProps) => {
  const handleRandomSlug = () => {
    setValue('slug', generateRandomSlug());
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Items>
        <Form.Item>
          <label htmlFor='url'>Enter the new URL:</label>
          <input
            className='input'
            defaultValue={url}
            id='url'
            placeholder='https://github.com/codingcodax/'
            type='text'
            {...register('url', urlValidation)}
          />

          {urlError && <Error>{urlError}</Error>}
        </Form.Item>

        <Form.Item>
          <div className='flex items-end justify-between'>
            <label htmlFor='slug'>
              Enter your new slug:
              <br />
              <span className='text-sm text-mauve-1100 dark:text-mauveDark-1100'>
                https://slug.codingcodax.dev/&#36;&#10100;your-slug&#10101;
              </span>
            </label>

            <RandomizeButton onClick={handleRandomSlug} />
          </div>
          <input
            className='input'
            defaultValue={slug}
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
            defaultValue={description}
            id='description'
            placeholder='This link redirecs to my awesome portfolio'
            {...register('description')}
          />
        </Form.Item>
      </Form.Items>

      <Form.Buttons>
        <button className='primary-button' type='submit'>
          {isLoading ? 'Updating your link' : 'Update your link'}
        </button>
        <button className='secondary-link' type='button' onClick={onClose}>
          Cancel
        </button>
      </Form.Buttons>
    </Form>
  );
};

export default EditForm;
