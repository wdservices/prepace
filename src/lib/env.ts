/**
 * Environment variable utilities
 * Helps with debugging and ensuring required variables are set
 */

// This will be replaced at build time with actual environment variables
export const env = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

/**
 * Check if required environment variables are set
 * Logs warnings for any missing variables
 */
export function checkEnv() {
  const requiredVars = ['GOOGLE_API_KEY'] as const;
  
  for (const varName of requiredVars) {
    if (!env[varName]) {
      console.warn(`⚠️  ${varName} is not set. Some features may not work.`);
    }
  }
}

// Log environment status in development
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  checkEnv();
  console.log('Environment variables:', {
    GOOGLE_API_KEY: env.GOOGLE_API_KEY ? '✅ Set' : '❌ Missing',
    NODE_ENV: env.NODE_ENV,
  });
}
