import { useAtom } from 'jotai';

import { Icons } from '~/components/ui';
import { createModalIsOpenAtom } from '~/store/createModal';

const AnyLinks = () => {
  const [, setIsOpen] = useAtom(createModalIsOpenAtom);

  return (
    <section className='flex flex-col items-center'>
      <p>You don&apos;t have any links.</p>
      <button
        className='outline-focus-visible mt-2 flex items-center rounded-md px-4 py-2 hover:bg-mauve-400 hover:transition-colors hover:duration-200 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400'
        type='button'
        onClick={() => setIsOpen(true)}
      >
        <Icons.Plus className='mr-2 h-4 w-4' /> Create one first
      </button>
    </section>
  );
};

export default AnyLinks;
