import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/trpc';

export const DeleteUserSchema = z.object({
  id: z.string(),
});

export const UserRouter = router({
  delete: protectedProcedure
    .input(DeleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      const deletedUser = ctx.prisma.user.delete({
        where: { id: input.id },
      });

      return deletedUser;
    }),
});
