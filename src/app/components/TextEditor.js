"use client";
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';

const TextEditor = ({ onBack, onSave }) => { // Add onSave prop
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Untitled');

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };

  const saveNote = async (title, content) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      console.log('Note saved:', data.message);

      // Call onSave to update the notes in Dashboard
      if (data.note) {
        onSave(data.note); // Pass the new note back to Dashboard
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-black font-mono">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="w-1/2 border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <div className="flex items-center">
          <button
            onClick={() => saveNote(noteTitle, noteContent)} // Pass title and content to saveNote
            className="flex items-center bg-blue-500 text-white p-2 rounded mr-2"
          >
            <FaSave className="mr-1" /> Save
          </button>
          <button onClick={onBack} className="flex items-center bg-gray-300 text-black p-2 rounded">
            Go Back
          </button>
        </div>
      </div>
      <textarea
        className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        rows="20"
        placeholder="Write your note here..."
        value={noteContent}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
