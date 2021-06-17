export interface IAuth {
  verifyToken: (token: string) => Promise<boolean>;
  // getUserByToken: (token: string) => Promise<T | Error>
}
