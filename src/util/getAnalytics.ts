/*
  This is the data that will be calculated from the frames for the user
  - max speed
  - total distance in air
  - potential distance (no wind resistance)
  - time in air
  - potential time in air (no wind resistance)
  - max height

  In order to calculate this, we need the following data:
  - max speed:
    - This can be calculated straight from the frameData

  - total distance in air:
    - Average amount of speed lost per frame
    - Last frame speed (Initial speed of the calculation)
    - Direction of the ball movement (from the first frame to the last frame)

  - potential distance:
    - Max speed because there will be 0 wind resistance
    - Direction of the ball movement (from the first frame to the last frame)

  - time in air:
    total distance in air
    we can use gravity to calculate the time in air

  - potential time in air:
    potential distance
    we can use gravity to calculate the time in air
*/

import { Gravity } from '../globals/gravity';
import { Settings } from '../globals/settings';
import { convertToRadians } from './convertToRadians';

const gravity = Gravity[Settings.currentPlanet];

export function getAnalytics(frameData: FrameData[]) {
  const analytics: Analytics = {
    maxSpeed: 0,
    totalDistanceInAir: 0,
    potentialDistance: 0,
    timeInAir: 0,
    potentialTimeInAir: 0,
  };

  const frameLength = frameData.length;
  const lastFrame = frameData[frameLength - 1];

  const finalSpeed = lastFrame.speed;
  const finalDirection = lastFrame.direction;

  const totalDistanceInAir = getTotalDistanceInAir({
    initialSpeed: finalSpeed,
    direction: finalDirection,
    speedLossAvg: 0.0, // TODO: Calculate this
  });

  analytics.totalDistanceInAir = totalDistanceInAir;
  return analytics;
}

type DistanceProps = {
  initialSpeed: number;
  direction: number;
  speedLossAvg: number;
};

// TODO: Implement with the average speed loss per frame
export const getTotalDistanceInAir = ({
  speedLossAvg,
  initialSpeed,
  direction,
}: DistanceProps) => {
  const angleInRadians = convertToRadians(direction);
  const distance =
    (initialSpeed * initialSpeed * Math.sin(2 * angleInRadians)) / gravity;

  return distance;
};
