import { Platform, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import CustomTextInput from '../customFormItems/CustomTextInput.tsx';
import { StatusBarHeight } from '../../../pages/home/utils';
import { themeColors } from '../../../atoms/theme.ts';

const SearchUser = () => {
  const colors = useRecoilValue(themeColors);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor100,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? StatusBarHeight + 30 : 10,
          paddingHorizontal: 25,
        }}>
        <CustomTextInput
          defaultValue={''}
          value={''}
          placeholder="이름으로 검색해주세요."
        />
      </View>
    </View>
  );
};

export default SearchUser;
