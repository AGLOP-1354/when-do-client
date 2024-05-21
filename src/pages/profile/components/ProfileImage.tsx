import { Image, Pressable, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../atoms/theme.ts';
import CustomText from "../../../context/component/CustomText.tsx";

type Props = {
    profileImageUri: string;
    onPress: () => void;
    name: string;
}

const ProfileImage = ({ profileImageUri, name, onPress }: Props) => {
    const colors = useRecoilValue(themeColors);

    if (profileImageUri) {
        return (
            <Pressable onPress={onPress}>
                <View>
                    <Image
                        source={{ uri: profileImageUri }}
                        style={{ borderRadius: 50, width: 65, height: 65 }}
                    />
                </View>
            </Pressable>
        );
    }

    return (
        <Pressable onPress={onPress}>
          <View style={{ borderRadius: 50, width: 65, height: 65, backgroundColor: colors.backgroundColor200, justifyContent: 'center' }}>
              <CustomText style={{ textAlign: 'center', fontSize: 18, color: colors.font100 }}>{name.slice(0, 1)}</CustomText>
          </View>
        </Pressable>
    );
};

export default ProfileImage;
