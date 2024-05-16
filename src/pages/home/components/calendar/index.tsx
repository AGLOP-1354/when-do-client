import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { useRecoilValue} from 'recoil';
import dayjs from 'dayjs';

import Column from './components/Column';
import CalendarHeader from './components/CalendarHeader';
import { themeColors } from '../../../../atoms/theme.ts';

type Props = {
  columns: dayjs.Dayjs[];
  selectedDate: dayjs.Dayjs;
  subtractOneMonth: () => void;
  addOneMonth: () => void;
  onSelectDate: (date: dayjs.Dayjs) => void;
}

const Calendar = ({
  columns,
  selectedDate,
  subtractOneMonth,
  addOneMonth,
  onSelectDate,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  const renderItem = ({ item: date }: { item: dayjs.Dayjs }) => {
    const dateText = String(dayjs(date).get('date'));
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    return (
      <Pressable onPress={() => onSelectDate(date)}>
        <Column
          text={dateText}
          color={isSelected ? colors.font100 : colors.font200}
          backgroundColor={isSelected ? '#454545': 'transparent'}
          opacity={isCurrentMonth ? 1 : 0.4}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      columnWrapperStyle={{ paddingHorizontal: 20, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column_${index}`}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={(
        <CalendarHeader
          selectedDate={selectedDate}
          subtractOneMonth={subtractOneMonth}
          addOneMonth={addOneMonth}
        />
      )}
    />
  );
};

export default Calendar;
