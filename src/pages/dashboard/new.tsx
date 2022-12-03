import { type GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import type { CreateLinkSchema } from '~/types/link';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';
import { trpc } from '~/utils/trpc';
import cn from '~/utils/cn';
import { Icons } from '~/components/ui';
import { Seo } from '~/components';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session)
    return {
      redirect: { destination: '/sign-in', permanent: false },
    };

  return { props: { session } };
};

const New = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<CreateLinkSchema>();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createLink } = trpc.link.create.useMutation({
    onSuccess: () => {
      router.push('/dashboard');
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

  const onSubmit = (values: CreateLinkSchema) => {
    setIsLoading(true);
    createLink(values);
  };

  return (
    <>
      <Seo name='New' path='/dashboard/new' />

      <main className='mx-auto w-full max-w-xl'>
        <h1 className='mb-10 text-3xl font-medium'>New</h1>

        <form
          className='grid max-w-xl gap-y-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-4'>
            <div className='grid grid-flow-row gap-y-1'>
              <label htmlFor='url'>Enter your link here:</label>
              <input
                className='input'
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
                Select your slug <br />
                <span className='text-sm text-mauve-1100 dark:text-mauveDark-1100'>
                  https://slug.codingcodax.dev/&#36;&#10100;your-slug&#10101;
                </span>
              </label>
              <input
                className='input'
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
              <label htmlFor='description'>Description (optional)</label>
              <textarea
                className={cn('input max-h-32')}
                id='description'
                placeholder='This link redirecs to my awesome portfolio'
                {...register('description')}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-4'>
            <button className='primary-button' type='submit'>
              {isLoading ? 'Shorting your link...' : 'Short your link'}
            </button>
            <Link className='secondary-link' href='/dashboard'>
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </>
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

export default New;
