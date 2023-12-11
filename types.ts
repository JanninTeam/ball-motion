export {}; // needed to make this a module

declare global {
  type Activity = {
    id: number;
    date: number;
    speed: number;
    username: string;
    videoUri: string;
  };
}
