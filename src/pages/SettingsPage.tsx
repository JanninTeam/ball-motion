import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingsContext } from '../../App';
import Page from '../components/Page';
import Title from '../components/Title';
import ToggleSwitch from '../components/ToggleSwitch';
import theme from '../globals/globalStyles';
import { NavigationProp } from '@react-navigation/native';
import Button from '../components/Button';
import { routes } from '../Routes';

type Props = {
  navigation: NavigationProp<any>;
};

export default function SettingsPage({ navigation }: Props) {
  const { settings, setSettings } = useContext(SettingsContext);

  // Generic function to toggle a setting
  const toggleOption = (option: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  // Toggle functions
  const toggleDarkMode = () => toggleOption('darkMode');
  const toggleNotifications = () => toggleOption('notificationsEnabled');

  return (
    <Page>
      <Title>Settings</Title>
      <View style={styles.container}>
        <Button
          text="Change Unit Settings"
          onPress={() => navigation.navigate(routes.unitSettings)}
        />
        <ToggleSwitch
          value={settings.darkMode}
          onValueChange={toggleDarkMode}
          label="Dark Mode"
        />

        <ToggleSwitch
          value={settings.notificationsEnabled}
          onValueChange={toggleNotifications}
          label="Notifications"
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {},
});
