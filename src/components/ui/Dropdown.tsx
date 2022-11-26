import { Menu } from '@headlessui/react';

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  return <Menu>{children}</Menu>;
};

interface DropdownTitleProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Title = ({ children }: DropdownTitleProps) => {
  return <Menu.Button>{children}</Menu.Button>;
};

interface DropdownItemsProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Items = ({ children }: DropdownItemsProps) => {
  return <Menu.Items>{children}</Menu.Items>;
};

interface DropdownItemProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Dropdown.Item = ({ children }: DropdownItemProps) => {
  return <Menu.Item>{children}</Menu.Item>;
};
export default Dropdown;
