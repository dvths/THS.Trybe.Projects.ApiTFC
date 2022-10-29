import { Request, Response } from "express";

export class LoginController {
  public create(request: Request, response: Response): Response {
    if(!request.body.email) return response.status(400).json({ message: 'All fields must be filled',});

    return response.status(200);
  }

}
