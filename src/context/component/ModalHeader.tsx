import { Pressable, Text, View } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {useRecoilValue} from 'recoil';

import { themeColors } from '../../atoms/theme.ts';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: () => Promise<void>;
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

      <Text style={{ color: colors.font100, fontSize: 16, fontWeight: 'bold' }}>{title}</Text>

      <Pressable onPress={onSubmit} disabled={submitButtonDisabled}>
        <Text style={{ color: submitButtonDisabled ? colors.font200 : colors.font100 }}>확인</Text>
      </Pressable>
    </View>
  );
};

export default ModalHeader;
