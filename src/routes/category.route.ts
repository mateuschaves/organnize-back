import express from 'express';
import CategoryController from '../controllers/category.controller';
import CategoryService from '../services/category.service';

const router = express.Router();

// workaround to inject the service into the controller
const categoryController = new CategoryController(new CategoryService());

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.create);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

export default router;
