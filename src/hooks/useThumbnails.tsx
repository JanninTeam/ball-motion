import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

type Props = {
  video: { uri: string };
  videoRef: React.MutableRefObject<Video | null>;
  interval: number;
};

export default function useThumbnails({ videoRef, interval, video }: Props) {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const targetLengthRef = useRef(0);

  useEffect(() => {
    if (!videoRef.current) return;

    const generateThumbnail = async (duration: number) => {
      console.log('Generating thumbnail');
      const { uri } = await VideoThumbnails.getThumbnailAsync(video.uri, {
        time: duration / 2,
      });

      setThumbnails((prev) => [...prev, uri]);
    };

    const getVideoDuration = async (): Promise<number> => {
      const status = await videoRef.current!.getStatusAsync();

      const { isLoaded } = status;
      if (!isLoaded) return (await getVideoDuration()) as number;

      const { durationMillis } = status;

      return durationMillis ?? 0;
    };

    const generateAllThumbnails = async () => {
      console.log('Generating all thumbnails');
      const duration = await getVideoDuration();

      targetLengthRef.current = duration / interval;

      for (let i = 0; i < duration; i += interval) {
        await generateThumbnail(i);
      }
    };

    generateAllThumbnails();
  }, [videoRef.current]);

  useEffect(() => {
    if (targetLengthRef.current === 0) return;

    setProgress(thumbnails.length / targetLengthRef.current);
    setLoading(targetLengthRef.current < thumbnails.length);
  }, [targetLengthRef.current, thumbnails.length]);

  return { loading, thumbnails, progress };
}
