import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomText from "../../../../../context/component/CustomText.tsx";

type Props = {
    onClose: () => void;
    onSubmit: () => void;
}

const ProfileSettingModalHeader = ({ onClose, onSubmit }: Props) => {
    const colors = useRecoilValue(themeColors);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Pressable onPress={onClose} >
                <Ionicons name="chevron-back" size={20} color={colors.font100} />
            </Pressable>

            <CustomText style={{ fontSize: 18, fontWeight: 'bold', color: colors.font100 }}>프로필</CustomText>

            <Pressable onPress={onSubmit} >
                <CustomText style={{ fontSize: 18, fontWeight: 'bold', color: colors.font100 }}>확인</CustomText>
            </Pressable>
        </View>
    );
};

export default ProfileSettingModalHeader;
