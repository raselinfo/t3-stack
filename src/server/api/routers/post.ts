import slugify from "slugify";
import { z } from "zod";
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
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return posts;
  }),

  // Get Single Post
  getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { slug } = input;

      const post = await db.post.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          description: true,
          title: true,
          text: true,
          likes: session?.user?.id
            ? {
                where: {
                  userId: session?.user?.id,
                },
              }
            : undefined,
        },
      });

      return post;
    }),

  // Like post
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { user } = session;
      const { postId } = input;

      await db.like.create({
        data: {
          userId: user.id,
          postId,
        },
      });
    }),

  disLikePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Call from dislike")
      const { session, db } = ctx;
      const { postId } = input;
      const { id } = session.user;

      await db.like.delete({
        where: {
          userId_postId: {
            postId: postId,
            userId: id,
          },
        },
      });
    }),
});
