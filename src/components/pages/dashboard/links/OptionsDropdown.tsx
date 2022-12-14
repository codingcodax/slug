import { Dropdown, Icons } from '~/components/ui';

interface OptionsDropdownProps {
  openModal: (modal: 'edit' | 'delete') => void;
}

const OptionsDropdown = ({ openModal }: OptionsDropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Title className='px-2'>
        <Icons.MoreVertical className='h-4 w-4' />
      </Dropdown.Title>

      <Dropdown.Items>
        <Dropdown.Item>
          <button className='dropdown-item' onClick={() => openModal('edit')}>
            <Icons.FileEdit className='mr-2 h-4 w-4' />
            Edit
          </button>
        </Dropdown.Item>

        <Dropdown.Item>
          <button className='dropdown-item' onClick={() => openModal('delete')}>
            <Icons.Trash2 className='mr-2 h-4 w-4' />
            Delete
          </button>
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown>
  );
};

export default OptionsDropdown;
