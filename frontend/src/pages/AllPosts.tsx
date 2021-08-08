import React from "react";
import { useAllPostsQuery } from "generated/graphql";
import { useHistory } from "react-router-dom";

export const AllPosts = () => {
  const history = useHistory();
  const { data, loading, error } = useAllPostsQuery({
    variables: {
      userId: 1,
    },
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.log("something went wrong", error);
    },
    displayName: "AllPosts___TEST",
  });
  console.log("🚀 ~ file: AllPosts.tsx ~ line 8 ~ AllPosts ~ data", data);

  if (error) {
    return <div> something went wrong...</div>;
  }

  if (loading) {
    return <div> loading data</div>;
  }

  return (
    <div>
      <button onClick={() => history.push("/add-post")}>Add a post</button>
      <ul>
        {data?.AllPosts.length === 0 ? (
          <h6>No posts yet</h6>
        ) : (
          data?.AllPosts.map((post) => <li>{post?.body}</li>)
        )}
      </ul>
    </div>
  );
};
