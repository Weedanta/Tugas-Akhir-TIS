/**
 * Barrel file for centralized exports and imports
 * 
 * This file serves as a single source of truth for all imports across the application.
 * It helps prevent circular dependencies and makes refactoring easier.
 * 
 * Organization:
 * 1. External libraries
 * 2. Internal components
 * 3. Utility functions
 * 4. Types and interfaces
 * 5. Constants and configuration
 */

// Fonts
import { Geist } from 'next/font/google';
export const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

// External Libraries
export { ThemeProvider } from 'next-themes';
export { default as Link } from 'next/link';

// Components
export { default as Navbar } from '@/components/layout/navbar';
export { default as Footer } from '@/components/layout/footer';

export { default as HomePage } from '@/components/home/home';
export { default as DeployButton } from '@/components/deploy-button';
export { EnvVarWarning } from '@/components/env-var-warning';
export { default as HeaderAuth } from '@/components/header-auth';
export { ThemeSwitcher } from '@/components/theme-switcher';
export { default as Hero } from '@/components/hero';

// Tutorial Components - These are being used in the tutorial pages
export { default as ConnectSupabaseSteps } from '@/components/tutorial/connect-supabase-steps';
export { default as SignUpUserSteps } from '@/components/tutorial/sign-up-user-steps';
export { default as FetchDataSteps } from '@/components/tutorial/fetch-data-steps';

// Tutorial components with named exports
export * from '@/components/tutorial/code-block';
export * from '@/components/tutorial/tutorial-step';

// UI Components
export * from '@/components/ui/badge';
export * from '@/components/ui/button';
export * from '@/components/ui/checkbox';
export * from '@/components/ui/dropdown-menu';
export * from '@/components/ui/input';
export * from '@/components/ui/label';

// Typography
export { TypographyInlineCode as InlineCode } from '@/components/typography/inline-code';

// Supabase
import { createClient as createBrowserClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';

export const supabase = {
  client: {
    createBrowserClient,
    createServerClient,
  },
  utils: {
    hasEnvVars,
  },
};

// Re-export types
export type { User } from '@supabase/supabase-js';

// Utils
export * from '@/utils/utils';

/**
 * Configuration
 * 
 * This section contains all the configuration variables used across the application.
 * These values should be accessed through this barrel file to maintain consistency.
 */
export const config = {
  defaultUrl: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
  // Add other config values here
};