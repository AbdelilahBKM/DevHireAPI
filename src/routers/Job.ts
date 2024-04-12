import express from 'express';
import jobControllers from '../controllers/Job';

const router = express();

router.post('/create', jobControllers.createJob);
router.get('/getAll', jobControllers.readAllJobs);
router.get('/get/:jobId', jobControllers.readJob);
router.patch('/update/:jobId', jobControllers.updateJob);
router.delete('/delete/:jobId', jobControllers.deleteJob);

export default router;
