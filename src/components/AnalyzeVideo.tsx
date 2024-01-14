import { AVPlaybackStatus, Video } from 'expo-av';
import {
  Button,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { HEIGHT, WIDTH } from '../constants/screenSize';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import useThumbnails from '../hooks/useThumbnails';
import BaseText from './BaseText';

const progressNames = [
  'first_frame',
  'analyze_first',
  'second_frame',
  'analyze_second',
  'done',
];

type Props = {
  video: { uri: string };
};

type Position = { x: number; y: number };
export default function AnalyzeVideo({ video }: Props) {
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<Video>(null);

  const [firstThumbnail, setFirstThumbnail] = useState<string>('');
  const [firstSize, setFirstSize] = useState<number>(100);
  const [firstPosition, setFirstPosition] = useState<Position>({ x: 0, y: 0 });

  const [secondThumbnail, setSecondThumbnail] = useState<string>('');
  const [secondSize, setSecondSize] = useState<number>(100);
  const [secondPosition, setSecondPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleProgress = () => {
    setProgress((prev) => prev + 1);
  };

  const currentProgress = progressNames[progress];

  return (
    <View style={styles.container}>
      {/* Hack to get the video ref */}
      <Video style={{ width: 0, height: 0 }} ref={videoRef} source={video} />
      {currentProgress === 'first_frame' ? (
        <FrameSelector
          currentThumbnail={firstThumbnail}
          setCurrentThumbnail={setFirstThumbnail}
          videoRef={videoRef}
          video={video}
        />
      ) : currentProgress === 'analyze_first' ? (
        <AnalyzeFrame
          thumbnail={firstThumbnail}
          position={firstPosition}
          setPosition={setFirstPosition}
          size={firstSize}
          setSize={setFirstSize}
        />
      ) : currentProgress === 'second_frame' ? (
        <FrameSelector
          currentThumbnail={secondThumbnail}
          setCurrentThumbnail={setSecondThumbnail}
          videoRef={videoRef}
          video={video}
        />
      ) : currentProgress === 'analyze_second' ? (
        <AnalyzeFrame
          thumbnail={secondThumbnail}
          position={secondPosition}
          setPosition={setSecondPosition}
          size={secondSize}
          setSize={setSecondSize}
        />
      ) : (
        <View>
          <BaseText>Done!</BaseText>
          <BaseText>
            First Frame: x: {firstPosition.x}, y: {firstPosition.y}
          </BaseText>
          <BaseText>
            Second Frame: x: {secondPosition.x}, y: {secondPosition.y}
          </BaseText>
        </View>
      )}

      <Button title="Next" onPress={handleProgress} />
    </View>
  );
}

type FrameSelectorProps = {
  currentThumbnail: string;
  setCurrentThumbnail: SetState<string>;
  videoRef: Ref<Video | null>;
  video: { uri: string };
};

function FrameSelector({
  currentThumbnail,
  setCurrentThumbnail,
  videoRef,
  video,
}: FrameSelectorProps) {
  const { thumbnails, progress } = useThumbnails({
    videoRef,
    interval: 100,
    video,
  });

  if (progress < 1) {
    return (
      <>
        <BaseText>Loading...</BaseText>
        <BaseText>{Math.round(progress * 100)}%</BaseText>
      </>
    );
  }

  return (
    <>
      <Image source={{ uri: currentThumbnail }} style={styles.video} />
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {thumbnails.map((thumbnail) => (
          <TouchableOpacity onPress={() => setCurrentThumbnail(thumbnail)}>
            <Image
              key={thumbnail}
              source={{ uri: thumbnail }}
              style={{
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor:
                  currentThumbnail === thumbnail ? 'red' : 'transparent',
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

type AnalyzeFrameProps = {
  thumbnail: string;
  size: number;
  setSize: SetState<number>;
  position: Position;
  setPosition: SetState<Position>;
};

function AnalyzeFrame({
  thumbnail,
  position,
  setPosition,
  size,
  setSize,
}: AnalyzeFrameProps) {
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState(50);

  useEffect(() => {
    setInitialPosition(position);
    setInitialSize(size);
  }, []);

  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) =>
        handlePanResponderMove(gestureState),
      onPanResponderRelease: () => handlePanResponderRelease(),
    })
  );

  const [resizePanResponder, setResizePanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) =>
        handleResizePanResponderMove(gestureState),
    })
  );

  const handlePanResponderMove = (gestureState: any) => {
    const { dx, dy } = gestureState;

    // Calculate the new position
    const newPosition = {
      x: Math.min(Math.max(0, initialPosition.x + dx), WIDTH - initialSize),
      y: Math.min(Math.max(0, initialPosition.y + dy), HEIGHT - initialSize),
    };

    // Update the position state
    setPosition(newPosition);
  };

  const handleResizePanResponderMove = (gestureState: any) => {
    const { dx, dy } = gestureState;

    // Calculate the new size
    const newSize = Math.min(
      Math.max(50, initialSize + dx + dy),
      Math.min(WIDTH, HEIGHT)
    );

    // Update the size state
    setSize(newSize);
  };

  const handlePanResponderRelease = () => {
    // Save the current position and size for the next interaction
    setInitialPosition(position);
    setInitialSize(size);
  };

  return (
    <>
      <View
        {...panResponder.panHandlers}
        style={{
          width: size,
          height: size,
          borderWidth: 5,
          borderColor: 'red',
          position: 'absolute',
          left: position.x,
          top: position.y,
          borderRadius: size / 2,
          zIndex: 1000,
        }}
      />

      <View
        {...resizePanResponder.panHandlers}
        style={{
          width: 25,
          height: 25,
          backgroundColor: 'blue',
          position: 'absolute',
          right: 15,
          borderRadius: 25,
          zIndex: 1000,
        }}
      />

      <Image source={{ uri: thumbnail }} style={styles.video} />

      <Button title="Reset" onPress={() => setPosition({ x: 0, y: 0 })} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  video: {
    height: HEIGHT * 0.8,
    width: WIDTH,
  },

  carouselImage: {
    width: 75,
    height: 75,
  },
});
