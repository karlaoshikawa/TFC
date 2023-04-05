export interface ILogin {
  email: string;
  password: string;
  role?: string;
}

export interface ILoginResult {
  type: number | null;
  message: string;
}
