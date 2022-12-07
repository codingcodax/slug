import { z } from 'zod';

import { router, protectedProcedure } from '~/server/trpc/trpc';

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  clicks: z.number(),
  clicksUpdatedAt: z.date(),
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

export const DeleteLinkSchema = z.object({
  id: z.number(),
});

export const linkRouter = router({
  create: protectedProcedure
    .input(CreateLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const newLink = ctx.prisma.link.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
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
          userId: ctx.session.user.id,
        },
      });

      return newLink;
    }),
  delete: protectedProcedure
    .input(DeleteLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const deletedLink = ctx.prisma.link.delete({
        where: { id: input.id },
      });

      return deletedLink;
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
      where: { userId: ctx.session.user.id },
    });
  }),
});
