import { useAtom } from 'jotai';

import type { LinkSchema } from '~/types/link';
import {
  editModalIsOpenAtom,
  editModalDataAtom,
  deleteModalIsOpenAtom,
  deleteModalDataAtom,
} from '~/store/modals';

import OptionsDropdown from './OptionsDropdown';

export interface LinkItemOptionsProps {
  id: LinkSchema['id'];
  slug: LinkSchema['slug'];
  url: LinkSchema['url'];
  description: LinkSchema['description'];
}

const LinkItemOptions = ({
  id,
  slug,
  url,
  description,
}: LinkItemOptionsProps) => {
  const [, setEditModalIsOpen] = useAtom(editModalIsOpenAtom);
  const [, setEditModalData] = useAtom(editModalDataAtom);
  const [, setDeleteModalIsOpen] = useAtom(deleteModalIsOpenAtom);
  const [, setDeleteModalData] = useAtom(deleteModalDataAtom);

  const openModal = (modal: 'edit' | 'delete') => {
    if (modal === 'edit') {
      setEditModalData({
        id,
        slug,
        url,
        description: description || '',
      });
      setEditModalIsOpen(true);
      return;
    }

    if (modal === 'delete') {
      setDeleteModalData({
        id,
        slug,
      });
      setDeleteModalIsOpen(true);
      return;
    }
  };

  return (
    <div className='absolute top-4 right-4'>
      <OptionsDropdown openModal={openModal} />
    </div>
  );
};

export default LinkItemOptions;
