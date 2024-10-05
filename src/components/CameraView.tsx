// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { useEffect, useRef, useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { HEIGHT, WIDTH } from '../constants/screenSize';
// import theme from '../globals/globalStyles';
// import { getHexOpacity } from '../util/getHexOpacity';
// import BaseText from './BaseText';
// import Button from './Button';
// import Icon from './Icon';

import Test from "./Test";

// import * as ScreenOrientation from 'expo-screen-orientation';
// import Page from './Page';

// export default function Camera() {
//   const [cameraType, setCameraType] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [ballFound, setBallFound] = useState(false);

//   useEffect(() => {
//     const changeScreenOrientation = async () => {
//       await ScreenOrientation.lockAsync(
//         ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
//       );
//     };

//     changeScreenOrientation();

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   }, []);

//   const toggleCameraType = () => {
//     setCameraType((prev) => {
//       if (prev === 'back') return 'front';
//       return 'back';
//     });
//   };

//   const cameraRef = useRef<any>(null);

//   const [recording, setRecording] = useState(false);

//   const processFrame = async (frame: any) => {
//     console.log(frame);
//     // const ballDetected = await detectGolfBall(frame);
//     // console.log({ ballDetected });

//     // if (ballDetected) {
//     //   setBallFound(true);

//     //   if (!recording) startRecording();
//     // } else setBallFound(false);
//   };

//   const startRecording = () => {
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     setRecording(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (!cameraRef.current) return;

//       const photo = await cameraRef.current.takePictureAsync({
//         quality: 0,
//         base64: true,
//       });

//       // await processFrame(photo.uri);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {permission?.granted ? (
//         <View>
//           <CameraView
//             facing={cameraType}
//             style={styles.camera}
//             ref={cameraRef}
//           />
//           <Button
//             onPress={toggleCameraType}
//             text=""
//             containerStyle={styles.flipCameraButton}
//             icon={<Icon name="camera-flip" size={24} color="white" />}
//           />
//           <View style={styles.informationContainer}>
//             <BaseText style={{ color: theme.colors.white }}>
//               Ball found: {ballFound ? 'Yes' : 'No'}
//             </BaseText>
//           </View>
//         </View>
//       ) : (
//         <Page>
//           <View style={styles.requestPermissionWrapper}>
//             <Button onPress={requestPermission} text="Request permission" />
//           </View>
//         </Page>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   camera: {
//     // The width and height are reversed since it is in landscape mode
//     height: WIDTH,
//     width: HEIGHT,
//   },

//   informationContainer: {
//     position: 'absolute',
//     top: HEIGHT * 0.05,
//     alignSelf: 'center',
//     backgroundColor: theme.colors.black + getHexOpacity(0.5),
//   },

//   flipCameraButton: {
//     position: 'absolute',
//     top: HEIGHT * 0.1,
//     right: WIDTH * 0.05,
//     alignSelf: 'center',
//   },

//   video: {
//     height: HEIGHT * 0.8,
//     width: WIDTH * 0.8,
//   },

//   recordingWrapper: {
//     position: 'absolute',
//     top: HEIGHT * 0.1,
//     alignSelf: 'center',
//     backgroundColor: theme.colors.gray + getHexOpacity(0.5),
//     padding: theme.spacing.small,
//     borderRadius: theme.spacing.small,
//   },

//   recordingWrapperRecording: {
//     backgroundColor: theme.colors.red + getHexOpacity(0.5),
//   },

//   requestPermissionWrapper: {
//     height: HEIGHT * 0.8,
//     width: WIDTH * 0.8,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


export default function CameraView() {
  return <Test />
}