import { Menu } from '@headlessui/react';

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
        'outline-visible-focus transition-colors duration-200',
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
    <Menu.Items
      className={cn(
        'absolute right-0 z-40 mt-2 w-56 origin-top-right p-1 focus:outline-none',
        className
      )}
    >
      {children}
    </Menu.Items>
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
