import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { themeColors, themeMode } from '../atoms/theme.ts';
import { dark, light } from '../theme';

export const THEME_MODES = {
    DARK: 'dark',
    LIGHT: 'light',
} as const;

const useTheme = () => {
    const [theme, setTheme] = useRecoilState(themeMode);
    const [colors, setColors] = useRecoilState(themeColors);

    const onChangeTheme = useCallback((newTheme: 'dark' | 'light') => {
        setTheme(newTheme);
        setColors(newTheme === THEME_MODES.DARK ? dark : light);
    }, [setColors, setTheme]);

    return {
        colors,
        onChangeTheme,
        theme,
    };
};

export default useTheme;
