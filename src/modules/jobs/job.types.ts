// this defines the types for the background jobs module

// this is the payload shape for a generic background job
export interface BackgroundJobPayload {
  // this is the type of job to run
  type: string;
  // this is the data passed to the job
  data?: Record<string, unknown>;
}

// this is a sample payload for processing a request review (long-running task)
export interface ProcessRequestReviewPayload {
  requestId: string;
  status: 'APPROVED' | 'REJECTED';
}
