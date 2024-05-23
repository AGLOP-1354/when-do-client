import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useRecoilValue} from 'recoil';

import {TodayTodo} from '../../../../../atoms/todayTodo.ts';
import {themeColors} from '../../../../../atoms/theme.ts';
import CustomText from '../../../../../context/component/CustomText.tsx';
import TodayTodoMenu from './TodayTodoMenu.tsx';
import useTodayTodo from '../../../../../hooks/useTodayTodo.ts';

type TodoProps = {
  todo: TodayTodo;
  color: string;
  setSelectedTodayTodo: (todo: TodayTodo) => void;
}

const Todo = ({ todo, color, setSelectedTodayTodo }: TodoProps) => {
  const colors = useRecoilValue(themeColors);
  const { updateTodayTodo } = useTodayTodo();

  const onCheckComplete = () => {
    updateTodayTodo.mutate({
      id: todo.id,
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 20,
      }}>
      <View style={{ flexDirection: 'row' }}>
        {/* TODO: 체크 시 앱 아이콘이 보이도록 수정 */}
        <BouncyCheckbox
          isChecked={todo.isCompleted}
          size={20}
          fillColor={color}
          onPress={onCheckComplete}
          style={{ width: 30 }}
        />

        <CustomText style={{ color: colors.font100 }}>{todo.title}</CustomText>
      </View>

      <TodayTodoMenu
        id={todo.id}
        selectUpdateTodayTodo={() => setSelectedTodayTodo(todo)}
      />
    </View>
  );
};

export default Todo;
