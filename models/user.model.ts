export interface User {
  email: string;
  name: string;
  pictureUrl: string;
}

export interface UserState {
  loading: boolean | null;
  user: User | null;
  error: string | null;
}
