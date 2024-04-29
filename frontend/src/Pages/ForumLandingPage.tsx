import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/LandingPageStyle/ForumLandingPageStyle.css";

interface Post {
  id: number;
  username: string;
  content: string;
  replies: Reply[];
  showReplies: boolean;
  user: {
    id: number;
  };
}

interface Reply {
  id: number;
  content: string;
  postId: number;
}

const ForumLandingPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState("");
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>(
    {}
  );
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    // Fetch posts from the backend API and update the state
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // Fetch usernames associated with user IDs of posts
      const postsWithUsernames = await Promise.all(
        response.data.map(async (post: Post) => {
          console.log(post.user.id);

          const userResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/${post.user.id}`, // Assuming the API route for fetching user details
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );
          return { ...post, username: userResponse.data.username };
        })
      );
      // Update the posts state with the fetched data including usernames
      setPosts(postsWithUsernames);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      console.log(postContent);

      // Make a POST request to your backend API to create a new post
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          content: postContent,
          user: {
            id: user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // Update the posts state with the newly created post
      setPosts([...posts, response.data]);
      // Clear the post content input field
      setPostContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const toggleReplies = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, showReplies: !post.showReplies } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddReply = (postId: number) => {
    const newReply: Reply = {
      id: Date.now(),
      content: replyContents[postId],
      postId,
    };
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    );
    setPosts(updatedPosts);
    setReplyContents({ ...replyContents, [postId]: "" });
  };

  return (
    <div className="forum-container">
      <h1 className="forum-heading">Forums</h1>
      <div className="post-input">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button className="post-button" onClick={handleAddPost}>
          Post
        </button>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <strong>{post.username}</strong>
            <p className="post-content">{post.content}</p>
            <button onClick={() => toggleReplies(post.id)}>
              {post.showReplies ? "Hide Replies" : "Show Replies"}
            </button>
            {post.showReplies &&
              post.replies &&
              post.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <p className="reply-content">{reply.content}</p>
                </div>
              ))}
            <div className="reply-input">
              <textarea
                value={replyContents[post.id] || ""}
                onChange={(e) =>
                  setReplyContents({
                    ...replyContents,
                    [post.id]: e.target.value,
                  })
                }
                placeholder="Write a reply..."
              />
              <button
                className="reply-button"
                onClick={() => handleAddReply(post.id)}
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumLandingPage;
