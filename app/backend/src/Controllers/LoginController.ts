import { Request, Response } from 'express';
import { ILoginService } from '../Interfaces/ILoginService';
import { LoginService } from '../Services/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  public create(request: Request, response: Response): Response {
      this.loginService.create(request.body);
      return response.sendStatus(201);
  }
}
