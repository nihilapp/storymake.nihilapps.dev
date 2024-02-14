declare module NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANONKEY: string;
    NEXT_PUBLIC_SUPABASE_SECRET: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
  }
}
