import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DashboardPage from './src/pages/DashboardPage';
import CameraView from './src/components/CameraView';

export default function App() {
  return (
    <View>
      {/* <DashboardPage /> */}
      <CameraView />
    </View>
  );
}
