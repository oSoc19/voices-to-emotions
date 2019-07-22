export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  start_date: string;
  leavePercentage: number;
  avatar: string;
  team: {
    _id: string;
    name: string;
  };
};
