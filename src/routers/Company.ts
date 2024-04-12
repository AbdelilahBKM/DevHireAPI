import express from 'express';
import companyControllers from '../controllers/Company';

const router = express();

router.post('/create', companyControllers.createCompany);
router.get('/getAll', companyControllers.readAllCompanies);
router.get('/get/:companyId', companyControllers.readCompany);
router.patch('/update/:companyId', companyControllers.updateCompany);
router.delete('/delete/:companyId', companyControllers.deleteCompany);

export default router;
