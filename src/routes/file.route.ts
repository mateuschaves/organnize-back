import express from 'express';
import TransactionController from '../controllers/transaction.controller';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload/extract', upload.single('file'), TransactionController.uploadFile);

export default router;
