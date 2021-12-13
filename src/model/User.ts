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
  loginUser: any;
  username: string;
  password: string;
}

export interface CreateUserRequest {
  registerUser: any;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  favorite_game: string;
}
