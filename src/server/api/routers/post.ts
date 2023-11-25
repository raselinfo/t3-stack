import slugify from "slugify";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@server/api/trpc";
import { writeFormSchema } from "~/components/WriteFormModal";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });

export const postRouter = createTRPCRouter({
  // Create Post
  createPost: protectedProcedure
    .input(writeFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { user } = session;
      const { text, description, title } = input;

      await db.post.create({
        data: {
          title,
          description,
          text,
          slug: slugify(title),
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),

  // Get Post
  getPost: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }),
});
