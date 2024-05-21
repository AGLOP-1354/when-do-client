import { View, Text } from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeColors} from '../../../atoms/theme.ts';
import CustomText from "../../../context/component/CustomText.tsx";

type Props = {
  name: string;
  description?: string;
};

const ProfileInfo = ({ name, description }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <CustomText style={{ fontWeight: '600', fontSize: 18, color: colors.font100 }}>{name}</CustomText>
      <CustomText style={{ color: colors.font200 }}>{description || '-'}</CustomText>
    </View>
  );
};

export default ProfileInfo;
