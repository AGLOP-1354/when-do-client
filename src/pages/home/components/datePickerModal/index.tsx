import { Modal, View } from 'react-native';
import {
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import Calendar from '../calendar';
import dayjs from 'dayjs';
import { themeColors } from '../../../../atoms/theme.ts';

type Props = {
  visible: boolean;
  onClose: () => void;
  columns: dayjs.Dayjs[];
  selectedDate: dayjs.Dayjs;
  subtractOneMonth: () => void;
  addOneMonth: () => void;
  onSelectDate: (date: dayjs.Dayjs) => void;
}

const DatePickerModal = ({
  visible,
  onClose,
  columns,
  selectedDate,
  subtractOneMonth,
  addOneMonth,
  onSelectDate,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: colors.backgroundColor300, opacity: 0.5 }} />
      <SafeAreaView
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.backgroundColor100,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Calendar
            columns={columns}
            selectedDate={selectedDate}
            subtractOneMonth={subtractOneMonth}
            addOneMonth={addOneMonth}
            onSelectDate={onSelectDate}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DatePickerModal;
