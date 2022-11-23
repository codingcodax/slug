import { router } from '~/server/trpc/trpc';

import { exampleRouter } from './example';
import { authRouter } from './auth';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
