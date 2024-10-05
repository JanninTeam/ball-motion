// import * as tf from '@tensorflow/tfjs'; // Optional: If using TensorFlow.js
// import * as ImageManipulator from 'expo-image-manipulator';

// // Function to detect the golf ball
// export const detectGolfBall = async (imageUri: string): Promise<boolean> => {
//   try {
//     // Load the image
//     const image = await ImageManipulator.manipulateAsync(
//       imageUri,
//       [{ resize: { width: 640, height: 480 } }], // Resize to reduce processing time
//       { format: ImageManipulator.SaveFormat.JPEG }
//     );

//     // Convert image to a format suitable for processing
//     const response = await fetch(image.uri);
//     const blob = await response.blob();

//     // Convert blob to ImageData for further processing
//     const img = new Image();
//     img.src = URL.createObjectURL(blob);

//     // Wait for the image to load
//     await new Promise((resolve) => {
//       img.onload = () => resolve(null);
//     });

//     // Optionally convert the image to a canvas for manipulation (if using canvas)
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     context.drawImage(img, 0, 0);

//     // Now you can process the image data
//     const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

//     // Here you could implement detection logic using:
//     // 1. Color filtering (e.g., find pixels matching golf ball color)
//     // 2. Contour detection to find circular shapes
//     // 3. Using a pre-trained ML model (if available)

//     // Example: Check for a color range (this is very simplistic)
//     const data = imageData.data;
//     let ballDetected = false;

//     // Iterate over pixels (this is a simplified example; you may need better logic)
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i];     // Red
//       const g = data[i + 1]; // Green
//       const b = data[i + 2]; // Blue

//       // Check if the pixel is in a color range indicative of a golf ball
//       if (r > 200 && g > 200 && b < 100) { // Adjust color thresholds as needed
//         ballDetected = true;
//         break;
//       }
//     }

//     return ballDetected;
//   } catch (error) {
//     console.error("Error detecting golf ball:", error);
//     return false; // Return false on error
//   }
// };