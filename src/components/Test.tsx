import { StyleSheet, View } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Tensor3D } from '@tensorflow/tfjs-core';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { useEffect, useState } from 'react';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { encodeWeights } from '@tensorflow/tfjs-core/dist/io/io_utils';

const TensorCamera = cameraWithTensors(CameraView);
export default function Test() {
  const [model, setModel] = useState<cocoSsd.ObjectDetection>();
  const [permission, requestPermission] = useCameraPermissions();

  const textureDims = { height: 1920, width: 1080 };

  const handleCameraStream = (images: any) => {
    console.log("Camera ready");
    // const loop = async () => {
    //   const nextImageTensor = images.next().value;

    //   if (!model || !nextImageTensor)
    //     throw new Error('No model or image tensor');

    //   model
    //     .detect(nextImageTensor)
    //     .then((predictions) => {
    //       console.log(predictions);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    //   requestAnimationFrame(loop);
    // };

    // loop();
  };

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();

      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log("Model loaded");
    };

    loadModel();
  }, []);


  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        facing="front"
        
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  camera: {
    width: '100%',
    height: '100%',
  },
});
