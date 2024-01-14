import express from 'express';
import EstablishmentCategoryController from '../controllers/establishmentCategory.controller';
import EstablishmentCategoryService from '../services/establishmentCategory.service';

// working with dependency injection
const establishmentCategoryController = new EstablishmentCategoryController(new EstablishmentCategoryService());

const router = express.Router();


router.get('/establishment-category', establishmentCategoryController.getAll);
router.post('/establishment-category', establishmentCategoryController.create);
router.put('/establishment-category/:id', establishmentCategoryController.update);
router.delete('/establishment-category/:id', establishmentCategoryController.delete);

export default router;
