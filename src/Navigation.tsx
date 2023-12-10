import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import DashboardPage from './pages/DashboardPage';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { IconNames } from './components/Icon';
import theme from './globals/globalStyles';
import SettingsPage from './pages/SettingsPage';
import NewActivityPage from './pages/NewActivityPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const routes = {
  home: 'Home',
  newActivity: 'NewActivity',
  settings: 'Settings',
};

export default function Navigation() {
  const options: StackNavigationOptions = {
    headerShown: false,
  };

  const icons = {
    [routes.home]: 'house',
    [routes.newActivity]: 'plus',
    [routes.settings]: 'gear',
  } as { [key: string]: IconNames };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.black,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Stack.Screen
          name={routes.home}
          component={DashboardPage}
          options={options}
        />
        <Stack.Screen
          name={routes.newActivity}
          component={NewActivityPage}
          options={options}
        />
        <Stack.Screen
          name={routes.settings}
          component={SettingsPage}
          options={options}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
