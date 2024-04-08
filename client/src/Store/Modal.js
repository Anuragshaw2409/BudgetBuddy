import { atom } from 'recoil';

const expenseEntryAtom = atom({
    key: 'expenseEntry',
    default: false
});

const tagEntryAtom = atom({
    key: 'tagEntry',
    default: false
});

const createTagAtom = atom({
    key: 'createTag',
    default: false
});

export { expenseEntryAtom, tagEntryAtom, createTagAtom };
