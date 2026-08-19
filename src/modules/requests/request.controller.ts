// this defines the controller for the requests module
import type { Request, Response } from 'express';
import { requestService } from './request.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the requests controller
export const requestController = {
  // this lists requests based on the caller's role
  async list(req: Request, res: Response) {
    const requests = await requestService.list(req.user!);
    sendSuccess(res, requests, 'Requests retrieved.');
  },

  // this returns a single request with access control
  async get(req: Request, res: Response) {
    const request = await requestService.get(String(req.params.id), req.user!);
    sendSuccess(res, request, 'Request retrieved.');
  },

  // this creates a new request (sales user only)
  async create(req: Request, res: Response) {
    const request = await requestService.create(req.user!, req.body);
    sendSuccess(res, request, 'Request submitted.', 201);
  },

  // this reviews a request (distributor or super admin)
  async review(req: Request, res: Response) {
    const request = await requestService.review(String(req.params.id), req.body, req.user!);
    sendSuccess(res, request, 'Request reviewed.');
  },
};
