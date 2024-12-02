import React from 'react';

const Sidebar = ({ notes }) => {
  return (
    <div className="w-1/4 p-6 min-h-screen bg-white border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Saved Notes</h2>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id} className="mb-3 p-3 border-b border-gray-600">
              {note.title}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No notes found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
