import type { z } from 'zod';

import type { DeleteUserSchema } from '~/server/trpc/router/userRouter';

export type DeleteUserSchema = z.infer<typeof DeleteUserSchema>;
