import { atom } from 'jotai';

export const createModalIsOpenAtom = atom(false);
export const editModalIsOpenAtom = atom(false);
export const deleteModalIsOpenAtom = atom(false);

export const editModalDataAtom = atom({
  id: -1,
  slug: '',
  url: '',
  description: '',
});

export const deleteModalDataAtom = atom({
  id: -1,
  slug: '',
});
