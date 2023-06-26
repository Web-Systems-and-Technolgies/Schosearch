import { createContext, useContext, useMemo, useState } from "react";

function createRandomPost() {
  const adjectives = ["Amazing", "Fantastic", "Incredible", "Wonderful"];
  const nouns = ["Scholarship", "Opportunity", "Grant", "Fellowship"];

  const randomIndex = Math.floor(Math.random() * adjectives.length);
  const adjective = adjectives[randomIndex];

  const randomIndex2 = Math.floor(Math.random() * nouns.length);
  const noun = nouns[randomIndex2];

  return {
    title: `${adjective} ${noun}`,
    location: "Random City",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    moreinfo: "https://example.com",
  };
}

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.location} ${post.body} ${post.moreinfo}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }

  function handleDeletePost(index) {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts.splice(index, 1);
      return newPosts;
    });
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onDeletePost: handleDeletePost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
