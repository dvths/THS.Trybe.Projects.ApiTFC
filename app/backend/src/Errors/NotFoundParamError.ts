export class NotFoundParamError extends Error {
  public status: number

  constructor(message:string){
    super(message)
    this.status = 404;
  }
}
