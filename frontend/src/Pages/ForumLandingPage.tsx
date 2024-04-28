import React, { useState } from "react";
import "../Style/LandingPageStyle/ForumLandingPageStyle.css";

interface Post {
  id: number;
  content: string;
  replies: Reply[];
  showReplies: boolean;
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

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      content: postContent,
      replies: [],
      showReplies: false,
    };
    setPosts([...posts, newPost]);
    setPostContent("");
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
            <p className="post-content">{post.content}</p>
            <button onClick={() => toggleReplies(post.id)}>
              {post.showReplies ? "Hide Replies" : "Show Replies"}
            </button>
            {post.showReplies &&
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
