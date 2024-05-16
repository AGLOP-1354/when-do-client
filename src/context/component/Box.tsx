import { memo, ReactElement } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { themeColors } from '../../atoms/theme.ts';

type Props = {
  children: ReactElement;
}

const Box = ({ children }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View
      style={{
        width: '100%',
        padding: 15,
        backgroundColor: colors.backgroundColor200,
        borderRadius: 10,
      }}
    >
      {children}
    </View>
  );
};

export default memo(Box);
