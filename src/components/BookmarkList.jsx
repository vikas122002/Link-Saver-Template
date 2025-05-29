import React from "react";
export default function BookmarkList({ bookmarks, onDelete }) {
  return (
    <div className="p-4 space-y-4">
      {bookmarks.map((bm) => (
        <div key={bm.id} className="p-4 border rounded shadow">
          <a href={bm.url} className="text-blue-600" target="_blank" rel="noreferrer">
            {bm.title}
          </a>
          <p className="mt-2 text-sm">{bm.summary}</p>
          <button
            className="px-2 py-1 mt-2 text-sm text-white bg-red-600 rounded"
            onClick={() => onDelete(bm.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
