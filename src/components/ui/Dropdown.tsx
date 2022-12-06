import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import cn from '~/utils/cn';

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  return (
    <Menu as='div' className='relative inline-block'>
      {children}
    </Menu>
  );
};

interface DropdownTitleProps {
  className?: string;
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Title = ({ className, children }: DropdownTitleProps) => {
  return (
    <Menu.Button
      className={cn(
        'outline-focus-visible flex items-center rounded-md px-3 py-2 hover:bg-mauve-400 hover:transition-colors hover:duration-200 focus-visible:bg-mauve-400 dark:hover:bg-mauveDark-400 dark:focus-visible:bg-mauveDark-400',
        className
      )}
    >
      {children}
    </Menu.Button>
  );
};

interface DropdownItemsProps {
  className?: string;
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Items = ({ className, children }: DropdownItemsProps) => {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items
        className={cn(
          'absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md border border-mauve-600 bg-mauve-200 p-1 shadow-lg focus:outline-none dark:border-mauveDark-600 dark:bg-mauveDark-200',
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Item = ({ children }: DropdownItemProps) => {
  return <Menu.Item>{children}</Menu.Item>;
};
export default Dropdown;
