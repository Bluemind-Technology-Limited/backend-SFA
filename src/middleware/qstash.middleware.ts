// this middleware verifies QStash request signatures for incoming callback jobs
import type { NextFunction, Request, Response } from 'express';
import { Receiver } from '@upstash/qstash';
import { env } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

// this creates a QStash receiver configured with the signing keys
const receiver = new Receiver({
  currentSigningKey: env.qstashCurrentSigningKey,
  nextSigningKey: env.qstashNextSigningKey,
});

// this is the middleware that verifies a QStash callback signature
export const verifyQStash = async (req: Request, _res: Response, next: NextFunction) => {
  // this reads the raw body from the request (Express parses it by default)
  const signature = req.headers['upstash-signature'] as string | undefined;

  // this rejects requests without a signature
  if (!signature) {
    throw new HttpError(401, 'Missing QStash signature.');
  }

  // this verifies the signature against the signing keys
  const valid = await receiver.verify({
    signature,
    body: JSON.stringify(req.body),
  });

  // this rejects invalid signatures
  if (!valid) {
    throw new HttpError(401, 'Invalid QStash signature.');
  }

  next();
};
