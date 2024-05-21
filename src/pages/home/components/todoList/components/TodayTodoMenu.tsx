import { Pressable, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Divider, Menu } from 'react-native-paper';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TODAY_TODO_MENU__LIST_ITEMS, TODO_TYPE } from '../../addTodo/constants';
import { themeColors } from '../../../../../atoms/theme.ts';
import useGoals from "../../../../../hooks/useGoals.ts";
import useTodayTodo from "../../../../../hooks/useTodayTodo.ts";

type Props = {
  id: string;
  selectUpdateTodayTodo: () => void;
};

const TodayTodoMenu = ({ id, selectUpdateTodayTodo }: Props) => {
  const colors = useRecoilValue(themeColors);
  const { deleteTodayTodo } = useTodayTodo();

  const [menuVisible, setMenuVisible] = useState(false);

  const onClickMenu = (key: string) => {
    switch (key) {
      case TODO_TYPE.TODAY_TODO_UPDATE: {
        selectUpdateTodayTodo();
        setMenuVisible(false);
        return;
      }
      case TODO_TYPE.TODAY_TODO_DELETE: {
        deleteTodayTodo.mutate({
          id,
        });
        setMenuVisible(false);
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
          TODAY_TODO_MENU__LIST_ITEMS.map(({ title, key }, index) => {
            const isFirstItem = index === 0;
            const isLastItem = index === TODAY_TODO_MENU__LIST_ITEMS.length - 1;

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
    </>
  );
};

export default TodayTodoMenu;
