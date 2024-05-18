import { useRecoilValue } from 'recoil';
import {
  Platform,
  View
} from 'react-native';

import { themeColors } from '../../atoms/theme.ts';
import { StatusBarHeight } from './utils';
import { useCalendar } from './hooks/useCalendar';
import WeekCalendar from './components/calendar/WeekCalendar';
import DatePickerModal from './components/datePickerModal';
import TodoList from './components/todoList';

const Home = () => {
  const colors = useRecoilValue(themeColors);
  const {
    selectedWeekDate,
    subtractOneWeek,
    addOneWeek,
    onSelectWeekDate,
    weekDates,
    datePickerModalVisible,
    onOpenDatePickerModal,
    onCloseDatePickerModal,
    selectedDate,
    dates,
    subtractOneMonth,
    addOneMonth,
  } = useCalendar();

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
        <WeekCalendar
          columns={weekDates}
          selectedDate={selectedWeekDate}
          subtractOneMonth={subtractOneWeek}
          addOneMonth={addOneWeek}
          onSelectDate={onSelectWeekDate}
          onOpenDatePickerModal={onOpenDatePickerModal}
        />
        <View style={{ height: 25 }} />
      </View>

      <TodoList key={`todo-list-${String(selectedWeekDate)}`} />

      <DatePickerModal
        visible={datePickerModalVisible}
        onClose={onCloseDatePickerModal}
        columns={dates}
        selectedDate={selectedDate}
        subtractOneMonth={subtractOneMonth}
        addOneMonth={addOneMonth}
        onSelectDate={onSelectWeekDate}
      />
    </View>
  );
};

export default Home;
