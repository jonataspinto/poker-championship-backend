interface IAuth {
  verifyToken: (token: string) => Promise<boolean>;
  getUuidByToken: (token: string) => Promise<string>;
  getEmailByToken: (token: string) => Promise<string>;
}
