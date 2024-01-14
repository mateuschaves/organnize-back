import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';

class TransactionController {
   constructor(
      private readonly transactionService: typeof TransactionService = TransactionService,
   ) {
      this.uploadFile = this.uploadFile.bind(this);
   }
   public async uploadFile(request: Request, response: Response) {
    try {
      const expensesByCategory = await this.transactionService.handleCSVFile(request.file);

      return response.json(expensesByCategory);
    } catch (error) {
      return response.status(500).json({ error });
    }
   }
}

export default new TransactionController();