import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import MainLayout from "src/Layout/MainLayout";
import { api } from "~/utils/api";
const PostPage = () => {
  const router = useRouter();
  //   Get post
  const getPost = api.post.getPost.useQuery(
    {
      slug: router.query.slug as string,
    },
    {
      // when the slug is not present in the url we don't want to fetch the data
      enabled: !!router.query.slug, // or =>  Boolean(router.query.slug)
    },
  );

  //   like post
  const likePost = api.post.likePost.useMutation({
    onSuccess: () => {
      toast.success("Post liked successfully");
    },
    onError: (error) => {
      toast.error(`${error.message || "Something went worong!"}`);
    },
  });

  //   Dislike post
  const dislikePost = api.post.disLikePost.useMutation({
    onSuccess: () => {
      toast.success("Post disliked successfully");
    },
    onError: (error) => {
      toast.error(`${error.message || "Something went worong!"}`);
    },
  });

  return (
    <MainLayout>
      {getPost.isLoading && (
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
          <div>Loading...</div>
        </div>
      )}

      {getPost.isSuccess && (
        <div className="fixed bottom-10 flex w-full items-center justify-center">
          <div className="group flex items-center justify-center space-x-4 rounded-full border border-gray-400 bg-white px-6 py-3 shadow-xl transition duration-300 hover:border-gray-900">
            <div className="border-r pr-4 transition duration-300 group-hover:border-gray-900">
              {getPost.data?.likes && getPost.data?.likes?.length > 0 ? (
                <FcLike
                  onClick={() => {
                    if (getPost.data?.id) {
                      dislikePost.mutate({
                        postId: getPost.data?.id,
                      });
                    }
                  }}
                  className="cursor-pointer text-xl"
                />
              ) : (
                <FcLikePlaceholder
                  onClick={() =>
                    getPost.data?.id &&
                    likePost.mutate({
                      postId: getPost.data?.id,
                    })
                  }
                  className="cursor-pointer text-xl"
                />
              )}
            </div>
            <div>
              <BsChat
                className="cursor-pointer text-base"
                // onClick={() => setShowCommentSidebar(true)}
              />
            </div>
          </div>
        </div>
      )}
      {/* {getPost.isSuccess && getPost.data && (
          <UnsplashGallary
            isUnsplashModalOpen={isUnsplashModalOpen}
            setIsUnsplashModalOpen={setIsUnsplashModalOpen}
            postId={getPost.data?.id}
            slug={getPost.data.slug}
          />
        )}

        {getPost.data?.id && (
          <CommentSidebar
            showCommentSidebar={showCommentSidebar}
            setShowCommentSidebar={setShowCommentSidebar}
            postId={getPost.data?.id}
          />
        )}
        
         */}
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col space-y-6">
          <div className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
            {/* {getPost.isSuccess && getPost.data?.featuredImage && (
                <Image
                  src={getPost.data?.featuredImage}
                  alt={getPost.data?.title}
                  fill
                  className="rounded-xl"
                />
              )} */}
            {/* {data?.user?.id === getPost.data?.authorId && ( */}
            <div
              //   onClick={() => setIsUnsplashModalOpen(true)}
              className="absolute left-2 top-2 z-10 cursor-pointer rounded-md bg-black/30 p-2 text-white hover:bg-black"
            >
              {/* <BiImageAdd className="text-2xl" /> */}
              images
            </div>
            {/* )} */}
            <div className="absolute flex h-full w-full items-center justify-center ">
              <div className="rounded-xl bg-black bg-opacity-50 p-4 text-3xl text-white">
                {getPost.data?.title}
              </div>
            </div>
          </div>
          <div className="border-l-4 border-gray-800 pl-6">
            {getPost.data?.description}
          </div>
          <div>{getPost.data?.text}</div>

          <div className="prose lg:prose-xl">
            {/* <Interweave content={getPost.data?.html} /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostPage;
