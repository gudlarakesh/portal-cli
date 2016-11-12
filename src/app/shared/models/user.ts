export interface User {
  email: string;
  id?: number;
  password?: string;
  password_confirmation?: string;
  roles?: string[];
  nickname?: string;
  image?: string;
  provider?: string;
}
