import { Icons } from '~/components/ui';

interface RandomizeButtonProps {
  onClick: () => void;
}

const RandomizeButton = ({ onClick }: RandomizeButtonProps) => {
  return (
    <button
      className='outline-focus-visible mb-1 flex items-center rounded-sm text-sm text-mauve-1100 transition-colors duration-200 hover:text-mauve-1200 dark:text-mauveDark-1100 dark:hover:text-mauveDark-1200'
      type='button'
      onClick={onClick}
    >
      <Icons.Dices className='mr-2 h-4 w-4' /> Randomize
    </button>
  );
};

export default RandomizeButton;
