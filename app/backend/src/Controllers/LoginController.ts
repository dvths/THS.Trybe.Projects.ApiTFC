import { Request, Response } from 'express';
import { LoginService } from '../Services/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public create(request: Request, response: Response): Response {
      this.loginService.create(request.body);
      return response.sendStatus(201);
  }
}
