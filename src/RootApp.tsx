import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRecoilValue } from 'recoil';

import Home from './pages/home';
import Profile from './pages/profile';
import { themeColors } from './atoms/theme.ts';
import useSplashScreen from './hooks/useSplashScreen.ts';
import useAccount from './hooks/useAccount.ts';

const BottomTab = createBottomTabNavigator();

const RootApp = () => {
  const colors = useRecoilValue(themeColors);
  useSplashScreen();
  const { isLoggedIn } = useAccount();

  return (
    <BottomTab.Navigator
      initialRouteName={isLoggedIn ? '홈' : '내 정보'}
      screenOptions={{
        tabBarActiveTintColor: colors.primary100,
        tabBarInactiveTintColor: colors.font200,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor100,
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTab.Screen
        name={'홈'}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <EntypoIcon name="home" size={size} color={color} />,
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name={'둘러보기'}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="search" size={size} color={color} />,
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name={'내 정보'}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="user" size={size} color={color} />,
          header: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootApp;
