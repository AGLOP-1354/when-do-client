import {View, Text, Pressable} from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../../../atoms/theme.ts';

type Props = {
    showSignUpModal: () => void;
}

const InduceLoginSection = ({ showSignUpModal }: Props) => {
    const colors = useRecoilValue(themeColors);

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor200,
                paddingVertical: 30,
                paddingHorizontal: 20,
                borderRadius: 16,
                gap: 24,
            }}
        >
            <Text
                style={{
                    paddingHorizontal: 10,
                    color: colors.font100,
                    fontSize: 16,
                    fontWeight: '600',
                    textAlign: 'center'
                }}
            >
                계정을 연동하여 지표, 메모 등의 기능을 사용해 보세요!
            </Text>

            <Pressable
                onPress={() => showSignUpModal()}
                style={{
                    backgroundColor: colors.primary100,
                    padding: 16,
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                }}
            >
                <Text style={{ color: colors.font100, fontWeight: 'bold' }}>로그인하러 가기</Text>
            </Pressable>
        </View>
    );
};

export default InduceLoginSection;
