interface IMessage {
  to: Array<string> | string;
  from: string;
  subject: string;
  text: string,
  html: string;
}

interface IMailProvider {
  sendEmail(message: IMessage): Promise<void>
}
