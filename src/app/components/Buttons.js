import React from 'react';

const Buttons = ({ onCreateNote, onTalkToOllama }) => {
  return (
    <div className="flex space-x-8">
      <button
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        onClick={onCreateNote}
      >
        Create New Note
      </button>
      <button
        className="bg-white border border-black text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        onClick={onTalkToOllama}
      >
        Talk to Ollama
      </button>
    </div>
  );
};

export default Buttons;
