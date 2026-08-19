// this defines the root API router that mounts all module routers
import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { userRoutes } from '../modules/users/user.routes.js';
import { distributorRoutes } from '../modules/distributors/distributor.routes.js';
import { productRoutes } from '../modules/products/product.routes.js';
import { requestRoutes } from '../modules/requests/request.routes.js';
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes.js';

// this creates the root router
const router = Router();

// this mounts each module under its base path
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/distributors', distributorRoutes);
router.use('/products', productRoutes);
router.use('/requests', requestRoutes);
router.use('/dashboard', dashboardRoutes);

export const apiRoutes = router;
