import { Switch, View, Platform } from 'react-native';
import { useRecoilValue } from 'recoil';

import { themeColors, themeMode } from '../../../atoms/theme.ts';
import useTheme, { THEME_MODES } from '../../../hooks/useTheme.ts';
import { StatusBarHeight } from '../../home/utils';

// TODO: android 스위치가 너무 구려서 내 정보 하단에 리스트로 분리
const ThemeSwitch = () => {
    const theme = useRecoilValue(themeMode);
    const colors = useRecoilValue(themeColors);

    const { onChangeTheme } = useTheme();

    const isDarkTheme = theme === THEME_MODES.DARK;

    return (
        <View style={{ position: 'absolute', top: StatusBarHeight + 50, right: 20 }}>
            <Switch
                trackColor={{ false: colors.accent200, true: colors.accent200 }}
                thumbColor={colors.accent100}
                value={isDarkTheme}
                onValueChange={() => onChangeTheme(isDarkTheme ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
                style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
            />
        </View>
    );
};

export default ThemeSwitch;
