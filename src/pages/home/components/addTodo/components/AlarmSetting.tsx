import { useState } from 'react';
import { Pressable, Text, View, Switch } from 'react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import { useRecoilValue } from 'recoil';
import FeatherIcon from 'react-native-vector-icons/Feather';
import 'dayjs/locale/ko';

import Box from '../../../../../context/component/Box.tsx';
import { themeColors, themeMode } from '../../../../../atoms/theme.ts';

dayjs.locale('ko');

type Props = {
  value: { isAlarm: boolean, time: Date },
  onChange: (value: { isAlarm: boolean, time: Date }) => void;
};

const AlarmSetting = ({ value, onChange }: Props) => {
  const colors = useRecoilValue(themeColors);
  const theme = useRecoilValue(themeMode);
  const isDarkMode = theme === 'dark';
  const {
    isAlarm,
    time,
  } = value;
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  return (
    <Box>
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FeatherIcon name="clock" size={16} color={colors.font100} />
            <Text style={{ color: colors.font100 }}>알림</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Switch
              value={isAlarm}
              onValueChange={switched => onChange({ isAlarm: switched, time })}
              trackColor={{ true: colors.accent100, false: colors.font200 }}
              style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }], position: 'absolute', right: -8 }}
            />
          </View>
        </View>

        {
          isAlarm && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={{ color: colors.font100 }}>{String(dayjs(time).format('a'))}</Text>
                <Text style={{ color: colors.font100, fontSize: 24 }}>{String(dayjs(time).format('HH:mm'))}</Text>
              </View>
              <DatePicker
                modal
                theme={isDarkMode ? 'dark' : 'light'}
                title="알림 설정"
                open={timePickerVisible}
                mode="time"
                locale="ko"
                date={time}
                onConfirm={selectedDate => {
                  onChange({ isAlarm: true, time: selectedDate });
                  setTimePickerVisible(false);
                }}
                onCancel={() => setTimePickerVisible(false)}
                confirmText="확인"
                cancelText="취소"
              />

              <Pressable
                style={{
                  backgroundColor: colors.backgroundColor300,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 8,
                }}
                onPress={() => setTimePickerVisible(prev => !prev)}
              >
                <Text style={{ color: colors.font100 }}>변경</Text>
              </Pressable>
            </View>
          )
        }
      </View>
    </Box>
  );
};

export default AlarmSetting;
