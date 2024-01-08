import * as FileSystem from 'expo-file-system';

const directory = `${FileSystem.documentDirectory}/videos`;

async function ensureDirectoryExists() {
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directory);
  }
}

export async function saveVideoFile(uri: string) {
  await ensureDirectoryExists();
  const path = `${directory}/${Date.now()}.mp4`;
  await FileSystem.moveAsync({ from: uri, to: path });
  return path;
}

export async function uploadVideoFile(uri: string) {
  const path = await saveVideoFile(uri);

  const response = await FileSystem.uploadAsync(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/process_video`,
    path,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'video',
    }
  );

  console.log(response);
}
