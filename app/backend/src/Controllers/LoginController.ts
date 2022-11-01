import { Request, Response } from 'express';
import { ILoginService } from '../Interfaces/Services/ILoginService';

export class LoginController {
  private readonly loginService: ILoginService;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const result = await this.loginService.login(request.body);
    return response.status(200).json(result);
  }

  public async validate(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;
    const result = this.loginService.validate(authorization);

    return response.status(200).json(result);
  }
}
