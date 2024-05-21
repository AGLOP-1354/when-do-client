import {Pressable, View, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Box from '../../../../../context/component/Box.tsx';
import {useRecoilValue} from 'recoil';
import {themeColors} from '../../../../../atoms/theme.ts';
import { DAY_OF_WEEK } from '../constants';
import CustomText from "../../../../../context/component/CustomText.tsx";

type Props = {
  selectedDayOfWeek: string[];
  onChange: ({ type, key }: { type: string, key: string }) => void;
}

const RepeatDayOfWeekSelector = ({ selectedDayOfWeek, onChange }: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <Box>
      <View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FeatherIcon name="repeat" size={16} color={colors.font100} />
            <CustomText style={{ color: colors.font100 }}>반복</CustomText>
          </View>
        </View>

        <View style={{ height: 20 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          {
            DAY_OF_WEEK.map(({ key, title }) => {
              const isSelected = selectedDayOfWeek.includes(key);

              return (
                <Pressable
                  key={`day-of-week-${key}`}
                  style={{ borderRadius: 50, overflow: 'hidden' }}
                  onPress={() => {
                    const type = isSelected ? 'remove' : 'add';
                    onChange({ type, key });
                  }}
                >
                  <CustomText
                    style={{
                      color: isSelected ? colors.font100 : colors.font200,
                      backgroundColor: isSelected ? colors.accent100 : colors.backgroundColor300,
                      padding: 10,
                    }}>
                    {title}
                  </CustomText>
                </Pressable>
              );
            })
          }
        </View>
      </View>
    </Box>
  );
};

export default RepeatDayOfWeekSelector;
