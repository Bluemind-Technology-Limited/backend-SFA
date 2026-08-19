// this defines the business logic for publishing and processing background jobs
import { qstash, appUrl } from '../../config/qstash.js';
import { prisma } from '../../config/prisma.js';
import { logger } from '../../utils/logger.js';

// this is the jobs service
export const jobService = {
  // this publishes a background job to QStash
  async publish<T>(type: string, data: T, delaySeconds?: number) {
    // this enqueues the job and returns the message id
    const result = await qstash.publishJSON({
      url: `${appUrl}/api/jobs/handler`,
      body: { type, data },
      ...(delaySeconds ? { delay: delaySeconds } : {}),
    });

    // this extracts the message id from the response (present on url publish)
    const messageId = 'messageId' in result ? result.messageId : 'unknown';
    logger.info(`Published job "${type}" with message id ${messageId}`);
    return result;
  },

  // this processes an incoming job based on its type
  async process(type: string, data: Record<string, unknown>) {
    logger.info(`Processing job type: ${type}`);

    // this dispatches to the correct handler
    switch (type) {
      case 'PROCESS_REQUEST_REVIEW':
        await this.processRequestReview(data as { requestId: string; status: 'APPROVED' | 'REJECTED' });
        break;
      default:
        logger.warn(`Unknown job type: ${type}`);
    }
  },

  // this is an example of a long-running background task
  // it can outlive the serverless timeout because it runs in QStash
  async processRequestReview(data: { requestId: string; status: 'APPROVED' | 'REJECTED' }) {
    // this simulates the actual work (in reality this would be heavier logic)
    await prisma.request.update({
      where: { id: data.requestId },
      data: {
        status: data.status,
        reviewedAt: new Date(),
      },
    });
    logger.info(`Processed request review for ${data.requestId}`);
  },
};
