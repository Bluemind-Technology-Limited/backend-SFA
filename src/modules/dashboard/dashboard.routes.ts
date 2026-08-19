// this defines the routes for the dashboard module
import { Router } from 'express';
import { dashboardController } from './dashboard.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/authorize.middleware.js';
import { asyncHandler } from '../../utils/async-handler.js';

// this creates the dashboard router
const router = Router();

/**
 * @openapi
 * /api/dashboard:
 *   get:
 *     summary: Get role-specific dashboard stats
 *     description: Returns dashboard statistics based on the caller's role.
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalDistributors:
 *                       type: integer
 *                       example: 5
 *                     totalSalesUsers:
 *                       type: integer
 *                       example: 20
 *                     totalProducts:
 *                       type: integer
 *                       example: 50
 *                     pendingRequests:
 *                       type: integer
 *                       example: 3
 *                     approvedRequests:
 *                       type: integer
 *                       example: 10
 *                     rejectedRequests:
 *                       type: integer
 *                       example: 2
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', authenticate, authorize('SALES', 'DISTRIBUTOR', 'SUPER_ADMIN'), asyncHandler(dashboardController.stats));

export const dashboardRoutes = router;
