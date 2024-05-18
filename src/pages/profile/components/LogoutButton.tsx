import { Pressable, Text } from 'react-native';
import { useRecoilValue } from 'recoil';

import useAccount from '../../../hooks/useAccount.ts';
import { themeColors } from '../../../atoms/theme.ts';

const LogoutButton = () => {
  const colors = useRecoilValue(themeColors);

  const { logout } = useAccount();

  return (
    <Pressable
      onPress={() => {
        void logout();
      }}
      style={{
        backgroundColor: colors.primary100,
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <Text style={{ color: colors.font100, fontWeight: 'bold' }}>로그아웃</Text>
    </Pressable>
  );
};

export default LogoutButton;
