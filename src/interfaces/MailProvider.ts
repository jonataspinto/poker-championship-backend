export interface IMessage {
  to: Array<string> | string;
  from: string;
  subject: string;
  text: string,
  html: string;
}

export interface IMailProvider {
  sendEmail(message: IMessage): Promise<void>
}
