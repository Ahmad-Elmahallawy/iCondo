import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ForumLandingPage from "./ForumLandingPage";

jest.mock("axios");

describe("ForumLandingPage component", () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          username: "user1",
          content: "Post 1",
          replies: [],
          showReplies: false,
          user: {
            id: 1,
          },
        },
        {
          id: 2,
          username: "user2",
          content: "Post 2",
          replies: [],
          showReplies: false,
          user: {
            id: 2,
          },
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders forum posts", async () => {
    const { getByText } = render(<ForumLandingPage />);

    // Wait for posts to be loaded
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText("Post 1")).toBeInTheDocument();
    expect(getByText("Post 2")).toBeInTheDocument();
  });

  test("adds a new post", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: {
        id: 3,
        username: "user3",
        content: "New Post",
        replies: [],
        showReplies: false,
        user: {
          id: 3,
        },
      },
    });

    const { getByPlaceholderText, getByText } = render(<ForumLandingPage />);

    // Wait for posts to be loaded
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Add new post
    fireEvent.change(getByPlaceholderText("What's on your mind?"), {
      target: { value: "New Post" },
    });
    fireEvent.click(getByText("Post"));

    // Wait for new post to be added
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(getByText("New Post")).toBeInTheDocument();
  });

});
