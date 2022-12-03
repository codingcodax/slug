import { Dropdown, Icons } from '~/components/ui';
import type { LinkSchema } from '~/types/link';
import getBaseUrl from '~/utils/getBaseUrl';

interface OptionsDropdownProps {
  slug: LinkSchema['slug'];
  handleModal: (modal: 'edit' | 'delete') => void;
}

const OptionsDropdown = ({ slug, handleModal }: OptionsDropdownProps) => {
  const copytoclipboard = async (text: string) => {
    try {
      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([text], { type: 'text/plain' }),
      });

      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Title className='px-2'>
        <Icons.MoreVertical className='h-4 w-4' />
      </Dropdown.Title>

      <Dropdown.Items>
        <Dropdown.Item>
          <button
            className='dropdown-item'
            onClick={() => copytoclipboard(`${getBaseUrl()}/${slug}`)}
          >
            <Icons.ClipboardCopy className='mr-2 h-4 w-4' />
            Copy
          </button>
        </Dropdown.Item>

        <Dropdown.Item>
          <button className='dropdown-item' onClick={() => handleModal('edit')}>
            <Icons.FileEdit className='mr-2 h-4 w-4' />
            Edit
          </button>
        </Dropdown.Item>

        <Dropdown.Item>
          <button
            className='dropdown-item'
            onClick={() => handleModal('delete')}
          >
            <Icons.Trash2 className='mr-2 h-4 w-4' />
            Delete
          </button>
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown>
  );
};

export default OptionsDropdown;
