import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useRecoilValue } from 'recoil';
import { Menu, Divider } from 'react-native-paper';

import { TODO_LIST_BY_TYPES, TODO_TYPE } from './constants';
import { themeColors } from '../../../../atoms/theme.ts';
import AddTodayTodoModal from './components/AddTodayTodoModal.tsx';
import AddGoalModal from './components/AddGoalModal.tsx';
import AddRoutineModal from './components/AddRoutineModal.tsx';

const AddTodo = () => {
  const colors = useRecoilValue(themeColors);

  const [menuVisible, setMenuVisible] = useState(false);
  const [addTodayTodoModalVisible, setAddTodayTodoModalVisible] = useState(false);
  const [addGoalModalVisible, setAddGoalModalVisible] = useState(false);
  const [addRoutineModalVisible, setAddRoutineModalVisible] = useState(false);

  const openAddTodayTodoModal = useCallback(() => setAddTodayTodoModalVisible(true), []);
  const closeAddTodayTodoModal = useCallback(() => {
    setMenuVisible(false);
    setAddTodayTodoModalVisible(false);
  }, []);

  const openAddGoalModal = useCallback(() => setAddGoalModalVisible(true), []);
  const closeAddGoalModal = useCallback(() => {
    setMenuVisible(false);
    setAddGoalModalVisible(false);
  }, []);

  const openAddRoutineModal = useCallback(() => setAddRoutineModalVisible(true), []);
  const closeAddRoutineModal = useCallback(() => {
    setMenuVisible(false);
    setAddRoutineModalVisible(false);
  }, []);

  const onClickMenu = useCallback((type: string) => {
    switch (type) {
      case TODO_TYPE.TODAY_TODO:
        openAddTodayTodoModal();
        break;
      case TODO_TYPE.GOAL:
        openAddGoalModal();
        break;
      case TODO_TYPE.ROUTINE:
        openAddRoutineModal();
        break;
      default:
      // no default
    }
  }, [openAddTodayTodoModal, openAddGoalModal, openAddRoutineModal]);

  return (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      }}
    >
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchorPosition="bottom"
        contentStyle={{
          backgroundColor: 'transparent'
        }}
        anchor={(
          <Pressable onPress={() => setMenuVisible(true)} style={{ borderWidth: 1.5, borderColor: colors.font100, padding: 2, borderRadius: 50 }}>
          <FeatherIcon name="more-horizontal" size={14} color={colors.font100} />
          </Pressable>
        )}
      >
        {
          TODO_LIST_BY_TYPES.map(({ title, key }, index) => {
            const isFirstItem = index === 0;
            const isLastItem = index === TODO_LIST_BY_TYPES.length - 1;

            return (
              <View key={`todo-list-menu-${key}`}>
                <Menu.Item
                  style={{
                    width: 125,
                    height: 40,
                    backgroundColor: colors.backgroundColor300,
                    borderTopStartRadius: isFirstItem ? 4 : 0,
                    borderTopEndRadius: isFirstItem ? 4 : 0,
                    borderEndStartRadius: isLastItem ? 4 : 0,
                    borderEndEndRadius: isLastItem ? 4 : 0,
                  }}
                  titleStyle={{ color: colors.font100, fontWeight: '600', fontSize: 14 }}
                  onPress={() => onClickMenu(key)}
                  title={title}
                />
                {!isLastItem && <Divider />}
              </View>
            );
          })
        }
    </Menu>

    <AddTodayTodoModal
      key={`add-today-todo-modal-${addTodayTodoModalVisible}`}
      visible={addTodayTodoModalVisible}
      onClose={closeAddTodayTodoModal}
    />

    <AddGoalModal
      key={`add-goal-modal-${addGoalModalVisible}`}
      visible={addGoalModalVisible}
      onClose={closeAddGoalModal}
    />

    <AddRoutineModal
      key={`add-routine-modal-${addRoutineModalVisible}`}
      visible={addRoutineModalVisible}
      onClose={closeAddRoutineModal}
    />
  </View>
  );
};

export default AddTodo;
