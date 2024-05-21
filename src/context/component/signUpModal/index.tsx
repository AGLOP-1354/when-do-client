import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useRecoilValue } from 'recoil';

import OAuthButtonList from './component/OauthButtonList';
import Slogan from './component/Slogan';
import { StatusBarHeight } from '../../constants';
import { themeColors } from '../../../atoms/theme.ts';
import CustomText from '../CustomText.tsx';

type Props = {
  visible: boolean;
  isLoggedIn?: boolean;
  onClose: () => void;
  onUseWithoutLogin: () => void;
}

const SignUpModal = ({ isLoggedIn, visible, onClose, onUseWithoutLogin }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <Modal animationType="slide"  visible={visible}>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: colors.font100,
        }}
      >
        <Pressable
          onPress={onClose}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? StatusBarHeight + 40 : 0,
            right: 20,
          }}
        >
            <AntDesignIcon name="close" size={20}/>
        </Pressable>

        <Slogan />
        <View style={{ height: 70 }} />
        <OAuthButtonList />


        {!isLoggedIn && (
          <Pressable
            onPress={onUseWithoutLogin}
            style={{
              alignItems: 'center',
            }}
          >
            <CustomText style={{
              color: colors.backgroundColor300,
              borderBottomWidth: 1,
              fontSize: 14,
              fontWeight: 500,
            }}>
              로그인 없이 이용하기
            </CustomText>
          </Pressable>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default SignUpModal;

