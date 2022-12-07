import type { z } from 'zod';

import type {
  LinkSchema,
  CreateLinkSchema,
  EditLinkSchema,
  DeleteLinkSchema,
} from '~/server/trpc/router/linkRouter';

export type LinkSchema = z.infer<typeof LinkSchema>;
export type CreateLinkSchema = z.infer<typeof CreateLinkSchema>;
export type EditLinkSchema = z.infer<typeof EditLinkSchema>;
export type DeleteLinkSchema = z.infer<typeof DeleteLinkSchema>;
