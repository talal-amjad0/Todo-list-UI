import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
 
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg relative max-w-lg w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
