import { useTheme } from 'next-themes';

import { Dropdown, Icons } from '~/components/ui';
import useHasMouted from '~/hooks/useHasMounted';

const ThemeSwitch = () => {
  const hasMounted = useHasMouted();
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <Dropdown>
      <Dropdown.Title>
        Theme{' '}
        {hasMounted ? (
          <Icons.Palette className='ml-4 h-4 w-4' />
        ) : (
          <Icons.Loader className='ml-4 h-4 w-4 animate-spin' />
        )}
      </Dropdown.Title>
      <Dropdown.Items>
        <Dropdown.Item>
          <button
            className='dropdown-item'
            type='button'
            onClick={() => setTheme('light')}
          >
            <Icons.Sun className='mr-2 h-4 w-4' />
            Light
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            className='dropdown-item'
            type='button'
            onClick={() => setTheme('dark')}
          >
            <Icons.Moon className='mr-2 h-4 w-4' />
            Dark
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            className='dropdown-item'
            type='button'
            onClick={() => setTheme('system')}
          >
            <Icons.Palette className='mr-2 h-4 w-4' />
            System
          </button>
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown>
  );
};

export default ThemeSwitch;
