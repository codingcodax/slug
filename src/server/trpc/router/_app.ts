import { router } from '~/server/trpc/trpc';

import { exampleRouter } from './example';
import { authRouter } from './auth';
import { linkRouter } from './linkRouter';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
