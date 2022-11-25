import { z } from 'zod';

import { router, protectedProcedure } from '~/server/trpc/trpc';

export const CreateSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
});

export type CreateLink = z.infer<typeof CreateSchema>;

export const linkRouter = router({
  create: protectedProcedure
    .input(CreateSchema)
    .mutation(async ({ ctx, input }) => {
      const newLink = ctx.prisma.link.create({
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });

      return newLink;
    }),
  get: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.link.findFirst({
        where: { slug: { equals: input.slug } },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: { creatorId: ctx.session.user.id },
    });
  }),
});
