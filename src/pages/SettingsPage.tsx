import { useContext } from 'react';
import { SettingsContext } from '../../App';
import BaseText from '../components/BaseText';
import Page from '../components/Page';
import Title from '../components/Title';
import { View, StyleSheet, Switch } from 'react-native';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';

export default function SettingsPage() {
  const { settings, setSettings } = useContext(SettingsContext);

  const changeUnits = () => {
    setSettings((prev) => {
      return {
        ...prev,
        units: prev.units === 'metric' ? 'imperial' : 'metric',
      };
    });
  };

  const toggleOption = (option: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const toggleDarkMode = () => toggleOption('darkMode');
  const toggleNotifications = () => toggleOption('notificationsEnabled');

  return (
    <Page>
      <Title>Settings</Title>
      <View style={styles.container}>
        <Button
          onPress={changeUnits}
          text={settings.units === 'metric' ? 'Imperial' : 'Metric'}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
