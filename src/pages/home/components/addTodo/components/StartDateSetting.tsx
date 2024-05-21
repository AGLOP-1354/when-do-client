import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import { useRecoilValue } from 'recoil';
import FeatherIcon from 'react-native-vector-icons/Feather';
import 'dayjs/locale/ko';

import Box from '../../../../../context/component/Box.tsx';
import { themeColors, themeMode } from '../../../../../atoms/theme.ts';
import CustomText from "../../../../../context/component/CustomText.tsx";

dayjs.locale('ko');

type Props = {
  value: Date,
  onChange: (value: Date) => void;
};

const StartDateSetting = ({ value, onChange }: Props) => {
  const colors = useRecoilValue(themeColors);
  const theme = useRecoilValue(themeMode);
  const isDarkMode = theme === 'dark';
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  return (
    <Box>
      <View
        style={{
          flexDirection: 'row',
          justifyContent:'space-between',
          alignItems: 'center',
          position: 'relative',
          paddingVertical: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <FeatherIcon name="calendar" size={16} color={colors.font100} />
          <CustomText style={{ color: colors.font100 }}>시작 날짜</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable
            style={{
              backgroundColor: colors.backgroundColor300,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}
            onPress={() => setTimePickerVisible(prev => !prev)}
          >
            <CustomText style={{ color: colors.font100 }}>{String(dayjs(value).format('YYYY.MM.DD'))}</CustomText>
          </Pressable>
          <DatePicker
            modal
            theme={isDarkMode ? 'dark' : 'light'}
            title="시작일 설정"
            open={timePickerVisible}
            mode="date"
            locale="ko"
            date={value}
            onConfirm={selectedDate => {
              onChange(selectedDate);
              setTimePickerVisible(false);
            }}
            onCancel={() => setTimePickerVisible(false)}
            confirmText="확인"
            cancelText="취소"
          />
        </View>
      </View>
    </Box>
  );
};

export default StartDateSetting;
