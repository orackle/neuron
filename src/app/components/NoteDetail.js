"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Needed for SSR support

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import styles

const NoteDetail = ({ note, onClose, onUpdate }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/notes/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, updatedContent: content }), // Use the updated content
      });

      if (res.ok) {
        const updatedNote = await res.json();
        onUpdate(updatedNote);
        onClose();
      } else {
        console.error('Failed to update note:', res.status);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 font-mono">Edit Note</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 text-xl bg-gray-100 focus:bg-gray-200 text-gray-900 rounded-lg outline-none transition-all font-mono"
          placeholder="Note Title"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="mb-4 bg-gray-100 rounded-lg"
          placeholder="Write your note here..."
          modules={{
            toolbar: [
              [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all font-mono"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all font-mono"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
