import { z } from 'zod';

import { router, protectedProcedure } from '~/server/trpc/trpc';

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  creatorId: z.string(),
  description: z.string().nullish(),
});

export const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
});

export const EditLinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
});

export const linkRouter = router({
  create: protectedProcedure
    .input(CreateLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const newLink = ctx.prisma.link.create({
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });

      return newLink;
    }),
  edit: protectedProcedure
    .input(EditLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const newLink = ctx.prisma.link.update({
        where: { id: input.id },
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
