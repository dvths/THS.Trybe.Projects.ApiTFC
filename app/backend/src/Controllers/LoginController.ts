import { Request, Response } from 'express';
import { ILoginService } from '../Interfaces/ILoginService';
import { LoginService } from '../Services/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  public async create(request: Request, response: Response): Promise<Response> {
      await this.loginService.create(request.body);
      return response.sendStatus(201);
  }
}
