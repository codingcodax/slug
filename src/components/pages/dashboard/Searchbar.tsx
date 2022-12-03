import type { ChangeEvent } from 'react';

import cn from '~/utils/cn';
import { Icons } from '~/components/ui';

interface SearchbarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const Searchbar = ({ value, onChange, isDisabled }: SearchbarProps) => {
  return (
    <div className='relative mb-4 w-full'>
      <div className='absolute top-0 left-0 flex h-[42px] w-10 items-center justify-center'>
        <Icons.Search className='h-6 w-6 stroke-mauve-1100 dark:stroke-mauveDark-1000' />
      </div>
      <input
        className={cn(
          'input w-full pl-10',
          isDisabled ? 'cursor-not-allowed' : ''
        )}
        disabled={isDisabled}
        placeholder='Search'
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbar;
