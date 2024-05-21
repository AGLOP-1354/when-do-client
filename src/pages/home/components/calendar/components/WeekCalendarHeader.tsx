import React from 'react';
import dayjs from 'dayjs';
import { Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import ArrowButton from './ArrowButton';
import { themeColors } from '../../../../../atoms/theme.ts';
import AddTodoButton from '../../addTodo';
import CustomText from '../../../../../context/component/CustomText.tsx';

type Props = {
  selectedDate: dayjs.Dayjs;
  subtractOneMonth: () => void;
  addOneMonth: () => void;
  onOpenDatePickerModal: () => void;
}

const WeekCalendarHeader = ({
  selectedDate,
  subtractOneMonth,
  addOneMonth,
  onOpenDatePickerModal,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  const currentDataText = dayjs(selectedDate).format('YYYY') + '년 ' + dayjs(selectedDate).format('MM') + '월';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Pressable onPress={onOpenDatePickerModal}>
        <View style={{ gap: 8, flexDirection: 'row', alignItems: 'center' }}>
          <FontistoIcon name="date" size={16} color={colors.font100} />
          <CustomText style={{ fontSize: 16, color: colors.font100, fontWeight: 'bold' }}>{currentDataText}</CustomText>
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ArrowButton iconName="chevron-left" onPress={subtractOneMonth} />
        <ArrowButton iconName="chevron-right" onPress={addOneMonth} />
        <View style={{ width: 10 }} />
        <AddTodoButton />
      </View>
    </View>
  );
};

export default WeekCalendarHeader;
