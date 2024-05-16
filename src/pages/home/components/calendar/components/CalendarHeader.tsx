import React from 'react';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import ArrowButton from './ArrowButton';
import { getDayText } from '../../../utils';
import Column from './Column';
import { themeColors } from '../../../../../atoms/theme.ts';

type Props = {
  selectedDate: dayjs.Dayjs;
  subtractOneMonth: () => void;
  addOneMonth: () => void;
}

const CalendarHeader = ({
  selectedDate,
  subtractOneMonth,
  addOneMonth,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  const currentDataText = dayjs(selectedDate).format('YYYY.MM.DD');

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ArrowButton iconName="chevron-left" onPress={subtractOneMonth} />

        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.font100 }}>{currentDataText}</Text>

        <ArrowButton iconName="chevron-right" onPress={addOneMonth} />
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        {[0, 1, 2, 3, 4, 5, 6].map(day => {
          const dayText = getDayText(day);
          return (
            <Column
              key={`dat-${day}`}
              text={dayText}
              color="#fff"
            />
          );
        })}
      </View>
    </View>
  );
};

export default CalendarHeader;
