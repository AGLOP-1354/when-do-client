import { Pressable, View } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {useRecoilValue} from 'recoil';

import { themeColors } from '../../atoms/theme.ts';
import CustomText from './CustomText.tsx';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  submitButtonDisabled?: boolean;
}

const ModalHeader = ({ title, onClose, onSubmit, submitButtonDisabled }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable onPress={onClose}>
        <EntypoIcons
          name="chevron-left"
          size={20}
          color={colors.font100} />
      </Pressable>

      <CustomText style={{ color: colors.font100, fontSize: 16, fontWeight: 'bold' }}>{title}</CustomText>

      <Pressable onPress={onSubmit} disabled={submitButtonDisabled}>
        <CustomText style={{ color: submitButtonDisabled ? colors.font200 : colors.font100 }}>확인</CustomText>
      </Pressable>
    </View>
  );
};

export default ModalHeader;
