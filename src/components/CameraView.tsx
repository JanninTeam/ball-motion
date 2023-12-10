import { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import BaseText from './BaseText';
import { Dimensions, StyleSheet, View } from 'react-native';
import Button from './Button';
import Page from './Page';
import { Video } from 'expo-av';

type Props = {};
type VideoType = { uri: string };
export default function CameraView() {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState<VideoType | null>(null);

  const toggleCameraType = () => {
    setCameraType((prev) => {
      if (prev === CameraType.back) return CameraType.front;
      return CameraType.back;
    });
  };

  const cameraRef = useRef<Camera>(null);

  // Recording functions
  const startRecording = () => {
    setRecording(true);

    const options = { quality: '1080p', maxDuration: 30, mute: true };
    cameraRef.current?.recordAsync(options).then((video) => {
      setVideo(video);
      setRecording(false);
    });
  };

  const stopRecording = () => {
    setRecording(false);
    cameraRef.current?.stopRecording();
  };

  // Video functions
  const discardVideo = () => setVideo(null);

  if (video) {
    return (
      <>
        <Video
          style={styles.video}
          source={video}
          isLooping
          shouldPlay
          useNativeControls={false}
        />
        <Button onPress={discardVideo} text="Discard video" />
      </>
    );
  }

  return (
    <Page>
      {permission?.granted ? (
        <View>
          <Camera type={cameraType} style={styles.camera} ref={cameraRef} />
          <Button
            onPress={toggleCameraType}
            text="Flip camera"
            containerStyle={styles.flipCameraButton}
          />
          <Button
            text={recording ? 'Stop recording' : 'Start recording'}
            containerStyle={styles.videoButton}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>
      ) : (
        <Button onPress={requestPermission} text="Request permission" />
      )}
    </Page>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {},
  camera: {
    height,
    width,
  },

  videoButton: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
  },

  flipCameraButton: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
    alignSelf: 'center',
  },

  video: {
    height: height * 0.8,
    width: width * 0.8,
  },
});
