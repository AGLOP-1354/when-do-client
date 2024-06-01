import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRecoilValue } from 'recoil';

import Home from './pages/home';
import Profile from './pages/profile';
import { themeColors } from './atoms/theme.ts';
import useSplashScreen from './hooks/useSplashScreen.ts';
import useAccount from './hooks/useAccount.ts';
import { accountAtom } from './atoms/account.ts';
import SearchUser from './context/component/searchUser';

const BottomTab = createBottomTabNavigator();

const RootApp = () => {
  const colors = useRecoilValue(themeColors);
  useSplashScreen();
  const { isFetchAccountInfoLoading } = useAccount();
  const { id } = useRecoilValue(accountAtom);

  if (isFetchAccountInfoLoading) return null;
  const initialRouteName= id ? 'home' : 'profile';

  return (
    <BottomTab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor: colors.primary100,
        tabBarInactiveTintColor: colors.font200,
        tabBarStyle: {
          paddingTop: 4,
          backgroundColor: colors.backgroundColor200,
          borderTopColor: colors.backgroundColor300,
        },
      }}
    >
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => <EntypoIcon name="home" size={size} color={color} />,
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name="look"
        component={SearchUser}
        options={{
          tabBarLabel: '둘러보기',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="search" size={size} color={color} />,
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: '내 정보',
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="user" size={size} color={color} />,
          header: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootApp;
