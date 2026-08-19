// this defines the routes for the background jobs module
import { Router } from 'express';
import { jobController } from './job.controller.js';
import { verifyQStash } from '../../middleware/qstash.middleware.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/authorize.middleware.js';
import { asyncHandler } from '../../utils/async-handler.js';

// this creates the jobs router
const router = Router();

// this is the callback endpoint that QStash calls to execute jobs
// this is protected by QStash signature verification (not auth)
router.post('/handler', verifyQStash, asyncHandler(jobController.handler));

// this is a dev/admin endpoint to publish a test job (authenticated)
router.post('/publish', authenticate, authorize('SUPER_ADMIN'), asyncHandler(jobController.publishTest));

export const jobRoutes = router;
