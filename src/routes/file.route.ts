import express from 'express';
import TransactionsController from '../controllers/transactions.controller';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload/extract', upload.single('file'), TransactionsController.uploadFile);

export default router;
