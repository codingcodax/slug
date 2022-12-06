import { useState } from 'react';

import { Icons } from '~/components/ui';
import copyToClipboard from '~/utils/copyToClipboard';

interface CopyButtonProps {
  slug: string;
}

const CopyButton = ({ slug }: CopyButtonProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    copyToClipboard(slug);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <button
      className='outline-focus-visible hover:jtransition-colors ml-2 rounded-md p-1 hover:bg-mauve-400 hover:duration-200 focus-visible:bg-mauve-400 active:bg-mauve-500 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400 dark:active:bg-mauveDark-500'
      type='button'
      onClick={handleCopy}
    >
      {isCopy ? (
        <Icons.Check className='h-4 w-4 stroke-green-900' />
      ) : (
        <Icons.Copy className='h-4 w-4 stroke-mauve-1100 dark:stroke-mauveDark-1100' />
      )}
    </button>
  );
};

export default CopyButton;
