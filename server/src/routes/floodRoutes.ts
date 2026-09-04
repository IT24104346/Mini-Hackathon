import { Router } from 'express';
import {
  getFloodReports,
  getFloodStatistics,
  getFloodReportById,
  createFloodReport,
  updateFloodReport,
  deleteFloodReport,
  seedSampleData
} from '../controllers/floodController';
import { validateFloodInput, validateFloodUpdate } from '../middleware/validateFlood';

const router = Router();

// Routes
router.route('/')
  .get(getFloodReports)
  .post(validateFloodInput, createFloodReport);

router.get('/stats', getFloodStatistics);
router.post('/seed', seedSampleData);

router.route('/:id')
  .get(getFloodReportById)
  .put(validateFloodUpdate, updateFloodReport)
  .delete(deleteFloodReport);

export default router;
