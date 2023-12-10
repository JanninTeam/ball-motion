export type DateString = string;

declare global {
  type Activity = {
    id: number;
    date: number;
    speed: number;
    username: string;
    videoUri: string;
  };
}
