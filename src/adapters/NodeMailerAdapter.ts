import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const SMTP_CONFIG = {
  host: process.env.SMTP_CONFIG_HOST as string,
  port: process.env.SMTP_CONFIG_PORT as unknown,
  user: process.env.SMTP_CONFIG_USER as string,
  pass: process.env.SMTP_CONFIG_PASS as string,
};

export class NodeMailerAdapter implements IMailProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
  // eslint-disable-next-line no-empty-function
  }

  // eslint-disable-next-line class-methods-use-this
  async sendEmail(message: IMessage): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port as number,
      secure: false,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailSent = await transporter.sendMail({
      text: message.text,
      subject: message.subject,
      from: message.from,
      to: message.to,
      html: message.html,
    });

    console.log(mailSent);
  }
}
