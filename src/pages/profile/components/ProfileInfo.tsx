import { View, Text } from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeColors} from '../../../atoms/theme.ts';

type Props = {
  name: string;
  description?: string;
};

const ProfileInfo = ({ name, description }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text style={{ fontWeight: '600', fontSize: 18, color: colors.font100 }}>{name}</Text>
      <Text style={{ color: colors.font200 }}>{description || '-'}</Text>
    </View>
  );
};

export default ProfileInfo;
