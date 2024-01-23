import { Request, Response } from "express";

export interface IPaymentController {
  pay: (req: Request, res: Response) => Promise<Response>;
  webhook: (req: Request, res: Response) => Promise<Response>;
}