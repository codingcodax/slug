import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  return (
    <Transition appear as={Fragment} show={show}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

interface ModalTitleProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Modal.Title = ({ children }: ModalTitleProps) => {
  return <Dialog.Title>{children}</Dialog.Title>;
};

interface ModalDescriptionProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Modal.Description = ({ children }: ModalDescriptionProps) => {
  return <Dialog.Description>{children}</Dialog.Description>;
};

interface ModalBodyProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
Modal.Body = ({ children }: ModalBodyProps) => {
  return <>{children}</>;
};

export default Modal;
