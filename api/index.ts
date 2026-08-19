// this is the Vercel serverless function entry point
// Vercel invokes this instead of using app.listen()
import app from '../src/app.js';

// this exports the Express app as a Vercel serverless function handler
export default app;
