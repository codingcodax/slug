import { router } from '~/server/trpc/trpc';

import { authRouter } from './auth';
import { linkRouter } from './linkRouter';
import { UserRouter } from './userRouter';

export const appRouter = router({
  auth: authRouter,
  link: linkRouter,
  user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
