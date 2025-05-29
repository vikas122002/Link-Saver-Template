import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthenticated(true);
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const handleSave = (bm) => {
    const newList = [bm, ...bookmarks];
    setBookmarks(newList);
    localStorage.setItem("bookmarks", JSON.stringify(newList));
  };

  const handleDelete = (id) => {
    const newList = bookmarks.filter((b) => b.id !== id);
    setBookmarks(newList);
    localStorage.setItem("bookmarks", JSON.stringify(newList));
  };

  return authenticated ? (
    <div className="max-w-2xl mx-auto">
      <h1 className="p-4 text-2xl font-bold text-center">Link Saver with Auto-Summary</h1>
      <BookmarkForm onSave={handleSave} />
      <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
    </div>
  ) : (
    <Login onLogin={() => setAuthenticated(true)} />
  );
}
