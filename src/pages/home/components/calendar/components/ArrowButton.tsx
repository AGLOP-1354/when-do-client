import { TouchableOpacity } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../../../atoms/theme.ts';

type Props = {
    iconName: string,
    onPress: () => void,
}

const ArrowButton = ({
 onPress,
 iconName,
}: Props) => {
    const colors = useRecoilValue(themeColors);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
            }}
        >
            <EntypoIcons
                name={iconName}
                size={20}
                color={colors.font100}
            />
        </TouchableOpacity>
    );
};

export default ArrowButton;
