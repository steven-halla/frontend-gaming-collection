export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name:  string;
  middle_name: string;
  favorite_game: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}
