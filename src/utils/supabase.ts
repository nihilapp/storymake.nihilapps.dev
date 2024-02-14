import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

export const supaClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
  {
    db: {
      schema: 'storymake',
    },
  }
);

// const cookieStore = cookies();
//
// export const supaServer = createServerClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
//   {
//     db: {
//       schema: 'storymake',
//     },
//     cookies: {
//       get(name: string) {
//         return cookieStore.get(name)?.value;
//       },
//     },
//   }
// );
