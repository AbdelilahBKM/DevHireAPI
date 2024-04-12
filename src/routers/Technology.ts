import express from 'express';
import technologyControllers from '../controllers/Technology';

const router = express();

router.post('/create', technologyControllers.createTechnology);
router.get('/getAll', technologyControllers.readAllTechnology);
router.get('/get/:technologyId', technologyControllers.readTechnology);
router.patch('/update/:technologyId', technologyControllers.updateTechnology);
router.delete('/delete/:technologyId', technologyControllers.deleteTechnology);

export default router;
