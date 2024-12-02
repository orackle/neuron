// Dashboard.js
"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Buttons from '../components/Buttons';
import TextEditor from '../components/TextEditor';
import Image from 'next/image';
import Spinner from '../components/Spinner';
import NoteDetail from '../components/NoteDetail';
import { TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
const Dashboard = () => {


  const imagePaths = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/7.jpeg'
];

  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: noteId }),
      });

      if (res.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      } else {
        console.error('Failed to delete note:', res.status);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const fetchNotes = async () => {
    if (user) {
      setLoading(true);
      try {
        const res = await fetch(`/api/notes?userId=${user.id}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Failed to fetch notes", error);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const handleCreateNote = () => {
    setIsCreatingNote(true);
  };

  const handleSaveNote = async (newNote) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (res.ok) {
        const savedNote = await res.json();
        setNotes((prevNotes) => [...prevNotes, savedNote]);
      } else {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
    await fetchNotes();
    setIsCreatingNote(false);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdate = async (updatedNote) => {
    await fetchNotes();
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen flex font-mono">
      <div className="w-1/4 bg-white p-4">
        <a href="/dashboard" onClick={() => window.location.reload()}>
          <Image src="/images/pacheco.png" width={400} height={200} alt="Sidebar" />
        </a>
        <h2 className="text-xl font-bold mb-2 text-gray-800">My Notes</h2>
        <ul className="space-y-2">
          {loading ? (
            <li className="text-gray-500">Loading...</li>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <li
                key={note._id}
                className="text-gray-900 hover:text-blue-500 cursor-pointer"
                onClick={() => handleNoteSelect(note)}
              >
                {note.title}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No notes found</li>
          )}
        </ul>
      </div>

      <div className="w-3/4 flex flex-col bg-white p-6">
        {isCreatingNote ? (
          <TextEditor onBack={async () => {setIsCreatingNote(false); await fetchNotes()}} onSave={(note) => handleSaveNote(note)} />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-400 mb-10">Your Neuron, {user?.fullName || user?.firstName}</h1>
            <Buttons onCreateNote={handleCreateNote} onTalkToOllama={() => console.log('Talking to Ollama...')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : notes.length > 0 ? (
                notes.map((note) => {
                  // Randomly select an image from the array
                  const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
                  return (
                    <div
                      key={note._id}
                      className="relative rounded-lg shadow p-4 cursor-pointer hover:bg-gray-100 group"
                      onClick={() => handleNoteSelect(note)}
                    >
                      <Image
                        src={randomImage}
                        alt="Note cover"
                        width={300} // Adjust width as needed
                        height={150} // Keep the height small
                        className="object-cover rounded-t-lg h-24 w-full opacity-50" // Ensure the image covers and maintains height
                      />
                      <h3 className="font-semibold text-gray-900">{note.title}</h3>
                      <p className="text-gray-600">{note.content.substring(0, 50)}...</p>
                      <p className="text-gray-500 text-sm mt-2">{new Date(note.createdAt).toLocaleDateString()}</p>

                      {/* Trash can icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note._id);
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        title="Delete Note"
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  );
                })

              ) : (
                <p className="text-gray-500">No notes available</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={handleNoteUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
