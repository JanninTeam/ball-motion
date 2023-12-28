import { useContext } from 'react';
import { SettingsContext } from '../../App';
import BaseText from '../components/BaseText';
import Page from '../components/Page';
import Title from '../components/Title';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';

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

  const toggleDarkMode = () => {
    setSettings((prev) => {
      return { ...prev, darkMode: !prev.darkMode };
    });
  };

  const toggleNotifications = () => {
    setSettings((prev) => {
      return { ...prev, notificationsEnabled: !prev.notificationsEnabled };
    });
  };

  return (
    <Page>
      <Title>Settings</Title>
      <View style={styles.container}>
        <BaseText>Units (Metric or Imperial)</BaseText>
        <Button
          onPress={changeUnits}
          text={settings.units === 'metric' ? 'Imperial' : 'Metric'}
        />

        {/* These are likely to be toggles: */}
        <Button
          onPress={toggleDarkMode}
          text={settings.darkMode ? 'Light Mode' : 'Dark Mode'}
        />
        <Button
          onPress={toggleNotifications}
          text={
            settings.notificationsEnabled
              ? 'Disable Notifications'
              : 'Enable Notifications'
          }
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
