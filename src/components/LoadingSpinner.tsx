import { useEffect, useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
  numberOfLines?: number;
  fps?: number;
  lapTimeMs?: number;
  backgroundColor?: string;
  lineHeight?: number;
  lineWidth?: number;
  style?: ViewStyle;
  scale?: number;
};

export default function LoadingSpinner({
  fps = 24,
  numberOfLines = 8,
  lapTimeMs = 2500,
  backgroundColor = 'white',
  lineHeight = 8,
  lineWidth = 3,
  scale = 1,
  style,
}: Props) {
  const [lineNumber, setLineNumber] = useState(0);

  const rotationValues = Array.from(
    { length: numberOfLines },
    (_, i) => (i * 360) / numberOfLines
  );

  const deltaTimeRef = useRef(0);
  const previousTimeRef = useRef(0);
  useEffect(() => {
    // Reset the timer
    deltaTimeRef.current = 0;
    previousTimeRef.current = Date.now();

    // Start the timer
    const interval = setInterval(() => {
      const now = Date.now();
      deltaTimeRef.current += now - previousTimeRef.current;
      previousTimeRef.current = now;

      if (deltaTimeRef.current >= lapTimeMs / fps) {
        setLineNumber((lineNumber) => (lineNumber + 1) % numberOfLines);
        deltaTimeRef.current = 0;
      }
    }, lapTimeMs / fps);

    // Stop the timer
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale }],
        ...style,
      }}
    >
      {rotationValues.map((rotation, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            transform: [{ rotate: `${rotation}deg` }],
          }}
        >
          <View
            style={{
              width: lineWidth,
              height: lineHeight,
              top: lineHeight,
              borderRadius: 5,
              backgroundColor,
              opacity: i === lineNumber ? 1 : 0.5,
            }}
          />
        </View>
      ))}
    </View>
  );
}
