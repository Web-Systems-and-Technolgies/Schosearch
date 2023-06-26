import { memo, useEffect, useState } from "react";
import { PostProvider, usePosts } from "src/sections/overview/PostContext";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wjeinffbnzrudlwfidau.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZWluZmZibnpydWRsd2ZpZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2NzY2MjYsImV4cCI6MjAwMzI1MjYyNn0.j8EuDJhCKt0OJeWtKf_0Nh3M9tmZLi1Luy3FLApIFDY";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <section>
      <PostProvider>
        <Header />
        <Main />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <header>
      <div>
        <Results />
        <SearchPosts />
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode darkmode "
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search"
    />
  );
}

function Results() {
  const { posts } = usePosts();

  return (
    <p>
      <span className="countColor">{posts.length} </span>scholarships result
    </p>
  );
}

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function FormAddPost() {
  const { onAddPost, onClearPosts } = usePosts();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [moreinfo, setMoreinfo] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title || !location || !moreinfo) return;
    onAddPost({ title, location, body, moreinfo });
    setTitle("");
    setLocation("");
    setBody("");
    setMoreinfo("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Scholarship Name"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input value={moreinfo} onChange={(e) => setMoreinfo(e.target.value)} placeholder="Link" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Description" />
      <button type="submit">Post Scholar</button>
    </form>
  );
}

function Posts() {
  const { posts, onDeletePost } = usePosts();

  const handleDelete = (postId) => {
    onDeletePost(postId);
  };

  return (
    <section>
      <List posts={posts} handleDelete={handleDelete} />
    </section>
  );
}

function List({ posts, handleDelete }) {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 className="schotitle">{post.title}</h3>
            <h5 className="loc">
              <svg
                data-v-ba883567=""
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {post.location}
            </h5>
            <br />
            <p className="description">
              {post.body} <a href={post.moreinfo}>more info</a>
            </p>
            <br />
            <button className="deletebtn" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Footer() {
  return <footer>&copy; All rights reserved Schosearch</footer>;
}

export default App;
