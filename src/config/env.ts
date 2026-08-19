// this loads environment variables from the .env file
import 'dotenv/config';

// this is the environment config object
// all values are read once and exported for reuse
export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? '',
  directUrl: process.env.DIRECT_URL ?? '',
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
  qstashUrl: process.env.QSTASH_URL ?? '',
  qstashToken: process.env.QSTASH_TOKEN ?? '',
  qstashCurrentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? '',
  qstashNextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? '',
};

// this throws early if required variables are missing in production
if (env.nodeEnv === 'production') {
  const required = ['databaseUrl', 'directUrl', 'supabaseUrl', 'supabaseServiceRoleKey'];
  for (const key of required) {
    if (!env[key as keyof typeof env]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
