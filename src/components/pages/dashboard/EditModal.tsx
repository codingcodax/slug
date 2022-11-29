import { Modal } from '~/components/ui';
import type { EditLinkSchema } from '~/types/link';
import cn from '~/utils/cn';

interface EditModalProps extends EditLinkSchema {
  show: boolean;
  onClose: () => void;
}

const EditModal = ({
  show,
  onClose,
  slug,
  url,
  description,
}: EditModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>Edit: /{slug}</Modal.Title>
      <Modal.Description>Update the URL or the description</Modal.Description>
      <Modal.Body>
        <div>
          <form className='grid max-w-xl gap-y-8'>
            <div className='space-y-4'>
              <div className='grid grid-flow-row gap-y-1'>
                <label htmlFor='url'>Enter the new URL:</label>
                <input
                  className='input'
                  defaultValue={url}
                  id='url'
                  type='text'
                />
              </div>

              <div className='grid grid-flow-row gap-y-1'>
                <label htmlFor='description'>Description:</label>
                <textarea
                  className={cn('input max-h-32')}
                  defaultValue={description || ''}
                  id='description'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-x-4'>
              <button className='primary-button' type='submit'>
                Update your link
              </button>
              <button className='secondary-link'>Cancel</button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
