import * as FileSystem from 'expo-file-system';
import { APIResponse } from '../../types';

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

  const { body } = response;
}

function a(uri: string) {
  const formData = new FormData();

  FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
    .then((base64String) => {
      // Convert the base64 string to a Blob
      const videoBlob = base64toBlob(base64String, 'video/mp4');

      // Append the Blob to FormData
      formData.append('video', videoBlob, 'video.mp4');

      // Fetch request
      fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/process_video`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    })
    .catch((error) => console.error('Error reading file:', error));
}

// Helper function to convert base64 string to Blob
function base64toBlob(base64String: string, contentType: string): Blob {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
