import { Response, Request } from 'express';

export interface IContext {
  res: Response;
  req: Request;
}
