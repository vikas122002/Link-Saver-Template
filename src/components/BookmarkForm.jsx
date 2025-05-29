import React, { useState } from "react";

export default function BookmarkForm({ onSave }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const getSummary = async (url) => {
    try {
      const res = await fetch("https://r.jina.ai/" + encodeURIComponent(url));
      return await res.text();
    } catch {
      return "Summary temporarily unavailable.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) return;

    setLoading(true);
    const summary = await getSummary(url);
    const title = url;
    onSave({ id: Date.now(), url, title, summary, createdAt: new Date().toISOString() });
    setUrl("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Paste URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="p-2 text-white bg-green-600 rounded">
        {loading ? "Summarizing..." : "Save & Summarize"}
      </button>
    </form>
  );
}
