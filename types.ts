export {}; // needed to make this a module

declare global {
  type Activity = {
    id: string;
    date: number;
    speed: number;
    username: string;
    videoUri: string;
  };

  type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: string;
  } & ({ completed: true; dateCompleted: number } | { completed: false });
}
