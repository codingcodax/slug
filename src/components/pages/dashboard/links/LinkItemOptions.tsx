import { useState } from 'react';

import type { LinkSchema } from '~/types/link';
import { EditModal } from '~/components/pages/dashboard/modals';

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
  const [modalsState, setModalsState] = useState({
    editModal: false,
    deleteModal: false,
  });

  const handleModal = (modal: 'edit' | 'delete') => {
    if (modal === 'edit')
      setModalsState((prev) => ({ ...prev, editModal: !prev.editModal }));

    if (modal === 'delete')
      setModalsState((prev) => ({ ...prev, deleteModal: !prev.deleteModal }));
  };

  return (
    <div className='absolute top-4 right-4'>
      <OptionsDropdown handleModal={handleModal} slug={slug} />

      <EditModal
        description={description}
        id={id}
        show={modalsState.editModal}
        slug={slug}
        url={url}
        onClose={() => handleModal('edit')}
      />
    </div>
  );
};

export default LinkItemOptions;
