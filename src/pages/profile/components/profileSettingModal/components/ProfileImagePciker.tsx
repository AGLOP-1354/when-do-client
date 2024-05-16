import { Image, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../../../atoms/theme.ts';

type Props = {
    profileImageUri: string;
    pickImage: () => void;
}

const ProfileImagePicker = ({ pickImage, profileImageUri }: Props) => {
    const colors = useRecoilValue(themeColors);

    if (!profileImageUri) {
        return (
            <View>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        backgroundColor: colors.backgroundColor300,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{ borderRadius: 50, width: 65, height: 65 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            <TouchableOpacity
                onPress={pickImage}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: profileImageUri }}
                    style={{ borderRadius: 50, width: 65, height: 65 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileImagePicker;
