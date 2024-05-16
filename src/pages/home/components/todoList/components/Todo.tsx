import {useState} from 'react';
import {Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useRecoilValue} from 'recoil';

import {TodayTodo} from '../../../../../atoms/todayTodo.ts';
import {themeColors} from '../../../../../atoms/theme.ts';

type TodoProps = {
  todo: TodayTodo;
  color: string;
}

const Todo = ({ todo, color }: TodoProps) => {
  const colors = useRecoilValue(themeColors);

  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
      }}>
      {/* TODO: 체크 시 앱 아이콘이 보이도록 수정 */}
      <BouncyCheckbox
        isChecked={isCompleted}
        size={20}
        fillColor={color}
        onPress={() => setIsCompleted(prev => !prev)}
      />

      <Text style={{ color: colors.font100 }}>{todo.title}</Text>
    </View>
  );
};

export default Todo;
