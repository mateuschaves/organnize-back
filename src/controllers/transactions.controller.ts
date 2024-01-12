import { Request, Response } from 'express';
import { handleCSVFile } from '../services/transactions.service';

class TransactionsController {
   public async uploadFile(request: Request, response: Response) {
    const expensesByCategory = await handleCSVFile(request.file);

    return response.json(expensesByCategory);
   }
}

export default new TransactionsController();