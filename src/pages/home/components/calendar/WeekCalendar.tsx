import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import Column from './components/Column';
import WeekCalendarHeader from './components/WeekCalendarHeader';
import { getDayText } from '../../utils';
import { themeColors } from '../../../../atoms/theme.ts';

type Props = {
  columns: dayjs.Dayjs[];
  selectedDate: dayjs.Dayjs;
  subtractOneMonth: () => void;
  addOneMonth: () => void;
  onSelectDate: (date: dayjs.Dayjs) => void;
  onOpenDatePickerModal: () => void;
}

const WeekCalendar = ({
  columns,
  selectedDate,
  subtractOneMonth,
  addOneMonth,
  onSelectDate,
  onOpenDatePickerModal,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  const renderItem = ({ item: date, index }: { item: dayjs.Dayjs, index: number }) => {
    const dateText = String(dayjs(date).get('date'));
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    const hasTodo = false;
    const dayText = String(getDayText(index));
    const isOverToday = Math.ceil(dayjs(date).diff(dayjs(), 'd', true)) > 0;

    return (
      <TouchableOpacity
        onPress={() => onSelectDate(date)}
        style={{
          backgroundColor: isSelected ? colors.backgroundColor200: 'transparent',
          padding: 6,
          borderRadius: 14,
        }}
      >
        <Column
          key={`dat-${index}`}
          text={dayText}
          color={isSelected ? colors.font100 : colors.font200}
          opacity={isOverToday && !isSelected ? 0.4 : 1}
        />
        <Column
          text={dateText}
          hasTodo={hasTodo}
          color={colors.font100}
          backgroundColor={colors.backgroundColor300}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column_${index}`}
      numColumns={7}
      renderItem={renderItem}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      ListHeaderComponent={(
        <WeekCalendarHeader
          selectedDate={selectedDate}
          subtractOneMonth={subtractOneMonth}
          addOneMonth={addOneMonth}
          onOpenDatePickerModal={onOpenDatePickerModal}
        />
      )}
    />
  );
};

export default WeekCalendar;
