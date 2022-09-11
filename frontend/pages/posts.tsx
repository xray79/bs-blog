import { Container, Spinner } from "react-bootstrap";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useRouter } from "next/router";
import PostForm from "../components/PostForm";
import { getPosts, reset } from "../features/posts/postsSlice";
import PostItem from "../components/PostItem";

const Posts = () => {
  const Router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { posts, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (!user) {
      Router.push("/login");
      return;
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, Router, isError, message, dispatch]);

  return (
    <div>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Container className="">
        <h2 className="mt-4 display-6 text-primary">Blog posts</h2>
        <h3 className="display-7 text-primary mt-4 mb-3">
          Welcome <span className="text-danger">{user && user.name}</span>
        </h3>
        <h3 className="display-7 text-primary mb-4">
          Enter your new post here
        </h3>

        <PostForm />
      </Container>

      <Container className="mt-5">
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <div>
            {posts.map((post, i) => (
              <PostItem key={i} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
export default Posts;
