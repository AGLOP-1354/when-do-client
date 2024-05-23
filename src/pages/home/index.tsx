import { useRecoilValue } from 'recoil';
import {
  Platform, Pressable, Text,
  View
} from 'react-native';

import { themeColors } from '../../atoms/theme.ts';
import { StatusBarHeight } from './utils';
import { useCalendar } from './hooks/useCalendar';
import WeekCalendar from './components/calendar/WeekCalendar';
import DatePickerModal from './components/datePickerModal';
import TodoList from './components/todoList';
import { shareFeedTemplate } from '@react-native-kakao/share';

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

  const defaultFeed = {
      content: {
        title: '제이크님이 \'Link Dropper\'에 초대하셨습니다.',
        description: '링크를 효율적으로 관리하고 공유해보세요!',
        imageUrl: 'https://pub-ff05ab6e959746b0b08c3a2d3e942a89.r2.dev/appstore.png',
        link: {
          webUrl: 'https://developers.kakao.com',
          mobileWebUrl: 'https://developers.kakao.com'
        }
      },
  };
  const shareKakao = async () => {
    await shareFeedTemplate({
      template: defaultFeed,
    });
  };

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

        <Pressable onPress={() => void shareKakao()}>
          <Text>카카오 공유하기</Text>
        </Pressable>
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
