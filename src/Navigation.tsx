import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import DashboardPage from './pages/DashboardPage';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon, { IconNames } from './components/Icon';
import theme from './globals/globalStyles';
import SettingsPage from './pages/SettingsPage';
import NewActivityPage from './pages/NewActivityPage';
import PreviousRunsPage from './pages/PreviousRunsPage';
import { routes } from './Routes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions & StackNavigationOptions = {
  headerShown: false,
};

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.home}
        component={DashboardPage}
        options={options}
      />
      <Stack.Screen
        name={routes.allRuns}
        component={PreviousRunsPage}
        options={{ title: 'All Runs' }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const iconSize = 32;
  const icons = {
    [routes.dashboard]: 'house',
    [routes.newActivity]: 'plus',
    [routes.settings]: 'gear',
  } as { [key: string]: IconNames };

  // Get the icon for the current route
  const getIcon = (route: RouteProp<any, any>, color: string) => {
    return <Icon name={icons[route.name]} size={iconSize} color={color} />;
  };

  // prettier-ignore
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: { height: 64, borderTopWidth: 1 },
        tabBarIcon: ({ color }) => getIcon(route, color),
      })}
    >
      <Tab.Screen name={routes.dashboard} component={DashboardStack} options={options} />
      <Tab.Screen name={routes.newActivity} component={NewActivityPage} options={options} />
      <Tab.Screen name={routes.settings} component={SettingsPage} options={options} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routes.home}
          component={TabNavigator}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
