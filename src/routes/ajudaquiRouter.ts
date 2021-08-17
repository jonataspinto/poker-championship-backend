/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Request, Response, Router } from "express";
import { NodeMailerAdapter } from "adapters/NodeMailerAdapter";
import { ajudaquiWelcome } from "utils/email/ajudaqui";

class AjudaquiRoutes {
  constructor(
    private ajudaquiRouter = Router(),
    private mailProvider = new NodeMailerAdapter(),
  ) {}

  execute() {
    this.ajudaquiRouter.post("/new-user-ajudaqui", async (request: Request, response: Response) => {
      const { userEmail } = request.body;

      await this.mailProvider.sendEmail({
        text: "Texto do E-mail",
        subject: "🎉 Bem vindo ao Ajudaqui",
        from: "Ajudaqui <elitedevs10@gmail.com",
        to: userEmail,
        html: ajudaquiWelcome,
      });

      response.status(200).json(`email enviado para ${userEmail}.`);
    });

    return this.ajudaquiRouter;
  }
}

export const ajudaquiRouter = new AjudaquiRoutes().execute();
