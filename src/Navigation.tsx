import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import Camera from './components/CameraView';
import DashboardPage from './pages/DashboardPage';
import { routes } from './Routes';
import theme from './globals/globalStyles';
import Icon, { IconNames } from './components/Icon';
import { HEIGHT } from './constants/screenSize';

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
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const iconSize = 32;
  const icons = {
    [routes.dashboard]: 'house',
    [routes.statsPage]: 'plus',
  } as { [key: string]: IconNames };

  // Get the icon for the current route
  const getIcon = (route: RouteProp<any, any>, color: string) => {
    return <Icon name={icons[route.name]} size={iconSize} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: { height: HEIGHT * 0.1, borderTopWidth: 1 },
        tabBarIcon: ({ color }) => getIcon(route, color),
      })}
    >
      <Tab.Screen
        name={routes.dashboard}
        component={DashboardStack}
        options={options}
      />
      <Tab.Screen
        name={routes.statsPage}
        component={DashboardStack}
        options={options}

      />
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
        <Stack.Screen
          name={routes.cameraView}
          component={Camera}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
