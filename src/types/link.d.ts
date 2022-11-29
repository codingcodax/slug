import type { z } from 'zod';

import type {
  LinkSchema,
  CreateLinkSchema,
} from '~/server/trpc/router/linkRouter';

export type LinkSchema = z.infer<typeof LinkSchema>;
export type CreateLinkSchema = z.infer<typeof CreateLinkSchema>;
