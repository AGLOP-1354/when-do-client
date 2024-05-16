import { atom } from 'recoil';
import { dark } from '../theme';

export const themeColors = atom({
    key: 'themeColors',
    default: dark,
});

export const themeMode = atom({
    key: 'themeMode',
    default: 'dark',
});
