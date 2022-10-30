import { Request, Response } from 'express';
import { LoginService } from '../Service/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public create(request: Request, response: Response): Response {
    try {
      this.loginService.create(request.body);
      return response.sendStatus(201);
      
    } catch (error: any) {
      return response.status(400).json({message: error.message});
      
    }
  }
}
