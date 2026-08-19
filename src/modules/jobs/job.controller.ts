// this defines the controller for background jobs
import type { Request, Response } from 'express';
import { jobService } from './job.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the jobs controller
export const jobController = {
  // this handles incoming background job callbacks from QStash
  async handler(req: Request, res: Response) {
    const { type, data } = req.body as { type: string; data: Record<string, unknown> };

    // this processes the job (can take as long as needed, outliving serverless timeout)
    await jobService.process(type, data);

    // this returns a 200 so QStash knows the job completed successfully
    sendSuccess(res, null, 'Job processed.');
  },

  // this is a convenience endpoint to publish a test job (for local/dev)
  async publishTest(req: Request, res: Response) {
    const { type, data, delaySeconds } = req.body;
    const result = await jobService.publish(type, data, delaySeconds);
    sendSuccess(res, result, 'Job published.');
  },
};
