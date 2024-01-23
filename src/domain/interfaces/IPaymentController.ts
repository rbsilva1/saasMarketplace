export interface IPaymentController {
  pay: (req: any, res: any) => Promise<any>;
}