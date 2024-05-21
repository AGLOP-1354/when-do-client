import { Pressable, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Divider, Menu } from 'react-native-paper';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GOAL_MENU_LIST_ITEMS, TODO_TYPE } from '../../addTodo/constants';
import { themeColors } from '../../../../../atoms/theme.ts';
import GoalSettingModal from '../../addTodo/components/GoalSettingModal.tsx';
import useGoals from "../../../../../hooks/useGoals.ts";

type Props = {
  id: string;
  title?: string;
  startDate?: Date;
  color?: string;
}

const GoalMenu = ({ id, title, startDate, color }: Props) => {
  const colors = useRecoilValue(themeColors);
  const { updateGoal } = useGoals();

  const [menuVisible, setMenuVisible] = useState(false);
  const [goalSettingModalVisible, setGoalSettingModalVisible] = useState(false);

  const onClickMenu = (key: string) => {
    switch (key) {
      case TODO_TYPE.GOAL_UPDATE: {
        setGoalSettingModalVisible(true);
        return;
      }
      case TODO_TYPE.GOAL_COMPLETE: {
        updateGoal.mutate({
          id,
          isCompleted: true,
          endDate: new Date(),
        });
        setGoalSettingModalVisible(false);
        return;
      }
    }
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchorPosition="bottom"
        contentStyle={{
          backgroundColor: 'transparent'
        }}
        anchor={(
          <Pressable onPress={() => setMenuVisible(true)}>
            <EntypoIcon name="dots-three-horizontal" color={colors.font100} />
          </Pressable>
        )}
      >
        {
          GOAL_MENU_LIST_ITEMS.map(({ title, key }, index) => {
            const isFirstItem = index === 0;
            const isLastItem = index === GOAL_MENU_LIST_ITEMS.length - 1;

            return (
              <View key={`todo-list-menu-${key}`}>
                <Menu.Item
                  style={{
                    width: 125,
                    height: 40,
                    backgroundColor: colors.backgroundColor300,
                    borderTopStartRadius: isFirstItem ? 12 : 0,
                    borderTopEndRadius: isFirstItem ? 12 : 0,
                    borderEndStartRadius: isLastItem ? 12 : 0,
                    borderEndEndRadius: isLastItem ? 12 : 0
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

      <GoalSettingModal
        key={`update-goal-modal-${goalSettingModalVisible}`}
        visible={goalSettingModalVisible}
        onClose={() => setGoalSettingModalVisible(false)}
        id={id}
        defaultTitle={title}
        defaultStartDate={startDate}
        defaultGoalColor={color}
      />
    </>
  );
};

export default GoalMenu;
