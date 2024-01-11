import { Request, Response } from 'express';
import { handleCSVFile } from '../services/transactions.service';

class TransactionsController {
   public uploadFile(req: Request, res: Response) {
    return handleCSVFile(req.file, res);
   }
}

export default new TransactionsController();