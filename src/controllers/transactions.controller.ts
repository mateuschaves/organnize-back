import { Request, Response } from 'express';
import TransactionService from '../services/transactions.service';

class TransactionsController {
   public async uploadFile(request: Request, response: Response) {
    const expensesByCategory = await TransactionService.handleCSVFile(request.file);

    return response.json(expensesByCategory);
   }
}

export default new TransactionsController();