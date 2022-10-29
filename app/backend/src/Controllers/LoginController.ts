import { Request, Response } from 'express';
import { LoginService } from '../Service/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public create(request: Request, response: Response): Response {
    const errorMessage = this.loginService.create(request.body);
    if (errorMessage) return response.status(400).json(errorMessage);

    return response.sendStatus(201);
  }
}
