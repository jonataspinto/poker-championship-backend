export interface IAuth {
  verifyToken: (token: string) => Promise<boolean>;
  getUuidByToken: (token: string) => Promise<string>
}
