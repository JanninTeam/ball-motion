import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import { Video } from 'expo-av';
import { HEIGHT, WIDTH } from '../constants/screenSize';
import theme from '../globals/globalStyles';
import { getHexOpacity } from '../util/getHexOpacity';
import BaseText from './BaseText';
import Icon from './Icon';
import { fetchServer } from '../common/fetchServer';
import { APIResponse } from '../../types';
import * as FileSystem from 'expo-file-system';
import { uploadVideoFile } from '../common/saveFile';
import Page from './Page';

type RecordButtonProps = {
  recording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
};

function RecordButton({
  recording,
  startRecording,
  stopRecording,
}: RecordButtonProps) {
  return (
    <Button
      text=""
      containerStyle={[
        styles.videoButton,
        recording ? { backgroundColor: theme.colors.red } : {},
      ]}
      onPress={recording ? stopRecording : startRecording}
    />
  );
}

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
  // const uploadVideo = async () => {
  //   if (!video) return;

  //   const result = (await fetchServer('process_video', 'POST', {
  //     video: video.uri,
  //   })) as APIResponse['ProcessVideo'];

  //   console.log({ result });
  // };

  useEffect(() => {
    if (video) uploadVideoFile(video.uri);
  }, [video]);

  if (video) {
    return (
      <>
        <Video source={video} style={styles.video} shouldPlay isLooping />
        <Button onPress={discardVideo} text="Discard video" />
      </>
    );
  }

  return (
    <>
      {permission?.granted ? (
        <View>
          <Camera type={cameraType} style={styles.camera} ref={cameraRef} />
          <Button
            onPress={toggleCameraType}
            text=""
            containerStyle={styles.flipCameraButton}
            icon={<Icon name="camera-flip" size={24} color="white" />}
          />
          <View
            style={[
              styles.recordingWrapper,
              recording ? styles.recordingWrapperRecording : {},
            ]}
          >
            <BaseText>{recording ? 'Recording' : 'Not Recording'}</BaseText>
          </View>

          <RecordButton
            recording={recording}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </View>
      ) : (
        <Page>
          <View style={styles.requestPermissionWrapper}>
            <Button onPress={requestPermission} text="Request permission" />
          </View>
        </Page>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  camera: {
    height: HEIGHT,
    width: WIDTH,
  },

  videoButton: {
    position: 'absolute',
    bottom: HEIGHT * 0.1,
    alignSelf: 'center',
    height: HEIGHT * 0.1,
    width: HEIGHT * 0.1,
    borderRadius: HEIGHT * 0.05,
    borderColor: theme.colors.white,
    borderWidth: 5,
  },

  flipCameraButton: {
    position: 'absolute',
    top: HEIGHT * 0.1,
    right: WIDTH * 0.05,
    alignSelf: 'center',
  },

  video: {
    height: HEIGHT * 0.8,
    width: WIDTH * 0.8,
  },

  recordingWrapper: {
    position: 'absolute',
    top: HEIGHT * 0.1,
    alignSelf: 'center',
    backgroundColor: theme.colors.gray + getHexOpacity(0.5),
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
  },

  recordingWrapperRecording: {
    backgroundColor: theme.colors.red + getHexOpacity(0.5),
  },

  requestPermissionWrapper: {
    height: HEIGHT * 0.8,
    width: WIDTH * 0.8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
