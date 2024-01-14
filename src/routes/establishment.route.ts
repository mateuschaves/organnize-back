import express from 'express';
import EstablishmentController from '../controllers/establishment.controller';
import EstablishmentService from '../services/establishment.service';

// working with dependency injection
const establishmentController = new EstablishmentController(EstablishmentService);

const router = express.Router();


router.get('/establishments', establishmentController.getAll);
router.post('/establishments', establishmentController.create);
router.put('/establishments/:id', establishmentController.update);
router.delete('/establishments/:id', establishmentController.delete);

export default router;
